import {
  createAnnouncements,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
} from "../services/index.js";
import { sendResponse } from "../utils/index.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  const result = await createAnnouncements(req.body);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Announcement created successfully",
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

// Get All
export const getAnnouncements = async (req, res) => {
  const result = await getAllAnnouncements();

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
        { success: false, message: "Unexpected error" },
        500
      );
  }
};

// Get by ID
export const getAnnouncement = async (req, res) => {
  const result = await getAnnouncementById(req.params.id);

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
        { success: false, message: "Unexpected error" },
        500
      );
  }
};

// Delete
export const deleteAnnouncementById = async (req, res) => {
  const result = await deleteAnnouncement(req.params.id);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(res, { success: true, message: result.message }, 200);
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
        { success: false, message: "Unexpected error" },
        500
      );
  }
};
