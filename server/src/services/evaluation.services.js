import { Application, Evaluation } from "../models/index.js";

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

    // Update Application
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {
        $push: {
          evaluations: savedEvaluation._id, // add evaluation reference
          tracking: {
            stage: "evaluated",
            updatedBy: committeeMemberId,
            remarks: comments || "Application evaluated",
          },
        },
        status: "evaluated",
      },
      { new: true } // return updated document
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
