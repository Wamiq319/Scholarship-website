import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable, Modal } from "@/components";
import { FaEye } from "react-icons/fa";
import { fetchApplicationsById } from "@/redux/slices/resourcesSLice";

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h3 className="text-xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-600 inline-block pb-1">
      {title}
    </h3>
    {children}
  </section>
);

const InfoCard = ({ label, value, badge, fullWidth }) => (
  <div
    className={`${
      fullWidth ? "md:col-span-2" : ""
    } bg-white p-4 rounded-lg shadow-sm border`}
  >
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`font-medium text-gray-800 ${
        badge
          ? "inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold " +
            (value === "approved"
              ? "bg-green-100 text-green-700"
              : value === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700")
          : ""
      }`}
    >
      {value || "N/A"}
    </p>
  </div>
);

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.resources);

  const [selectedApp, setSelectedApp] = useState(null);

  const storedUser = localStorage.getItem("user");
  const student = storedUser ? JSON.parse(storedUser) : null;
  const studentId = student?._id || student?.id || student;

  console.log(selectedApp);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchApplicationsById(studentId));
    }
  }, [dispatch, studentId]);

  const handleView = (row) => setSelectedApp(row);

  const applications = data?.applicationsById || [];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Loading */}
      {status === "loading" && !applications.length ? (
        <div className="flex justify-center items-center py-10 space-x-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">
            Loading applications...
          </span>
        </div>
      ) : !applications.length ? (
        <p className="text-gray-500 text-center mt-5 font-medium">
          No applications found yet.
        </p>
      ) : (
        <DataTable
          heading="My Scholarship Applications"
          tableHeader={[
            { label: "Scholarship", key: "scholarshipId.title" },
            { label: "Status", key: "status" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          buttons={[
            {
              icon: <FaEye />,
              className: "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
              onClick: handleView,
              title: "View",
            },
          ]}
          tableData={applications}
        />
      )}

      {/* Application Details Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="lg"
      >
        {selectedApp && (
          <div className="space-y-8 print-area" id="printArea">
            {/* Print Button */}
            <div className="flex justify-end mb-4 no-print">
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
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #1d4ed8; }
                    .section { margin-bottom: 20px; }
                    img { max-width: 100%; border-radius: 8px; }
                    table, div, p { font-size: 14px; color: #333; }
                  </style>
                </head>
                <body>${printContent.innerHTML}</body>
              </html>
            `);
                  printWindow.document.close();
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
              className="bg-white p-8 font-sans text-gray-800 max-w-5xl mx-auto"
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

              {/* 1. Application Overview */}
              <Section title="Application Overview">
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoCard
                    label="Scholarship"
                    value={selectedApp?.scholarshipId?.title}
                  />
                  <InfoCard label="Status" value={selectedApp?.status} badge />
                  <InfoCard
                    label="Scholarship Type"
                    value={selectedApp?.scholarshipType}
                  />
                  <InfoCard
                    label="Statement of Purpose"
                    value={selectedApp?.statementOfPurpose}
                    fullWidth
                  />
                </div>
              </Section>

              {/* 2. Personal Information */}
              <Section title="Personal Information">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
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
                      label: "Working",
                      value: selectedApp?.personalInfo?.isWorking
                        ? "Yes"
                        : "No",
                    },
                    selectedApp?.personalInfo?.isWorking && {
                      label: "Monthly Income",
                      value: `PKR ${selectedApp?.personalInfo?.monthlyIncome?.toLocaleString()}`,
                    },
                  ]
                    .filter(Boolean)
                    .map((item, i) => (
                      <InfoCard key={i} label={item.label} value={item.value} />
                    ))}
                </div>
              </Section>

              {/* 3. Academic Information */}
              <Section title="Academic Information">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      label: "Institute Name",
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
                  ].map((item, i) => (
                    <InfoCard key={i} label={item.label} value={item.value} />
                  ))}
                </div>

                {/* Previous Education - Using DataTable */}
                <div className="mt-6">
                  <DataTable
                    heading="Previous Education"
                    tableHeader={[
                      { key: "level", label: "Level" },
                      { key: "institute", label: "Institute" },
                      { key: "year", label: "Year" },
                      { key: "totalMarks", label: "Total Marks" },  
                      { key: "obtainedMarks", label: "Obtained Marks" }, 
                    ]}
                    tableData={
                      selectedApp?.academicInfo?.previousEducation || []
                    }
                  />
                </div>
              </Section>

              {/* 4. Family & Financial Info */}
              <Section title="Family & Financial Information">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Father Name",
                      value: selectedApp?.familyInfo?.fatherName,
                    },
                    {
                      label: "Father Occupation",
                      value: selectedApp?.familyInfo?.fatherOccupation,
                    },
                    {
                      label: "Total Family Members",
                      value: selectedApp?.familyInfo?.totalFamilyMembers,
                    },
                    {
                      label: "Earning Members",
                      value: selectedApp?.familyInfo?.earningMembers,
                    },
                    {
                      label: "Total Monthly Income",
                      value: `PKR ${selectedApp?.financialInfo?.totalMonthlyIncome?.toLocaleString()}`,
                    },
                    {
                      label: "Other Support",
                      value: selectedApp?.financialInfo?.hasOtherSupport
                        ? selectedApp?.financialInfo?.supportSource
                        : "No",
                    },
                  ].map((item, i) => (
                    <InfoCard key={i} label={item.label} value={item.value} />
                  ))}
                </div>
              </Section>

              {/* 5. Uploaded Documents */}
              <Section title="Uploaded Documents">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedApp?.documents || {}).map(
                    ([key, url]) => (
                      <div
                        key={key}
                        className="p-4 rounded-lg border-2 border-dashed border-yellow-300 bg-gradient-to-br from-yellow-50 to-white shadow-sm"
                      >
                        <p className="capitalize font-semibold text-sm text-gray-700 mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        {url &&
                        typeof url === "string" &&
                        url.startsWith("http") ? (
                          <img
                            src={url}
                            alt={key}
                            className="w-full h-32 object-cover rounded-md border shadow"
                          />
                        ) : (
                          <p className="text-gray-400 text-xs italic">
                            Not Uploaded
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </Section>

              {/* 7. Application Tracking */}
              {!!selectedApp?.tracking?.length && (
                <Section title="Application Tracking">
                  <div className="relative border-l-4 border-blue-300 pl-8 space-y-6">
                    {selectedApp.tracking.map((track, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full shadow-md">
                          {index + 1}
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-bold text-gray-800 capitalize">
                              {track.stage}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(track.updatedAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          {track.remarks && (
                            <p className="text-sm text-gray-600 italic mt-2 pl-1">
                              “{track.remarks}”
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

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
          </div>
        )}
      </Modal>
    </div>
  );
};
