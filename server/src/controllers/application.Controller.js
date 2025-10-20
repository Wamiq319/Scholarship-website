import { applyForScholarship } from "../services/index.js";
import { sendResponse } from "../utils/index.js";

export const ScholarshipApply = async (req, res) => {
  const { scholarshipId, studentId, documents } = req.body;

  const result = await applyForScholarship(scholarshipId, studentId, documents);

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
