import { Application } from "../models/index.js";
import cloudinary from "../utils/cloudinary.config.js";

// Student applies for a scholarship
export const applyForScholarship = async (
  scholarshipId,
  studentId,
  documents,
  eligibilityReason
) => {
  try {
    // Prevent duplicate application
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

    // --- Upload all documents to Cloudinary ---
    const uploadedDocs = {};
    for (const key in documents) {
      const file = documents[key];
      if (!file) continue;

      try {
        const uploadResponse = await cloudinary.uploader.upload(file);
        uploadedDocs[key] = uploadResponse.secure_url;
      } catch (err) {
        return {
          status: "UPLOAD_ERROR",
          message: `Failed to upload ${key}: ${err.message}`,
        };
      }
    }

    // --- Create new application with uploaded document URLs ---
    const newApplication = await Application.create({
      scholarshipId,
      studentId,
      eligibilityReason,
      documents: uploadedDocs,
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
      .populate("studentId", "name email department ")
      .populate("scholarshipId", "title deadline category")
      .populate("evaluations")
      .populate({
        path: "evaluations",
        populate: {
          path: "committeeMemberId",
          select: "name email",
        },
      });
    const appsWithCount = applications.map((app) => ({
      ...app.toObject(),
      evaluationsCount: app.evaluations?.length || 0,
    }));

    return { status: "SUCCESS", data: appsWithCount };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// get Application by ID
export const getApplicationById = async (id) => {
  try {
    // if id === student id
    let applications = await Application.find({ studentId: id })
      .populate("studentId")
      .populate("scholarshipId");

    // if id === aplication id
    if (!applications.length) {
      applications = await Application.findById(id)
        .populate("studentId")
        .populate("scholarshipId");
    }

    if (!applications) {
      return { status: "NOT_FOUND", message: "Application not found" };
    }

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
//  Delete Application by ID
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
