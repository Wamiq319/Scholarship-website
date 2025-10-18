import Scholarship from "../models/Scholarship.js";

// Create Scholarship
export const createScholarship = async ({
  title,
  description,
  eligibilityCriteria,
  amount,
  deadline,
  category,
  isActive
}) => {
  try {
    const scholarship = new Scholarship({
      title,
      description,
      eligibilityCriteria,
      amount,
      deadline,
      category,
      isActive
    });
    const saved = await scholarship.save();
    return { status: "SUCCESS", data: saved };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// Get All Scholarships
export const getAllScholarships = async () => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    return { status: "SUCCESS", data: scholarships };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// Get Single Scholarship by ID
export const getScholarshipById = async (id) => {
  try {
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return { status: "NOT_FOUND", message: "Scholarship not found" };
    }
    return { status: "SUCCESS", data: scholarship };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// Update Scholarship
export const updateScholarship = async (
  id,
  { title, description, eligibilityCriteria, amount, deadline }
) => {
  try {
    const updated = await Scholarship.findByIdAndUpdate(
      id,
      {
        title,
        description,
        eligibilityCriteria,
        amount,
        deadline,
      },
      {
        new: true,
      }
    );
    if (!updated) {
      return { status: "NOT_FOUND", message: "Scholarship not found" };
    }
    return { status: "SUCCESS", data: updated };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};

// Delete Scholarship
export const deleteScholarship = async (id) => {
  try {
    const deleted = await Scholarship.findByIdAndDelete(id);
    if (!deleted) {
      return { status: "NOT_FOUND", message: "Scholarship not found" };
    }
    return { status: "SUCCESS" };
  } catch (error) {
    return { status: "SERVER_ERROR", message: error.message };
  }
};
