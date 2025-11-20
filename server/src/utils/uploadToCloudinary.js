import cloudinary from "./cloudinary.config.js";

export const uploadToCloudinary = async (file, folder = "scholarship-documents") => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "auto",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error.message || "Cloudinary upload failed");
  }
};
