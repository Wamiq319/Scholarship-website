import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // ---------------------------
    // Relations
    // ---------------------------
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ---------------------------
    // Status & Review
    // ---------------------------
    status: {
      type: String,
      enum: ["submitted", "under_review", "evaluated", "approved", "rejected"],
      default: "submitted",
    },
    reviewNotes: String,
    evaluationScore: Number,
    evaluations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluation",
      },
    ],

    // ---------------------------
    // Scholarship Type
    // ---------------------------
    scholarshipType: {
      type: String,
      enum: ["PEEF", "Merit-based", "Need-based", "Other"],
      required: true,
    },

    // ---------------------------
    // 1. Personal Information (Common & Required)
    // ---------------------------
    personalInfo: {
      fullName: { type: String, required: true, trim: true },
      cnic: { type: String, required: true, trim: true },
      gender: { type: String, enum: ["male", "female", "other"] },
      dateOfBirth: { type: Date },
      maritalStatus: { type: String },
      domicile: {
        province: String,
        district: String,
      },
      nationality: String,
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true },
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
      isWorking: { type: Boolean, default: false },
      monthlyIncome: { type: Number },
    },

    // ---------------------------
    // 2. Academic Information (Common & Required)
    // ---------------------------
    academicInfo: {
      instituteName: { type: String, required: true },
      instituteAddress: String,
      discipline: { type: String, required: true },
      yearOrSemester: String,
      currentCGPA: String,
      previousEducation: [
        {
          level: String, // Matric, Inter, Bachelor
          institute: String,
          year: String,
          totalMarks: String,
          obtainedMarks: String,
        },
      ],
    },

    // ---------------------------
    // 3. Family Information (Common & Required)
    // ---------------------------
    familyInfo: {
      fatherName: { type: String, required: true },
      fatherCNIC: String,
      fatherAlive: { type: Boolean, default: true },
      fatherOccupation: String,
      fatherMonthlyIncome: { type: Number, required: true },
      totalFamilyMembers: Number,
      earningMembers: Number,
      siblingsStudying: {
        count: Number,
        totalMonthlyFee: Number,
      },
      otherSupportingPerson: {
        name: String,
        relation: String,
        occupation: String,
        monthlySupport: Number,
      },
    },

    // ---------------------------
    // 4. Financial Information (Common Core)
    // ---------------------------
    financialInfo: {
      totalMonthlyIncome: { type: Number, required: true },
      monthlyEducationExpense: Number,
      otherExpenses: Number,
      hasOtherSupport: { type: Boolean, default: false },
      supportSource: String,
    },

    // ---------------------------
    // 5. Statement of Purpose (Required)
    // ---------------------------
    statementOfPurpose: {
      type: String,
      required: true,
      trim: true,
    },

    // ---------------------------
    // 6. Documents (Common + Optional)
    // ---------------------------
    documents: {
      CNIC: String,
      guardianCNIC: String,
      incomeCertificate: String,
      feeVoucher: String,
      transcript: String,
      utilityBill: String,
      bankInvoice: String,
      rentAgreement: String,
      additional: [String],
    },

    // ---------------------------
    // 7. Specific Fields (Optional for Each Type)
    // ---------------------------
    specific: {
      // PEEF
      eligibilityChecklist: {
        isPakistani: Boolean,
        notAvailingOtherScholarship: Boolean,
      },
      transportType: {
        type: [String], // e.g., ["motorcycle", "car"]
      },
      hostelFacility: {
        availing: Boolean,
        name: String,
        address: String,
        wardenPhone: String,
      },

      //  Need-Based
      assets: {
        landOwned: String,
        cattleOwned: String,
        transportOwned: [String],
        assetValue: Number,
        loans: String,
        otherFinancingSource: String,
      },
      expenditure: {
        education: Number,
        rent: Number,
        medical: Number,
      },
    },

    // ---------------------------
    // 8. Eligibility + Tracking (Base)
    // ---------------------------
    eligibilityReason: {
      type: String,
      required: true,
      trim: true,
    },
    readBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    tracking: [
      {
        stage: String, // e.g. "submitted", "verified", "approved"
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedAt: { type: Date, default: Date.now },
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
