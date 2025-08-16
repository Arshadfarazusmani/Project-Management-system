import dotenv from "dotenv"
dotenv.config({
    path:".env"
})
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No local file path provided.");
      return null;
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    });

    // File has been uploaded successfully
    console.log("File has been uploaded on Cloudinary:", result.url);

    // After a successful upload, remove the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    // Remove the locally saved temporary file as the upload operation failed
    // We wrap this in a try-catch as well, just in case the file doesn't exist for some reason
    try {
        fs.unlinkSync(localFilePath);
    } catch (cleanupError) {
        console.error("Failed to delete local temporary file:", cleanupError);
    }
    return null;
  }
};

export { uploadOnCloudinary };