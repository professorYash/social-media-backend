import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(imgFilePath, uniqueId) {
  let imgUrl = '';
  try {
    await cloudinary.uploader
      .upload(imgFilePath, {
        folder: process.env.CLOUDINARY_IMAGES_FOLDER,
        public_id: `user_profile_image_${uniqueId}`,
        overwrite: true,
      }).then(response => {
        // imgUrl = response.url;
        fs.unlinkSync(imgFilePath);
        imgUrl = response.url;
      }).catch(err => {
        fs.unlinkSync(imgFilePath);
        console.log("Upload Error:", err);
      });
  } catch (error) {
    fs.unlinkSync(imgFilePath);
    console.log("Cloudinary Setup Error:", error);
  }
  return imgUrl;
}

export { uploadToCloudinary };
