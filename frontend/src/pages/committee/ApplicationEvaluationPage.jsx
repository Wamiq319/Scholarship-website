import React, { useEffect } from "react";
import { Button, DataTable, FormModal } from "@/components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvaluation,
  fetchResourceById,
} from "@/redux/slices/resourcesSLice";

export const ApplicationEvaluationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.resources);
  const application = data.applicationsById;

  useEffect(() => {
    if (id) dispatch(fetchResourceById({ resource: "applications", id }));
  }, [id, dispatch]);

  if (status === "loading" || !application)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading application...
      </div>
    );

  if (status === "failed")
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load application details.
      </div>
    );

  const {
    scholarshipId: scholarship,
    studentId: student,
    documents,
    eligibilityReason,
    status: appStatus,
    personalInfo,
    academicInfo,
    familyInfo,
    financialInfo,
    specific,
    evaluations = [],
  } = application;

  const fields = [
    {
      label: "Merit Score",
      name: "merit",
      type: "number",
      placeholder: "Out of 100",
      required: true,
    },
    {
      label: "Need Score",
      name: "need",
      type: "number",
      placeholder: "Out of 100",
      required: true,
    },
    {
      label: "Extracurricular Score",
      name: "extracurricular",
      type: "number",
      placeholder: "Out of 100",
      required: true,
    },
    {
      label: "Comments / Remarks",
      name: "comments",
      type: "textarea",
      placeholder: "Write your evaluation notes...",
      rows: 3,
      required: true,
    },
  ];

  const handleSubmitEvaluation = (formData) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const payload = {
      scores: {
        merit: +formData.merit,
        need: +formData.need,
        extracurricular: +formData.extracurricular,
      },
      committeeMemberId: storedUser._id,
      applicationId: id,
      comments: formData.comments,
    };
    dispatch(createEvaluation(payload));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-md shadow-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-8">
        <Button variant="outline" color="blue" onClick={() => navigate(-1)}>
          Back
        </Button>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Application Evaluation
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and score the application
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${
            appStatus === "approved"
              ? "bg-green-100 text-green-700"
              : appStatus === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {appStatus?.toUpperCase()}
        </span>
      </div>

      {/* 1. Scholarship Info */}
      <Section title="Scholarship Information">
        <InfoGrid
          data={{
            Title: scholarship?.title,
            Category: scholarship?.category,
            Amount: `PKR ${scholarship?.amount?.toLocaleString()}`,
            Deadline: scholarship?.deadline
              ? new Date(scholarship.deadline).toLocaleDateString()
              : "—",
            "Min GPA": scholarship?.eligibilityCriteria?.minGPA,
            "Max Income": `PKR ${scholarship?.eligibilityCriteria?.maxIncome?.toLocaleString()}`,
            Departments:
              scholarship?.eligibilityCriteria?.department?.join(", "),
            Semesters: scholarship?.eligibilityCriteria?.semester?.join(", "),
          }}
        />
      </Section>

      {/* 2. Student Basic Info */}
      <Section title="Student Information">
        <InfoGrid
          data={{
            Name: student?.name,
            Email: student?.email,
            Department: student?.department,
            "Roll No": student?.rollNo,
            GPA: student?.profile?.gpa,
            "Family Income": `PKR ${student?.profile?.familyIncome?.toLocaleString()}`,
            Phone: student?.profile?.phone,
            Address: student?.profile?.address,
          }}
        />
      </Section>

      {/* 3. Personal Information */}
      <Section title="Personal Information">
        <InfoGrid
          data={{
            "Full Name": personalInfo?.fullName,
            CNIC: personalInfo?.cnic,
            Gender: personalInfo?.gender,
            "Date of Birth": personalInfo?.dateOfBirth
              ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
              : "—",
            "Marital Status": personalInfo?.maritalStatus,
            Nationality: personalInfo?.nationality,
            "Present Address": personalInfo?.presentAddress,
            "Permanent Address": personalInfo?.permanentAddress,
            Domicile: `${personalInfo?.domicile?.province}, ${personalInfo?.domicile?.district}`,
            Working: personalInfo?.isWorking ? "Yes" : "No",
            "Monthly Income": personalInfo?.isWorking
              ? `PKR ${personalInfo?.monthlyIncome?.toLocaleString()}`
              : "—",
          }}
        />
      </Section>

      {/* 4. Academic Information */}
      <Section title="Academic Information">
        <InfoGrid
          data={{
            Institute: academicInfo?.instituteName,
            "Institute Address": academicInfo?.instituteAddress,
            Discipline: academicInfo?.discipline,
            "Year/Semester": academicInfo?.yearOrSemester,
            "Current CGPA": academicInfo?.currentCGPA,
          }}
        />
        {academicInfo?.previousEducation?.length > 0 && (
          <div className="mt-4">
            {/* Previous Education - Using DataTable */}
            <div className="mt-6">
              <DataTable
                heading="Previous Education"
                tableHeader={[
                  { key: "level", label: "Level" },
                  { key: "institute", label: "Institute" },
                  { key: "totalMarks", label: "Total Marks" },
                  { key: "obtainedMarks", label: "Obtained Marks" },
                  { key: "year", label: "Year" },
                ]}
                tableData={academicInfo?.previousEducation || []}
              />
            </div>
          </div>
        )}
      </Section>

      {/* 5. Family & Financial */}
      <Section title="Family & Financial Information">
        <InfoGrid
          data={{
            "Father Name": familyInfo?.fatherName,
            "Father CNIC": familyInfo?.fatherCNIC,
            "Father Alive": familyInfo?.fatherAlive ? "Yes" : "No",
            "Father Occupation": familyInfo?.fatherOccupation,
            "Father Income": `PKR ${familyInfo?.fatherMonthlyIncome?.toLocaleString()}`,
            "Total Members": familyInfo?.totalFamilyMembers,
            "Earning Members": familyInfo?.earningMembers,
            "Siblings Studying": familyInfo?.siblingsStudying?.count || 0,
            "Siblings Fee": `PKR ${
              familyInfo?.siblingsStudying?.totalMonthlyFee?.toLocaleString() ||
              0
            }`,
            "Total Monthly Income": `PKR ${financialInfo?.totalMonthlyIncome?.toLocaleString()}`,
            "Education Expense": `PKR ${financialInfo?.monthlyEducationExpense?.toLocaleString()}`,
            "Other Support": financialInfo?.hasOtherSupport
              ? financialInfo?.supportSource
              : "No",
          }}
        />
      </Section>

      {/* 6. Assets & Expenditure */}
      <Section title="Assets & Expenditure">
        <InfoGrid
          data={{
            "Land Owned": specific?.assets?.landOwned || "—",
            "Cattle Owned": specific?.assets?.cattleOwned || "—",
            Transport: specific?.assets?.transportOwned?.join(", ") || "—",
            "Asset Value": `PKR ${specific?.assets?.assetValue?.toLocaleString()}`,
            "Outstanding Loans": `PKR ${specific?.assets?.loans?.toLocaleString()}`,
            "Education (Monthly)": `PKR ${specific?.expenditure?.education?.toLocaleString()}`,
            Rent: `PKR ${specific?.expenditure?.rent?.toLocaleString()}`,
            Medical: `PKR ${specific?.expenditure?.medical?.toLocaleString()}`,
          }}
        />
      </Section>

      {/* 7. Eligibility Reason */}
      <Section title="Eligibility Reason">
        <p className="text-gray-700 text-sm bg-gray-50 border border-gray-100 p-4 rounded-lg leading-relaxed">
          {eligibilityReason || "Not provided"}
        </p>
      </Section>

      {/* 8. Uploaded Documents */}
      <Section title="Uploaded Documents">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {Object.entries(documents || {}).map(([key, link]) =>
            link ? (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                {key.toUpperCase()}
                <span className="text-xs bg-blue-50 border px-2 py-0.5 rounded-full">
                  View
                </span>
              </a>
            ) : (
              <span key={key} className="text-gray-400">
                {key.toUpperCase()} - Not Uploaded
              </span>
            )
          )}
        </div>
      </Section>

      {/* 9. Committee Evaluations (Already Done) */}
      {evaluations?.length > 0 && (
        <Section title="Committee Evaluation">
          <p className="text-sm text-gray-600 mb-5">
            Evaluated by{" "}
            <strong className="text-blue-700">{evaluations.length}</strong>{" "}
            committee member
            {evaluations.length > 1 ? "s" : ""}.
          </p>

          <div className="space-y-6">
            {evaluations.map((ev, i) => (
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
                      <span className="text-gray-800">"{ev.comments}"</span>
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

      {/* 11. Evaluation Form */}
      <Section title="Your Evaluation">
        <FormModal
          formId="evaluation-form"
          fields={fields}
          onSubmit={handleSubmitEvaluation}
        >
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              className="shadow hover:shadow-md"
            >
              Submit Evaluation
            </Button>
          </div>
        </FormModal>
      </Section>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="font-semibold text-lg text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
      {title}
    </h2>
    {children}
  </section>
);

const InfoGrid = ({ data }) => (
  <div className="grid md:grid-cols-2 gap-4 text-sm bg-white border border-gray-200 p-4 rounded-lg">
    {Object.entries(data).map(([label, value]) => (
      <p key={label}>
        <span className="font-medium text-gray-800">{label}:</span>{" "}
        <span className="text-gray-700">
          {value || <span className="text-gray-400">N/A</span>}
        </span>
      </p>
    ))}
  </div>
);
