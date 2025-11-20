import {
  createScholarship,
  deleteScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
} from "../services/index.js";

import { sendResponse } from "../utils/index.js";

// Create Scholarship
export const create = async (req, res) => {
  const {
    title,
    description,
    eligibilityCriteria,
    amount,
    deadline,
    category,
    scope,
    isActive,
  } = req.body;

  // Validation
  if (
    !title ||
    !description ||
    !scope ||
    !eligibilityCriteria.minGPA ||
    !eligibilityCriteria.maxIncome ||
    !eligibilityCriteria.department ||
    !eligibilityCriteria.semester ||
    !amount ||
    !deadline ||
    !category
  ) {
    return sendResponse(
      res,
      { success: false, message: "All required fields must be filled" },
      400
    );
  }

  const result = await createScholarship({
    title,
    description,
    eligibilityCriteria,
    amount,
    deadline,
    category,
    scope,
    isActive,
  });

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Scholarship created successfully",
          data: result.data,
        },
        201
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

// Get All Scholarships
export const AllScholarshipsGet = async (req, res) => {
  const result = await getAllScholarships();

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, { success: true, data: result.data }, 200);
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

// Get Single Scholarship by ID
export const scholarshipGetById = async (req, res) => {
  const { id } = req.params;

  const result = await getScholarshipById(id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, { success: true, data: result.data }, 200);
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

// Update Scholarship
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      eligibilityCriteria,
      amount,
      deadline,
      category,
      isActive,
    } = req.body;

    //  dynamic updateData object: only add existing fields
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (amount !== undefined) updateData.amount = amount;
    if (deadline !== undefined) updateData.deadline = deadline;
    if (category !== undefined) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;

    //  nested eligibility check
    if (eligibilityCriteria && typeof eligibilityCriteria === "object") {
      updateData.eligibilityCriteria = {};
      const { minGPA, maxIncome, department, semester } = eligibilityCriteria;
      if (minGPA !== undefined) updateData.eligibilityCriteria.minGPA = minGPA;
      if (maxIncome !== undefined)
        updateData.eligibilityCriteria.maxIncome = maxIncome;
      if (department !== undefined)
        updateData.eligibilityCriteria.department = department;
      if (semester !== undefined)
        updateData.eligibilityCriteria.semester = semester;
    }

    const result = await updateScholarship(id, updateData);

    switch (result.status) {
      case "SUCCESS":
        return sendResponse(
          res,
          {
            success: true,
            message: "Scholarship updated successfully",
            data: result.data,
          },
          200
        );
      case "NOT_FOUND":
        return sendResponse(res, { success: false, message: result.message }, 404);
      case "SERVER_ERROR":
        return sendResponse(res, { success: false, message: result.message }, 500);
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
      { success: false, message: "Server error while updating scholarship" },
      500
    );
  }
};

// Delete Scholarship
export const Delete = async (req, res) => {
  const { id } = req.params;

  const result = await deleteScholarship(id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        { success: true, message: "Scholarship deleted successfully" },
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
