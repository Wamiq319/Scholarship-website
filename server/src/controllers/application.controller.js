import {
  applicationUpdate,
  applyForScholarship,
  deleteApplicationById,
  getAllApplications,
  getApplicationById,
} from "../services/index.js";
import { sendResponse } from "../utils/index.js";

// Student applies for a scholarship
export const ScholarshipApply = async (req, res) => {
  const { scholarshipId, studentId, documents, eligibilityReason } = req.body;

  if (
    scholarshipId === undefined ||
    studentId === undefined ||
    eligibilityReason === undefined
  ) {
    return sendResponse(
      res,
      { success: false, message: "scholarshipId and studentId are required" },
      400
    );
  }

  const result = await applyForScholarship(
    scholarshipId,
    studentId,
    documents,
    eligibilityReason
  );

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Application submitted successfully",
          data: result.data,
        },
        201
      );
    case "CONFLICT":
      return sendResponse(
        res,
        { success: false, message: result.message },
        409
      );
    case "UPLOAD_ERROR":
      return sendResponse(
        res,
        { success: false, message: result.message },
        500
      );
    case "SERVER_ERROR":
      return sendResponse(
        res,
        { success: false, message: result.message },
        500
      );
    default:
      return sendResponse(
        res,
        { success: false, message: "Unexpected error occurred" },
        500
      );
  }
};

// Admin and committee retrieves all applications
export const getApplications = async (req, res) => {
  const result = await getAllApplications();

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Applications retrieved successfully",
          data: result.data,
        },
        200
      );
    case "SERVER_ERROR":
      return sendResponse(
        res,
        { success: false, message: result.message },
        500
      );
    default:
      return sendResponse(
        res,
        { success: false, message: "Unexpected error occurred" },
        500
      );
  }
};

export const ApplicationGetById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(
      res,
      { success: false, message: "Id is required" },
      404
    );
  }

  const result = await getApplicationById(id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Application retrieved successfully",
          data: result.data,
        },
        200
      );
    case "NOT_FOUND":
      return sendResponse(
        res,
        { success: false, message: result.message },
        404
      );
    case "SERVER_ERROR":
      return sendResponse(
        res,
        { success: false, message: result.message },
        500
      );
    default:
      return sendResponse(
        res,
        { success: false, message: "Unexpected error occurred" },
        500
      );
  }
};

//  admin and committee updates application
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      reviewNotes,
      evaluationScore,
      reviewedBy,
      documents,
      tracking,
    } = req.body;

    const updateData = {};

    if (status !== undefined) updateData.status = status;
    if (reviewNotes !== undefined) updateData.reviewNotes = reviewNotes;
    if (evaluationScore !== undefined)
      updateData.evaluationScore = evaluationScore;
    if (reviewedBy !== undefined && Array.isArray(reviewedBy))
      updateData.reviewedBy = reviewedBy;
    if (documents !== undefined && Array.isArray(documents))
      updateData.documents = documents;

    // tracking nested update
    if (tracking && Array.isArray(tracking)) {
      updateData.tracking = tracking.map((item) => {
        const obj = {};
        if (item.stage !== undefined) obj.stage = item.stage;
        if (item.updatedBy !== undefined) obj.updatedBy = item.updatedBy;
        if (item.remarks !== undefined) obj.remarks = item.remarks;
        obj.updatedAt = item.updatedAt || new Date();
        return obj;
      });
    }

    const result = await applicationUpdate(id, updateData);

    switch (result.status) {
      case "SUCCESS":
        return sendResponse(
          res,
          {
            success: true,
            message: "Application updated successfully",
            data: result.data,
          },
          200
        );
      case "NOT_FOUND":
        return sendResponse(
          res,
          { success: false, message: result.message },
          404
        );
      case "SERVER_ERROR":
        return sendResponse(
          res,
          { success: false, message: result.message },
          500
        );
      default:
        return sendResponse(
          res,
          { success: false, message: "Unexpected error occurred" },
          500
        );
    }
  } catch (error) {
    console.error("Update Error:", error);
    return sendResponse(
      res,
      { success: false, message: "Server error while updating application" },
      500
    );
  }
};

//  admin deletes an application
export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  const result = await deleteApplicationById(id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Application deleted successfully",
        },
        200
      );
    case "NOT_FOUND":
      return sendResponse(
        res,
        { success: false, message: result.message },
        404
      );
    case "SERVER_ERROR":
      return sendResponse(
        res,
        { success: false, message: result.message },
        500
      );
    default:
      return sendResponse(
        res,
        { success: false, message: "Unexpected error occurred" },
        500
      );
  }
};
