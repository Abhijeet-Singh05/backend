import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { resourceLimits } from "worker_threads";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary= async (localFilePath)=>{
    try{
        if(!localFilePath){
            throw new Error("File path is required");
        }

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });

        console.log("File uploaded on cloudinary successfully");
        console.log(response.url);
        fs.unlinkSync(localFilePath); // delete the local file after upload
        return response;
    }
    catch(err){
        fs.unlinkSync(localFilePath); // delete the local file in case of error
        console.log("Error uploading on cloudinary", err);
        return null;
    }
}


export {uploadOnCloudinary};

/*
// Example usage:
cloudinary.v2.uploader
.upload("https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg", { 
  public_id: "wiki_shirt",
  quality_analysis: true, 
  colors: true, 
  categorization: "google_tagging",
  auto_tagging: 0.8})
.then(result=>console.log(result));

*/