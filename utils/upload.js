import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(imgFilePath) {
  try {
    await cloudinary.uploader
      .upload(imgFilePath, {
        folder: process.env.CLOUDINARY_IMAGES_FOLDER,
        public_id: "user_profile_image",
        overwrite: true,
      }).then(response => {
        // imgUrl = response.url;
        fs.unlinkSync(imgFilePath);
        return response.url;
      }).catch(err => {
        fs.unlinkSync(imgFilePath);
        console.log("Upload Error:", err);
      });
  } catch (error) {
    fs.unlinkSync(imgFilePath);
    console.log("Cloudinary Setup Error:", error);
  }
}

export { uploadToCloudinary };
