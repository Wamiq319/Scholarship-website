import { Application } from "../models/index.js";

export const applyForScholarship = async (
  scholarshipId,
  studentId,
  documents
) => {
  try {
    //  Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      scholarshipId,
      studentId,
    });
    if (alreadyApplied) {
      return {
        status: "CONFLICT",
        message: "You have already applied for this scholarship",
      };
    }

    //  Create new application
    const newApplication = await Application.create({
      scholarshipId,
      studentId,
      documents,
      tracking: [
        {
          stage: "submitted",
          updatedBy: studentId,
          remarks: "Application submitted successfully",
        },
      ],
    });

    return { status: "SUCCESS", data: newApplication };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};
