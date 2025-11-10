import { createContact, getContacts } from "../services/index.js";
import { sendResponse } from "../utils/response.js";

// Create contact message
export const createContactMessage = async (req, res) => {
  const result = await createContact(req.body);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Message sent successfully",
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

// Get all contact messages (Admin)
export const fetchAllContacts = async (req, res) => {
  const result = await getContacts();

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "Contacts fetched successfully",
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
