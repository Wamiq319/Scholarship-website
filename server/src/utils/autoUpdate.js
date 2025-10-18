import { Scholarship } from "../models/index.js";

export const deactivateExpiredScholarships = async () => {
  try {
    const now = new Date();
    const result = await Scholarship.updateMany(
      { deadline: { $lt: now }, isActive: true },
      { $set: { isActive: false } }
    );
    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} scholarships deactivated.`);
    }
  } catch (err) {
    console.error("Auto deactivation failed:", err.message);
  }
};


  