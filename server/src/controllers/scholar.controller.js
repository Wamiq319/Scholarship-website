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
  const { title, description, eligibilityCriteria, amount, deadline } =
    req.body;

  // Validation
  if (!title || !description || !eligibilityCriteria || !amount || !deadline) {
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
export const getAll = async (req, res) => {
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
export const getById = async (req, res) => {
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
  const { id } = req.params;
  const { title, description, eligibilityCriteria, amount, deadline } =
    req.body;

  const result = await updateScholarship(id, {
    title,
    description,
    eligibilityCriteria,
    amount,
    deadline,
  });

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
