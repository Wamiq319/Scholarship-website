import { ConfirmationModal, DataTable, Modal } from "@/components";
import {
  deleteResource,
  fetchResources,
  updateApplication,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Reusable Section
const Section = ({ title, children, color = "blue" }) => (
  <section className="mb-10">
    <h2
      className={`text-xl font-bold text-${color}-700 border-b-2 border-${color}-600 pb-2 mb-5 inline-block`}
    >
      {title}
    </h2>
    {children}
  </section>
);

// Reusable Info Grid
const InfoGrid = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
    {data.map((item, i) => (
      <div
        key={i}
        className="flex justify-between bg-gray-50 p-3 rounded-lg border"
      >
        <span className="font-medium text-gray-700">{item.label}:</span>
        <span className="text-gray-900 font-medium">{item.value || "—"}</span>
      </div>
    ))}
  </div>
);

// Reusable Info Box
const InfoBox = ({ label, value }) => (
  <div className="mt-4">
    <p className="font-semibold text-gray-700">{label}:</p>
    <div className="mt-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl text-sm leading-relaxed text-gray-800">
      {value || "—"}
    </div>
  </div>
);

export const ApplicationsManagementPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  
  useEffect(() => {
    dispatch(fetchResources({ resource: "applications" }));
  }, [dispatch]);

  // Actions
  const handleApprove = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "approved",
        tracking: [
          {
            stage: "approved",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application approved successfully",
          },
        ],
      })
    );

  const handleReject = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "rejected",
        tracking: [
          {
            stage: "rejected",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application rejected",
          },
        ],
      })
    );

  const handleAssign = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "under_review",
        tracking: [
          {
            stage: "assigned-to-committee",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application assigned to committee",
          },
        ],
      })
    );

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(
        deleteResource({ resource: "applications", id: deleteId })
      );
      setDeleteId(null);
      setIsConfirmOpen(false);
    }
  };

  const handleView = (row) => setSelectedApp(row);

  const getButtonsByStatus = (row) => {
    const status = row.status?.toLowerCase();

    if (status === "submitted") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
        },
        {
          icon: <FaUserPlus />,
          className: "bg-indigo-500 hover:bg-indigo-600 text-white",
          onClick: handleAssign,
          title: "Assign to Committee",
        },
      ];
    }

    if (status === "under_review") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
        },
      ];
    }

    if (status === "rejected") {
      return [
        {
          icon: <FaTrash />,
          className: "bg-red-600 hover:bg-red-700 text-white",
          onClick: handleDelete,
          title: "Delete",
        },
      ];
    }

    if (status === "evaluated") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
        },
        {
          icon: <FaCheck />,
          className: "bg-green-500 hover:bg-green-600 text-white",
          onClick: handleApprove,
          title: "Approve",
        },
        {
          icon: <FaTimes />,
          className: "bg-red-500 hover:bg-red-600 text-white",
          onClick: handleReject,
          title: "Reject",
        },
      ];
    }

    return [
      {
        icon: <FaEye />,
        className: "bg-blue-500 hover:bg-blue-600 text-white",
        onClick: handleView,
        title: "View",
      },
      {
        icon: <FaTrash />,
        className: "bg-red-600 hover:bg-red-700 text-white",
        onClick: handleDelete,
        title: "Delete",
      },
    ];
  };

  return (
    <div>
      {status === "loading" && !data.applications?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading applications...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Applications"
          tableHeader={[
            { label: "Student", key: "studentId.name" },
            { label: "Scholarship", key: "scholarshipId.title" },
            { label: "Status", key: "status" },
            { label: "Score", key: "evaluationScore" },
            { label: "Evaluated By", key: "evaluationsCount" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          tableData={data.applications || []}
          dynamicButtons={getButtonsByStatus}
        />
      )}

      {/* ----------- PRINTABLE MODAL ------------ */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="lg"
        showSecondaryActionButton
        secondaryActionText="Close"
      >
        {selectedApp ? (
          <>
            {/* Print Button */}
            <div className="flex justify-end mb-5">
              <button
                onClick={() => {
                  const printContent = document.getElementById("printArea");
                  const printWindow = window.open(
                    "",
                    "_blank",
                    "width=900,height=650"
                  );
                  printWindow.document.write(`
              <html>
                <head>
                  <title>Application Details</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                    h3 { color: #1d4ed8; }
                    .section { margin-bottom: 20px; }
                    img { max-width: 100%; border-radius: 8px; }
                    table, div, p { font-size: 14px; }
                  </style>
                </head>
                <body>${printContent.innerHTML}</body>
              </html>
            `);
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
              >
                Print
              </button>
            </div>

            {/* --------- PRINTABLE CONTENT --------- */}
            <div
              id="printArea"
              className="bg-white text-gray-800 p-10 rounded-2xl border border-gray-300 shadow-lg max-w-5xl mx-auto font-sans"
            >
              {/* Header */}
              <div className="text-center border-b-2 border-blue-700 pb-6 mb-8">
                <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">
                  Scholarship Application Report
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                  Generated on {new Date().toLocaleString()}
                </p>
              </div>

              {/* Student Info */}
              <Section title="Student Information" color="blue">
                <InfoGrid
                  data={[
                    { label: "Name", value: selectedApp?.studentId?.name },
                    { label: "Email", value: selectedApp?.studentId?.email },
                    {
                      label: "Department",
                      value: selectedApp?.studentId?.department,
                    },
                    { label: "Roll No", value: selectedApp?.studentId?.rollNo },
                    {
                      label: "Phone",
                      value: selectedApp?.studentId?.profile?.phone,
                    },
                    {
                      label: "Address",
                      value: selectedApp?.studentId?.profile?.address,
                    },
                  ]}
                />

                <InfoBox
                  label="Eligibility Reason"
                  value={selectedApp?.eligibilityReason}
                />
                <InfoBox
                  label="Statement of Purpose"
                  value={selectedApp?.statementOfPurpose}
                />
              </Section>

              {/* Personal Information */}
              <Section title="Personal Information">
                <InfoGrid
                  data={[
                    {
                      label: "Full Name",
                      value: selectedApp?.personalInfo?.fullName,
                    },
                    { label: "CNIC", value: selectedApp?.personalInfo?.cnic },
                    {
                      label: "Gender",
                      value: selectedApp?.personalInfo?.gender,
                    },
                    {
                      label: "Date of Birth",
                      value: selectedApp?.personalInfo?.dateOfBirth
                        ? new Date(
                            selectedApp.personalInfo.dateOfBirth
                          ).toLocaleDateString()
                        : "—",
                    },
                    {
                      label: "Marital Status",
                      value: selectedApp?.personalInfo?.maritalStatus,
                    },
                    {
                      label: "Nationality",
                      value: selectedApp?.personalInfo?.nationality,
                    },
                    { label: "Email", value: selectedApp?.personalInfo?.email },
                    { label: "Phone", value: selectedApp?.personalInfo?.phone },
                    {
                      label: "Present Address",
                      value: selectedApp?.personalInfo?.presentAddress,
                    },
                    {
                      label: "Permanent Address",
                      value: selectedApp?.personalInfo?.permanentAddress,
                    },
                    {
                      label: "Domicile (Province)",
                      value: selectedApp?.personalInfo?.domicile?.province,
                    },
                    {
                      label: "Domicile (District)",
                      value: selectedApp?.personalInfo?.domicile?.district,
                    },
                    {
                      label: "Working",
                      value: selectedApp?.personalInfo?.isWorking
                        ? "Yes"
                        : "No",
                    },
                    selectedApp?.personalInfo?.isWorking && {
                      label: "Monthly Income",
                      value: `PKR ${selectedApp?.personalInfo?.monthlyIncome?.toLocaleString()}`,
                    },
                  ].filter(Boolean)}
                />
              </Section>

              {/* Academic Information */}
              <Section title="Academic Information">
                <InfoGrid
                  data={[
                    {
                      label: "Institute",
                      value: selectedApp?.academicInfo?.instituteName,
                    },
                    {
                      label: "Address",
                      value: selectedApp?.academicInfo?.instituteAddress,
                    },
                    {
                      label: "Discipline",
                      value: selectedApp?.academicInfo?.discipline,
                    },
                    {
                      label: "Year/Semester",
                      value: selectedApp?.academicInfo?.yearOrSemester,
                    },
                    {
                      label: "Current CGPA",
                      value: selectedApp?.academicInfo?.currentCGPA,
                    },
                    {
                      label: "Family Income",
                      value: `PKR ${selectedApp?.studentId?.profile?.familyIncome?.toLocaleString()}`,
                    },
                  ]}
                />

                {/* Previous Education - Using DataTable */}
                <div className="mt-6">
                  <DataTable
                    heading="Previous Education"
                    tableHeader={[
                      { key: "level", label: "Level" },
                      { key: "institute", label: "Institute" },
                      { key: "marksOrCGPA", label: "Marks/CGPA" },
                      { key: "year", label: "Year" },
                    ]}
                    tableData={
                      selectedApp?.academicInfo?.previousEducation || []
                    }
                  />
                </div>
              </Section>

              {/* Family Information */}
              <Section title="Family Information">
                <InfoGrid
                  data={[
                    {
                      label: "Father's Name",
                      value: selectedApp?.familyInfo?.fatherName,
                    },
                    {
                      label: "Father's CNIC",
                      value: selectedApp?.familyInfo?.fatherCNIC,
                    },
                    {
                      label: "Father Alive",
                      value: selectedApp?.familyInfo?.fatherAlive
                        ? "Yes"
                        : "No",
                    },
                    {
                      label: "Father's Occupation",
                      value: selectedApp?.familyInfo?.fatherOccupation,
                    },
                    {
                      label: "Father's Income",
                      value: `PKR ${selectedApp?.familyInfo?.fatherMonthlyIncome?.toLocaleString()}`,
                    },
                    {
                      label: "Total Members",
                      value: selectedApp?.familyInfo?.totalFamilyMembers,
                    },
                    {
                      label: "Earning Members",
                      value: selectedApp?.familyInfo?.earningMembers,
                    },
                    {
                      label: "Siblings Studying",
                      value:
                        selectedApp?.familyInfo?.siblingsStudying?.count || "0",
                    },
                    {
                      label: "Siblings' Fee",
                      value: `PKR ${
                        selectedApp?.familyInfo?.siblingsStudying?.totalMonthlyFee?.toLocaleString() ||
                        "0"
                      }`,
                    },
                  ]}
                />

                {selectedApp?.familyInfo?.otherSupportingPerson?.name && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                    <p className="font-semibold text-blue-800 mb-2">
                      Other Supporting Person
                    </p>
                    <InfoGrid
                      data={[
                        {
                          label: "Name",
                          value:
                            selectedApp.familyInfo.otherSupportingPerson.name,
                        },
                        {
                          label: "Relation",
                          value:
                            selectedApp.familyInfo.otherSupportingPerson
                              .relation,
                        },
                        {
                          label: "Occupation",
                          value:
                            selectedApp.familyInfo.otherSupportingPerson
                              .occupation,
                        },
                        {
                          label: "Monthly Support",
                          value: `PKR ${selectedApp.familyInfo.otherSupportingPerson.monthlySupport?.toLocaleString()}`,
                        },
                      ]}
                    />
                  </div>
                )}
              </Section>

              {/* Financial Information */}
              <Section title="Financial Information">
                <InfoGrid
                  data={[
                    {
                      label: "Total Monthly Income",
                      value: `PKR ${selectedApp?.financialInfo?.totalMonthlyIncome?.toLocaleString()}`,
                    },
                    {
                      label: "Education Expense",
                      value: `PKR ${selectedApp?.financialInfo?.monthlyEducationExpense?.toLocaleString()}`,
                    },
                    {
                      label: "Other Expenses",
                      value: `PKR ${selectedApp?.financialInfo?.otherExpenses?.toLocaleString()}`,
                    },
                    {
                      label: "Other Support",
                      value: selectedApp?.financialInfo?.hasOtherSupport
                        ? "Yes"
                        : "No",
                    },
                    selectedApp?.financialInfo?.hasOtherSupport && {
                      label: "Support Source",
                      value: selectedApp?.financialInfo?.supportSource,
                    },
                  ].filter(Boolean)}
                />
              </Section>

              {/* Assets & Expenditure */}
              <Section title="Assets & Expenditure">
                <InfoGrid
                  data={[
                    {
                      label: "Land Owned",
                      value: selectedApp?.specific?.assets?.landOwned,
                    },
                    {
                      label: "Cattle Owned",
                      value: selectedApp?.specific?.assets?.cattleOwned,
                    },
                    {
                      label: "Transport Owned",
                      value:
                        selectedApp?.specific?.assets?.transportOwned?.join(
                          ", "
                        ) || "—",
                    },
                    {
                      label: "Total Asset Value",
                      value: `PKR ${selectedApp?.specific?.assets?.assetValue?.toLocaleString()}`,
                    },
                    {
                      label: "Outstanding Loans",
                      value: `PKR ${selectedApp?.specific?.assets?.loans}`,
                    },
                    {
                      label: "Other Financing",
                      value:
                        selectedApp?.specific?.assets?.otherFinancingSource,
                    },
                  ]}
                />

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  {[
                    {
                      label: "Education",
                      value: selectedApp?.specific?.expenditure?.education,
                    },
                    {
                      label: "Rent",
                      value: selectedApp?.specific?.expenditure?.rent,
                    },
                    {
                      label: "Medical",
                      value: selectedApp?.specific?.expenditure?.medical,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border"
                    >
                      <p className="font-medium text-gray-700">{item.label}</p>
                      <p className="font-bold text-blue-700">
                        PKR {item.value?.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Documents */}
              <Section title="Uploaded Documents">
                <div className="space-y-3 text-sm">
                  {[
                    { label: "CNIC", url: selectedApp?.documents?.CNIC },
                    {
                      label: "Guardian CNIC",
                      url: selectedApp?.documents?.guardianCNIC,
                    },
                  ].map(
                    (doc, i) =>
                      doc.url && (
                        <p key={i}>
                          <strong>{doc.label}:</strong>{" "}
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            View Document
                          </a>
                        </p>
                      )
                  )}

                  {selectedApp?.documents?.additional?.length > 0 ? (
                    <div>
                      <strong>Additional Documents:</strong>
                      {selectedApp.documents.additional.map((doc, i) => (
                        <p key={i} className="ml-4">
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            Document {i + 1}
                          </a>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No additional documents
                    </p>
                  )}
                </div>
              </Section>

              {/* Scholarship Info */}
              <Section title="Scholarship Information">
                <InfoGrid
                  data={[
                    {
                      label: "Title",
                      value: selectedApp?.scholarshipId?.title,
                    },
                    {
                      label: "Category",
                      value: selectedApp?.scholarshipId?.category,
                    },
                    {
                      label: "Amount",
                      value: `PKR ${selectedApp?.scholarshipId?.amount?.toLocaleString()}`,
                    },
                    {
                      label: "Deadline",
                      value: selectedApp?.scholarshipId?.deadline
                        ? new Date(
                            selectedApp.scholarshipId.deadline
                          ).toLocaleDateString()
                        : "—",
                    },
                  ]}
                />
              </Section>

              {/* Committee Evaluation – Card Style */}
              {selectedApp?.evaluations?.length > 0 && (
                <Section title="Committee Evaluation">
                  <p className="text-sm text-gray-600 mb-5">
                    Evaluated by{" "}
                    <strong className="text-blue-700">
                      {selectedApp.evaluations.length}
                    </strong>{" "}
                    committee member
                    {selectedApp.evaluations.length > 1 ? "s" : ""}.
                  </p>

                  <div className="space-y-6">
                    {selectedApp.evaluations.map((ev, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Evaluator Name & Date */}
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-blue-900 text-lg">
                            {ev.committeeMemberId?.name || "Committee Member"}
                          </h4>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                            {new Date(ev.createdAt).toLocaleDateString()} at{" "}
                            {new Date(ev.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Scores */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {[
                            {
                              label: "Merit",
                              score: ev.scores?.merit,
                              color: "blue",
                            },
                            {
                              label: "Need",
                              score: ev.scores?.need,
                              color: "green",
                            },
                            {
                              label: "Extracurricular",
                              score: ev.scores?.extracurricular,
                              color: "purple",
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className={`text-center p-3 rounded-lg bg-white border-l-4 border-${item.color}-500 shadow-sm`}
                            >
                              <p className="text-xs font-medium text-gray-600">
                                {item.label}
                              </p>
                              <p
                                className={`text-2xl font-bold text-${item.color}-700`}
                              >
                                {item.score ?? "—"}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Comments */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm italic text-gray-700 leading-relaxed">
                            {ev.comments ? (
                              <span className="text-gray-800">
                                "{ev.comments}"
                              </span>
                            ) : (
                              <span className="text-gray-400">
                                No comments provided.
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Status & Score */}
              <Section title="Status & Score">
                <div className="flex gap-8 text-lg font-semibold">
                  <div>
                    <span className="text-gray-600">Status:</span>{" "}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-white ${
                        selectedApp?.status === "approved"
                          ? "bg-green-600"
                          : selectedApp?.status === "rejected"
                          ? "bg-red-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {selectedApp?.status?.toUpperCase() || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Score:</span>{" "}
                    <span className="text-blue-700">
                      {selectedApp?.evaluationScore || "Not evaluated yet"}
                    </span>
                  </div>
                </div>
              </Section>

              {/* Footer */}
              <div className="text-center text-xs text-gray-500 border-t-2 border-gray-300 pt-6 mt-10">
                <p className="font-medium">
                  Scholarship Management System © {new Date().getFullYear()}
                </p>
                <p className="mt-1">
                  Application ID:{" "}
                  <span className="font-mono">{selectedApp?._id}</span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-8">Loading details...</p>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this application?"
      />
    </div>
  );
};
