import { Button, Footer, FormModal, Navbar } from "@/components";
import {
  createApplication,
  fetchResourceById,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const ScholarshipApplicationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user"));

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

  const { title, category, isActive, _id } = scholarship;

  function unflattenObject(data) {
    const result = {};
    for (const key in data) {
      const keys = key.split(".");
      keys.reduce((acc, k, i) => {
        return acc[k] || (acc[k] = isNaN(keys[i + 1]) ? {} : []);
      }, result);
      let ref = result;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = data[key];
    }
    return result;
  }

  const handleFormSubmit = async (form) => {
    const studentId = storedUser._id;

    const payload = unflattenObject(form);
    payload.studentId = studentId;
    payload.scholarshipId = _id;
    payload.scholarshipType = "Need-based";

    try {
      await dispatch(createApplication(payload)).unwrap();
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const commonFields = [
    // --------------------------------
    //  PERSONAL INFORMATION
    // --------------------------------
    {
      section: "Personal Information",
      name: "personalInfo.fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "e.g., Ahmed Raza",
    },
    {
      name: "personalInfo.cnic",
      label: "CNIC",
      type: "text",
      required: true,
      placeholder: "e.g., 35202-1234567-8",
    },
    {
      name: "personalInfo.gender",
      label: "Gender",
      type: "dropdown",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      placeholder: "Select your gender",
    },
    {
      name: "personalInfo.dateOfBirth",
      label: "Date of Birth",
      type: "date",
      placeholder: "Select your date of birth",
    },
    {
      name: "personalInfo.maritalStatus",
      label: "Marital Status",
      type: "dropdown",
      options: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
      ],
      placeholder: "Select marital status",
    },
    {
      name: "personalInfo.domicile.province",
      label: "Province (Domicile)",
      type: "text",
      placeholder: "e.g., Punjab, Sindh, KP",
    },
    {
      name: "personalInfo.domicile.district",
      label: "District (Domicile)",
      type: "text",
      placeholder: "e.g., Lahore, Karachi, Peshawar",
    },
    {
      name: "personalInfo.nationality",
      label: "Nationality",
      type: "text",
      placeholder: "e.g., Pakistani",
    },
    {
      name: "personalInfo.email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "e.g., ahmed.raza@gmail.com",
    },
    {
      name: "personalInfo.phone",
      label: "Phone Number",
      type: "text",
      required: true,
      placeholder: "e.g., 0301-1234567",
    },
    {
      name: "personalInfo.presentAddress",
      label: "Present Address",
      type: "textarea",
      rows: 2,
      required: true,
      placeholder: "Enter your current living address",
    },
    {
      name: "personalInfo.permanentAddress",
      label: "Permanent Address",
      type: "textarea",
      rows: 2,
      required: true,
      placeholder: "Enter your permanent family address",
    },
    {
      name: "personalInfo.isWorking",
      label: "Currently Working?",
      type: "checkbox",
    },
    {
      name: "personalInfo.monthlyIncome",
      label: "Monthly Income (if working)",
      type: "number",
      placeholder: "Enter amount in PKR (if applicable)",
    },

    // --------------------------------
    //  ACADEMIC INFORMATION
    // --------------------------------
    {
      section: "Academic Information",
      name: "academicInfo.instituteName",
      label: "Institute Name",
      type: "text",
      required: true,
      placeholder: "e.g., Government College University Lahore",
    },
    {
      name: "academicInfo.instituteAddress",
      label: "Institute Address",
      type: "text",
      placeholder: "e.g., Katchery Road, Lahore",
    },
    {
      name: "academicInfo.discipline",
      label: "Discipline / Field of Study",
      type: "text",
      required: true,
      placeholder: "e.g., BS Computer Science / MBA",
    },
    {
      name: "academicInfo.yearOrSemester",
      label: "Year / Semester",
      type: "text",
      placeholder: "e.g., 3rd Year / 5th Semester",
    },
    {
      name: "academicInfo.currentCGPA",
      label: "Current CGPA",
      type: "text",
      placeholder: "e.g., 3.45 / 4.00",
    },
    {
      name: "academicInfo.previousEducation",
      label: "Previous Education",
      type: "table",
      required: true,
      columns: [
        { key: "level", label: "Level" },
        { key: "institute", label: "Institute" },
        { key: "marksOrCGPA", label: "Marks / CGPA" },
        { key: "year", label: "Year" },
      ],
      placeholder: "Add your previous education record",
    },

    // --------------------------------
    // FAMILY INFORMATION
    // --------------------------------
    {
      section: "Family Information",
      name: "familyInfo.fatherName",
      label: "Father's Name",
      type: "text",
      required: true,
      placeholder: "e.g., Muhammad Rafiq",
    },
    {
      name: "familyInfo.fatherCNIC",
      label: "Father's CNIC",
      type: "text",
      placeholder: "e.g., 35201-9876543-1",
    },
    {
      name: "familyInfo.fatherAlive",
      label: "Is Father Alive?",
      type: "checkbox",
    },
    {
      name: "familyInfo.fatherOccupation",
      label: "Father's Occupation",
      type: "text",
      placeholder: "e.g., Teacher / Driver / Retired",
    },
    {
      name: "familyInfo.fatherMonthlyIncome",
      label: "Father's Monthly Income (PKR)",
      type: "number",
      required: true,
      placeholder: "Enter approximate monthly income in PKR",
    },
    {
      name: "familyInfo.totalFamilyMembers",
      label: "Total Family Members",
      type: "number",
      placeholder: "e.g., 6",
    },
    {
      name: "familyInfo.earningMembers",
      label: "Earning Members in Family",
      type: "number",
      placeholder: "e.g., 2",
    },
    {
      name: "familyInfo.siblingsStudying.count",
      label: "Siblings Studying (Count)",
      type: "number",
      placeholder: "e.g., 3",
    },
    {
      name: "familyInfo.siblingsStudying.totalMonthlyFee",
      label: "Total Monthly Fee (Siblings)",
      type: "number",
      placeholder: "e.g., 18000",
    },
    {
      name: "familyInfo.otherSupportingPerson.name",
      label: "Other Supporting Person Name",
      type: "text",
      placeholder: "If anyone else supports you financially",
    },
    {
      name: "familyInfo.otherSupportingPerson.relation",
      label: "Relation",
      type: "text",
      placeholder: "e.g., Uncle / Guardian / Friend",
    },
    {
      name: "familyInfo.otherSupportingPerson.occupation",
      label: "Occupation",
      type: "text",
      placeholder: "e.g., Shopkeeper / Government Employee",
    },
    {
      name: "familyInfo.otherSupportingPerson.monthlySupport",
      label: "Monthly Support (PKR)",
      type: "number",
      placeholder: "e.g., 5000",
    },

    // --------------------------------
    // FINANCIAL INFORMATION
    // --------------------------------
    {
      section: "Financial Information",
      name: "financialInfo.totalMonthlyIncome",
      label: "Total Monthly Income (PKR)",
      type: "number",
      required: true,
      placeholder: "Total family income in PKR (approx.)",
    },
    {
      name: "financialInfo.monthlyEducationExpense",
      label: "Monthly Education Expense (PKR)",
      type: "number",
      placeholder: "e.g., 12000",
    },
    {
      name: "financialInfo.otherExpenses",
      label: "Other Monthly Expenses (PKR)",
      type: "number",
      placeholder: "e.g., 8000",
    },
    {
      name: "financialInfo.hasOtherSupport",
      label: "Has Other Support?",
      type: "checkbox",
    },
    {
      name: "financialInfo.supportSource",
      label: "Support Source (if any)",
      type: "text",
      placeholder: "e.g., Zakat / NGO / Relative Support",
    },

    // --------------------------------
    // STATEMENT OF PURPOSE
    // --------------------------------
    {
      section: "Statement of Purpose",
      name: "statementOfPurpose",
      label: "Why are you applying for this scholarship?",
      type: "textarea",
      required: true,
      rows: 3,
      placeholder:
        "Describe your need, goals, and how this scholarship will help you continue education.",
    },
    {
      name: "eligibilityReason",
      label: "Eligibility Reason",
      type: "textarea",
      required: true,
      rows: 2,
      placeholder:
        "Explain briefly why you think you are eligible for this scholarship.",
    },

    // --------------------------------
    // DOCUMENTS UPLOAD
    // --------------------------------
    {
      section: "Documents",
      name: "documents.CNIC",
      label: "CNIC Image",
      type: "image",
      required: true,
      placeholder: "Upload your CNIC front & back image",
    },
    {
      name: "documents.guardianCNIC",
      label: "Guardian CNIC Image",
      type: "image",
      placeholder: "Upload your guardian’s CNIC if applicable",
    },
    {
      name: "documents.incomeCertificate",
      label: "Income Certificate",
      type: "image",
      placeholder: "Upload verified income certificate",
    },
    {
      name: "documents.feeVoucher",
      label: "Fee Voucher",
      type: "image",
      placeholder: "Upload your latest fee voucher or challan",
    },
    {
      name: "documents.transcript",
      label: "Transcript / Marksheet",
      type: "image",
      placeholder: "Upload your latest academic transcript",
    },
    {
      name: "documents.utilityBill",
      label: "Utility Bill",
      type: "image",
      placeholder: "Upload recent electricity or gas bill",
    },
    {
      name: "documents.bankInvoice",
      label: "Bank Invoice (if applicable)",
      type: "image",
      placeholder: "Upload any related bank invoice",
    },
    {
      name: "documents.rentAgreement",
      label: "Rent Agreement (if applicable)",
      type: "image",
      placeholder: "Upload rent agreement if living in rented house",
    },
  ];

  const specificFieldsByType = {
    // ------------------------------
    // PEEF SCHOLARSHIP
    // ------------------------------
    PEEF: [
      {
        name: "specific.eligibilityChecklist.isPakistani",
        label: "Is Pakistani?",
        type: "checkbox",
        placeholder: "Tick if you are a Pakistani citizen",
      },
      {
        name: "specific.eligibilityChecklist.notAvailingOtherScholarship",
        label: "Not Availing Other Scholarship?",
        type: "checkbox",
        placeholder: "Tick if you are NOT receiving any other scholarship",
      },
      {
        name: "specific.transportType",
        label: "Transport Type",
        type: "text",
        placeholder: "e.g., Bus, Motorcycle, Car, On Foot",
      },
      {
        name: "specific.hostelFacility.availing",
        label: "Availing Hostel?",
        type: "checkbox",
        placeholder: "Tick if you are living in a hostel",
      },
      {
        name: "specific.hostelFacility.name",
        label: "Hostel Name",
        type: "text",
        placeholder: "e.g., UET Boys Hostel No. 3",
      },
      {
        name: "specific.hostelFacility.address",
        label: "Hostel Address",
        type: "text",
        placeholder: "Enter full hostel address",
      },
      {
        name: "specific.hostelFacility.wardenPhone",
        label: "Warden Contact",
        type: "text",
        placeholder: "e.g., 0300-1234567",
      },
    ],

    // ------------------------------
    //  NEED-BASED SCHOLARSHIP
    // ------------------------------
    "Need-based": [
      {
        name: "specific.assets.landOwned",
        label: "Land Owned",
        type: "text",
        placeholder: "e.g., 2 acres agricultural land / none",
      },
      {
        name: "specific.assets.cattleOwned",
        label: "Cattle Owned",
        type: "text",
        placeholder: "e.g., 2 cows, 1 buffalo / none",
      },
      {
        name: "specific.assets.transportOwned",
        label: "Transport Owned",
        type: "text",
        placeholder: "e.g., Motorcycle, Rickshaw, None",
      },
      {
        name: "specific.assets.assetValue",
        label: "Total Asset Value (PKR)",
        type: "number",
        placeholder: "e.g., 500000 (approximate value in PKR)",
      },
      {
        name: "specific.assets.loans",
        label: "Loans (if any)",
        type: "text",
        placeholder: "Mention bank/personal loan if applicable",
      },
      {
        name: "specific.assets.otherFinancingSource",
        label: "Other Financing Source",
        type: "text",
        placeholder: "e.g., Zakat, NGO support, relative help",
      },
      {
        name: "specific.expenditure.education",
        label: "Education Expenditure (PKR)",
        type: "number",
        placeholder: "Monthly education expenses in PKR",
      },
      {
        name: "specific.expenditure.rent",
        label: "Rent Expenditure (PKR)",
        type: "number",
        placeholder: "Monthly rent expenses in PKR",
      },
      {
        name: "specific.expenditure.medical",
        label: "Medical Expenditure (PKR)",
        type: "number",
        placeholder: "Average monthly medical expenses",
      },
    ],

    // ------------------------------
    //  MERIT-BASED SCHOLARSHIP
    // ------------------------------
    "Merit-based": [
      {
        name: "academicInfo.currentCGPA",
        label: "Current CGPA",
        type: "text",
        required: true,
        placeholder: "Enter your current CGPA (e.g., 3.85 / 4.00)",
      },
      {
        name: "academicInfo.discipline",
        label: "Discipline / Field of Study",
        type: "text",
        required: true,
        placeholder: "e.g., BS Computer Science / BBA / Engineering",
      },
    ],

    // ------------------------------
    // OTHER SCHOLARSHIP
    // ------------------------------
    Other: [
      {
        name: "specific.note",
        label: "Additional Information",
        type: "textarea",
        placeholder:
          "Mention any special situation, document, or info relevant to your scholarship application.",
      },
    ],
  };

  const specificFields = specificFieldsByType[category] || [];
  const formFields = [...commonFields, ...specificFields];

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
                  Apply for {title}
                </h2>
                <FormModal
                  formId="applyForm"
                  fields={formFields}
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
            <div className="space-y-6 sticky top-24 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-yellow-700">
                Application Guidelines
              </h2>
              <ul className="text-sm text-gray-800 space-y-2 list-disc pl-5">
                <li>Provide accurate and verifiable information only.</li>
                <li>
                  Any false or misleading details may result in
                  disqualification.
                </li>
                <li>Review your information carefully before submitting.</li>
                <li>
                  Random verification checks may be conducted by the system.
                </li>
                <li>
                  For assistance, please{" "}
                  <Link
                    to="/contact"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    contact support
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipApplicationPage;
