import { getAllUnreadCounts } from "../services/index.js";
import { sendResponse } from "../utils/index.js";

export const getUnreadCount = async (req, res) => {
  const userId = req.user._id;

  const result = await getAllUnreadCounts(userId);

  switch (result.status) {
    case "SUCCESS":
      return sendResponse(
        res,
        {
          success: true,
          message: "geted all counts form this user",
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
