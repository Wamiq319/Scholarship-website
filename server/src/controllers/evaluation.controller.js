import {
  evaluationCreation,
  getAllEvaluations,
  getEvaluationsByCommitteeMemberId,
} from "../services/index.js";
import { sendResponse } from "../utils/response.js";

export const getEvaluations = async (req, res) => {
  const result = await getAllEvaluations();

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, {
        success: true,
        message: "Evaluations retrieved successfully",
        data: result.data,
      });

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

export const createEvaluation = async (req, res) => {
  const { scores, comments, committeeMemberId, applicationId } = req.body;

  if (!scores || !comments || !committeeMemberId || !applicationId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const result = await evaluationCreation(
    scores,
    comments,
    committeeMemberId,
    applicationId
  );

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, {
        success: true,
        message: "Evaluation created successfully.",
        evaluation: result.evaluation,
      });

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

export const evaluatedById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Committee Member ID is required." });
  }

  const result = await getEvaluationsByCommitteeMemberId(id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, {
        success: true,
        message: "Evaluations retrieved successfully",
        data: result.data,
      });

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
