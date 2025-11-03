import { Application, Evaluation } from "../models/index.js";
import { calculateEvaluationScore } from "../utils/index.js";

export const getAllEvaluations = async () => {
  try {
    const evaluations = await Evaluation.find();

    return { status: "SUCCESS", data: evaluations };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

export const evaluationCreation = async (
  scores,
  comments,
  committeeMemberId,
  applicationId
) => {
  try {
    const newEvaluation = new Evaluation({
      scores,
      comments,
      committeeMemberId,
      applicationId,
    });

    const savedEvaluation = await newEvaluation.save();

    const allEvaluations = await Evaluation.find({ applicationId });

    // Calculate average score using utility
    const avgScore = calculateEvaluationScore(allEvaluations);

    // Update application
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {
        $push: {
          evaluations: savedEvaluation._id,
          tracking: {
            stage: "evaluated",
            updatedBy: committeeMemberId,
            remarks: comments || "Application evaluated",
          },
        },
        status: "evaluated",
        evaluationScore: avgScore,
      },
      { new: true }
    );

    return { status: "SUCCESS", evaluation: savedEvaluation };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

export const getEvaluationsByCommitteeMemberId = async (committeeMemberId) => {
  try {
    const evaluations = await Evaluation.find({ committeeMemberId })
      .populate({
        path: "applicationId",
        populate: [
          {
            path: "studentId",
            select: "name email department rollNumber",
          },
          {
            path: "scholarshipId",
            select: "title type deadline",
          },
        ],
      })
      .populate("committeeMemberId", "name email");

    if (evaluations.length === 0 || evaluations === undefined) {
      return {
        status: "NOT_FOUND",
        message: "No evaluations found for this committee member.",
      };
    }

    return { status: "SUCCESS", data: evaluations };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};
