import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOWDINARY_CLOUD_NAME,
    api_key:process.env.CLOWDINARY_API_KEY,
    api_secret:process.env.CLOWDINARY_SECRET_KEY,
    secure: true,
});
export default cloudinary;