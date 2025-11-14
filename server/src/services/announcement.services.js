import { Announcement } from "../models/index.js";

export const createAnnouncements = async (body) => {
  try {
    // Check if same title already exists (optional, avoid duplicates)
    const existing = await Announcement.findOne({ title: body.title });
    if (existing) {
      return {
        status: "CONFLICT",
        message: "An announcement with this title already exists",
      };
    }

    const announcement = await Announcement.create(body);

    return {
      status: "SUCCESS",
      data: announcement,
    };
  } catch (error) {
    console.error("Error creating announcement:", error);
    return {
      status: "SERVER_ERROR",
      message: "Internal server error",
    };
  }
};

//  Get All Announcements
export const getAllAnnouncements = async (userId) => {
  try {
    const announcements = await Announcement.find()
      .populate("scholarshipId", "title")
      .sort({ createdAt: -1 });

    for (let ann of announcements) {
      if (!ann.readBy.includes(userId)) {
        ann.readBy.push(userId);
        await ann.save();
      }
    }

    return {
      status: "SUCCESS",
      data: announcements,
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return {
      status: "SERVER_ERROR",
      message: "Failed to fetch announcements",
    };
  }
};

//  Get Single Announcement by ID
export const getAnnouncementById = async (id) => {
  try {
    const announcement = await Announcement.findById(id).populate(
      "scholarshipId",
      "title"
    );

    if (!announcement) {
      return {
        status: "NOT_FOUND",
        message: "Announcement not found",
      };
    }

    return {
      status: "SUCCESS",
      data: announcement,
    };
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return {
      status: "SERVER_ERROR",
      message: "Failed to fetch announcement",
    };
  }
};

export const announcdmentUpdate = async (id, body) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("scholarshipId", "title");

    if (!updated) {
      return {
        status: "NOT_FOUND",
        message: "Announcement not found",
      };
    }

    return {
      status: "SUCCESS",
      data: updated,
    };
  } catch (error) {
    console.error("Error updating announcement:", error);
    return {
      status: "SERVER_ERROR",
      message: "Failed to update announcement",
    };
  }
};

//  Delete Announcement
export const deleteAnnouncement = async (id) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) {
      return {
        status: "NOT_FOUND",
        message: "Announcement not found",
      };
    }

    return {
      status: "SUCCESS",
      message: "Announcement deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return {
      status: "SERVER_ERROR",
      message: "Failed to delete announcement",
    };
  }
};
