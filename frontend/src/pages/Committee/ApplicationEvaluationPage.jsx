import React, { useEffect } from "react";
import { Button, FormModal } from "@/components";
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
  } = application;

  const fields = [
    {
      label: "Merit Score",
      name: "merit",
      type: "number",
      placeholder: "Enter score out of 100",
      required: true,
    },
    {
      label: "Need Score",
      name: "need",
      type: "number",
      placeholder: "Enter score out of 100",
      required: true,
    },
    {
      label: "Extracurricular Score",
      name: "extracurricular",
      type: "number",
      placeholder: "Enter score out of 100",
      required: true,
    },
    {
      label: "Comments / Remarks",
      name: "comments",
      type: "textarea",
      placeholder: "Write your evaluation notes or remarks...",
      rows: 1,
      required: true,
    },
  ];

  const handleSubmitEvaluation = (formData) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const payload = {
      scores: {
        merit: formData.merit,
        need: formData.need,
        extracurricular: formData.extracurricular,
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
        <Button
          variant="outline"
          color="blue"
          onClick={() => navigate(-1)}
          className="hover:bg-blue-50 transition-colors"
        >
          ← Back
        </Button>

        <div className="flex flex-col justify-center text-center">
          <h1 className="sm:text-2xl font-semibold text-gray-800 tracking-tight">
            Application Evaluation
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and evaluate student’s scholarship application.
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${
            appStatus === "Evaluated"
              ? "bg-yellow-100 text-yellow-700"
              : appStatus === "under_review"
              ? "bg-yellow-100 text-yellow-700"
              : appStatus === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {appStatus?.toUpperCase()}
        </span>
      </div>

      {/* Section Wrapper */}
      <Section title="Scholarship Information">
        <InfoGrid
          data={{
            Title: scholarship?.title,
            Category: scholarship?.category,
            MinGPA: scholarship?.eligibilityCriteria?.minGPA,
            Semesters: scholarship?.eligibilityCriteria?.semester?.join(", "),
            Amount: `Rs. ${scholarship?.amount}`,
            MaxIncome: `Rs. ${scholarship?.eligibilityCriteria?.maxIncome}`,
            Departments:
              scholarship?.eligibilityCriteria?.department?.join(", "),

            Deadline: new Date(scholarship?.deadline).toLocaleDateString(),
          }}
        />
      </Section>

      <Section title="Student Information">
        <InfoGrid
          data={{
            Name: student?.name,
            Email: student?.email,
            Department: student?.department,
            "Roll No": student?.rollNo,
            GPA: student?.profile?.gpa,
            "Family Income": `Rs. ${student?.profile?.familyIncome}`,
            Phone: student?.profile?.phone,
            Address: student?.profile?.address,
          }}
        />
      </Section>

      <Section title="Eligibility Reason">
        <p className="text-gray-700 text-sm bg-gray-50 border border-gray-100 p-4 rounded-lg leading-relaxed">
          {eligibilityReason || "No reason provided"}
        </p>
      </Section>

      <Section title="Uploaded Documents">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {Object.entries(documents || {}).map(([key, link]) =>
            link ? (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <span className="font-medium">{key.toUpperCase()}</span>
                <span className="text-xs bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
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

      <Section title="Evaluation Form">
        <FormModal
          formId="evaluation-form"
          fields={fields}
          onSubmit={handleSubmitEvaluation}
        >
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              className="shadow-sm hover:shadow-md hover:bg-blue-600 transition-all"
            >
              Submit Evaluation
            </Button>
          </div>
        </FormModal>
      </Section>
    </div>
  );
};

// Subcomponents
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
      <p key={label} className="text-gray-700">
        <span className="font-medium text-gray-800">{label}: </span>
        {value || <span className="text-gray-400">N/A</span>}
      </p>
    ))}
  </div>
);
