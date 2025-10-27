import { Button, Footer, FormModal, Navbar } from "@/components";
import {
  createApplication,
  fetchResourceById,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ScholarshipApplicationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const profile = storedUser?.profile || {};

  const { data, loading, status, error } = useSelector(
    (state) => state.resources
  );
  const scholarship = data["scholarshipsById"];

  useEffect(() => {
    if (id) dispatch(fetchResourceById({ resource: "scholarships", id }));
  }, [id, dispatch]);

  if (loading || !scholarship)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading scholarship details...
        </p>
      </div>
    );

  const {
    title,
    description,
    eligibilityCriteria,
    amount,
    deadline,
    category,
    applicantsCount,
    isActive,
    _id,
  } = scholarship;

  const handleFormSubmit = (form) => {
    const studentId = storedUser._id;
    const formData = {
      scholarshipId: _id,
      studentId,
      documents: {
        CNIC: form.CNIC,
        feeChallan: form.feeChallan,
        bankInvoice: form.bankInvoice,
        incomeCertificate: form.incomeCertificate,
        resultCard: form.resultCard,
      },
      eligibilityReason: form.eligibilityReason,
    };

    dispatch(createApplication(formData));

    form.reset();
  };

  const feildsData = [
    {
      name: "department",
      label: "Department",
      type: "text",
      defaultValue: storedUser.department || "",
      disabled: true,
      required: true,
    },
    {
      name: "rollNo",
      label: "Roll No",
      type: "text",
      defaultValue: storedUser.rollNo || "",
      disabled: true,
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      defaultValue: profile.phone || "",
      disabled: true,
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      defaultValue: profile.address || "",
      disabled: true,
      required: true,
    },
    {
      name: "gpa",
      label: "GPA",
      type: "number",
      defaultValue: profile.gpa || "",
      required: true,
      disabled: true,
    },

    {
      name: "familyIncome",
      label: "Family Income",
      type: "number",
      defaultValue: profile.familyIncome || "",
      disabled: true,
      required: true,
    },
    {
      label: "Why do you think you are eligible?",
      name: "eligibilityReason",
      type: "textarea",
      placeholder: "Explain why you deserve this scholarship...",
      required: true,
    },
    {
      label: "CNIC Picture",
      name: "CNIC",
      type: "image",
      required: true,
    },
    {
      label: "University Fee Challan",
      name: "feeChallan",
      type: "image",
      required: true,
    },
    {
      label: "Bank Invoice",
      name: "bankInvoice",
      type: "image",
      required: true,
    },
    {
      label: "Income Certificate",
      name: "incomeCertificate",
      type: "image",
      required: true,
    },
    {
      label: "Result Card",
      name: "resultCard",
      type: "image",
      required: true,
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen ">
      <Navbar />

      {/* Scholarship Details */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="p-8 rounded-lg border border-gray-100 bg-white">
          <h1 className="text-3xl font-extrabold mb-2 text-blue-700">
            {title}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{category}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50">
              Amount: <strong>Rs. {amount}</strong>
            </span>
            <span className="px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50">
              Deadline:{" "}
              <strong>{new Date(deadline).toLocaleDateString()}</strong>
            </span>
            <span className="px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50">
              Applicants: <strong>{applicantsCount}</strong>
            </span>
            <span
              className={`px-3 py-1 rounded-full border ${
                isActive
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
              }`}
            >
              {isActive ? "Active" : "Closed"}
            </span>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg border border-gray-100 bg-white">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {eligibilityCriteria && (
          <div className="mt-8 p-6 rounded-lg border border-gray-100 bg-white">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Eligibility Criteria
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {eligibilityCriteria.minGPA && (
                <li>
                  <strong>Minimum GPA:</strong> {eligibilityCriteria.minGPA}
                </li>
              )}
              {eligibilityCriteria.maxIncome && (
                <li>
                  <strong>Maximum Family Income:</strong> Rs.{" "}
                  {eligibilityCriteria.maxIncome}
                </li>
              )}
              {eligibilityCriteria.department?.length > 0 && (
                <li>
                  <strong>Eligible Departments:</strong>{" "}
                  {eligibilityCriteria.department.join(", ")}
                </li>
              )}
              {eligibilityCriteria.semester?.length > 0 && (
                <li>
                  <strong>Eligible Semesters:</strong>{" "}
                  {eligibilityCriteria.semester.join(", ")}
                </li>
              )}
            </ul>
          </div>
        )}

        {/*Application Form */}
        {isActive ? (
          <div className="mt-12 p-8 rounded-lg border border-gray-100 bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">
              Apply for this Scholarship
            </h2>
            <FormModal
              formId="applyForm"
              fields={feildsData}
              onSubmit={handleFormSubmit}
            >
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant="filled" color="blue">
                  submit Application
                </Button>
              </div>
            </FormModal>

            <div className="mt-4">
              {status === "loading" && (
                <p className="text-blue-600 animate-pulse">
                  Submitting application...
                </p>
              )}

              {status === "failed" && (
                <p className="text-red-600">
                  {error || "Something went wrong."}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10 text-center text-red-500 text-lg font-medium">
            This scholarship is currently closed.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipApplicationPage;
