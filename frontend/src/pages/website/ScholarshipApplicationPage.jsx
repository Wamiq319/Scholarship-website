import { Button, Footer, FormModal, Navbar } from "@/components";
import {
  createApplication,
  fetchResourceById,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DollarSign,
  CalendarDays,
  Users,
  CheckCircle,
  Target,
  Building2,
  GraduationCap,
  Info,
  AlertCircle,
} from "lucide-react";

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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg mt-4">
            Loading scholarship details...
          </p>
        </div>
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
    { label: "CNIC Picture", name: "CNIC", type: "image", required: true },
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Application Form */}
            {isActive ? (
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">
                  Apply for this Scholarship
                </h2>
                <FormModal
                  formId="applyForm"
                  fields={feildsData}
                  onSubmit={handleFormSubmit}
                >
                  <div className="mt-8 flex justify-end">
                    <Button
                      type="submit"
                      variant="filled"
                      color="blue"
                      size="lg"
                    >
                      Submit Application
                    </Button>
                  </div>
                </FormModal>

                <div className="mt-4 text-center">
                  {status === "loading" && (
                    <p className="text-blue-600 animate-pulse">
                      Submitting application...
                    </p>
                  )}
                  {status === "failed" && (
                    <p className="text-red-600 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {error || "Something went wrong."}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center text-red-600 text-lg font-medium p-8 rounded-2xl border-2 border-red-200 bg-red-50">
                This scholarship is currently closed for applications.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-24">
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold mb-4 px-4 py-1 rounded-full">
                  {category}
                </span>
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 py-2">
                  {title}
                </h1>
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-3 text-blue-500" />
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200">
                <h2 className="text-2xl font-bold text-indigo-900 mb-5 flex items-center">
                  <Info className="w-5 h-5 mr-3 text-blue-500" />
                  Scholarship Details
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                    <span>Amount:</span>
                    <strong className="ml-auto text-green-600 font-bold text-base">
                      Rs. {amount}
                    </strong>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CalendarDays className="w-5 h-5 mr-3 text-red-500" />
                    <span>Deadline:</span>
                    <strong className="ml-auto font-semibold">
                      {new Date(deadline).toLocaleDateString()}
                    </strong>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-yellow-500" />
                    <span>Applicants:</span>
                    <strong className="ml-auto font-semibold">
                      {applicantsCount}
                    </strong>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span>Status:</span>
                    <span
                      className={`ml-auto px-3 py-1 text-xs font-bold rounded-full border ${
                        isActive
                          ? "bg-green-100 border-green-300 text-green-700"
                          : "bg-red-100 border-red-300 text-red-700"
                      }`}
                    >
                      {isActive ? "Active" : "Closed"}
                    </span>
                  </div>
                </div>

                {eligibilityCriteria && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-3 text-purple-500" />
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {eligibilityCriteria.minGPA && (
                        <li className="flex items-start text-gray-700">
                          <GraduationCap className="w-4 h-4 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                          <div>
                            <strong>Minimum GPA:</strong>{" "}
                            {eligibilityCriteria.minGPA}
                          </div>
                        </li>
                      )}
                      {eligibilityCriteria.maxIncome && (
                        <li className="flex items-start text-gray-700">
                          <DollarSign className="w-4 h-4 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                          <div>
                            <strong>Max Family Income:</strong> Rs.{" "}
                            {eligibilityCriteria.maxIncome}
                          </div>
                        </li>
                      )}
                      {eligibilityCriteria.department?.length > 0 && (
                        <li className="flex items-start text-gray-700">
                          <Building2 className="w-4 h-4 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                          <div>
                            <strong>Departments:</strong>{" "}
                            {eligibilityCriteria.department.join(", ")}
                          </div>
                        </li>
                      )}
                      {eligibilityCriteria.semester?.length > 0 && (
                        <li className="flex items-start text-gray-700">
                          <GraduationCap className="w-4 h-4 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                          <div>
                            <strong>Semesters:</strong>{" "}
                            {eligibilityCriteria.semester.join(", ")}
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipApplicationPage;
