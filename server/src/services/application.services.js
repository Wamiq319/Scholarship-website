import { Application } from "../models/index.js";

// Student applies for a scholarship
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

// Admin and committee retrieves all applications
export const getAllApplications = async () => {
  try {
    const applications = await Application.find()
      .populate("studentId", "name email")
      .populate("scholarshipId", "title");

    return { status: "SUCCESS", data: applications };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// Update Application
export const applicationUpdate = async (id, updateData) => {
  try {
    let updateQuery = {};

    if (updateData.tracking) {
      updateQuery.$push = { tracking: { $each: updateData.tracking } };
      delete updateData.tracking;
    }

    if (Object.keys(updateData).length > 0) {
      updateQuery.$set = updateData;
    }
    const updated = await Application.findByIdAndUpdate(id, updateQuery, {
      new: true,
    })
      .populate("studentId", "name email")
      .populate("scholarshipId", "title");

    if (!updated) {
      return { status: "NOT_FOUND", message: "Application not found" };
    }

    return { status: "SUCCESS", data: updated };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};


export const deleteApplicationById = async (id) => {
  try {
    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return { status: "NOT_FOUND", message: "Application not found" };
    }

    return { status: "SUCCESS", data: deleted };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};