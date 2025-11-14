import { Announcement, Application, Contact } from "../models/index.js";

export const getAllUnreadCounts = async (userId) => {
  try {
    const announcementCount = await Announcement.countDocuments({
      readBy: { $nin: [userId] },
    });

    const applicationCount = await Application.countDocuments({
      readBy: { $nin: [userId] },
    });

    const contactCount = await Contact.countDocuments({
      readBy: { $nin: [userId] },
    });

    return {
      status: "SUCCESS",
      data: {
        announcement: announcementCount,
        application: applicationCount,
        contact: contactCount,
      },
    };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};
