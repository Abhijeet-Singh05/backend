import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";   
import { User }   from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const registerUser = asyncHandler(
   async (req,res) => {
         // Registration logic here
         /* step for registering user
            get user details from frontend
            validate user details (not empty)
            check if user already exist (check username or email)
            check for images, check for avatar
            upload them to cloudinary and take url from cloudinary
            create user object - crate entry in db
            remove password, refresh token from response
            check for user creation
            return response 
         */


         // get user details from frontend   
         const {fullname, email, username, password} = req.body;
         console.log("email:", email);
         console.log("username:", username);



         // validate user details
         if(
            [fullname, email, username, password].some((field) => !field || field.trim() === "") 
         ){
            throw new ApiError(400, "All fields are required");
         }
         // or 
         // if(fullnmae === ""){
         //    throw new ApiError(400, "Fullname is required");
         // }


         // check if user already exist
         const existedUser =  await User.findOne({
            $or: [{ username },{ email }]
         })

         // checking existing user
         if(existedUser){
            throw new ApiError(409, "User already exists with this username or email");
         }


         // get image paths from req.files
         const avatarLocalPath = req.files?.avatar[0]?.path;
         //const coverImageLocalPath = req.files?.coverImage[0]?.path;


         let coverImageLocalPath;
         if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
            coverImageLocalPath = req.files.coverImage[0].path;
         }
         else{
            coverImageLocalPath = null;
         }

         // checking avatar image
         if(!avatarLocalPath){
            throw new ApiError(400, "Avatar image is required");
         }

         // upload images to cloudinary
         const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");
         //const coverImage = await uploadOnCloudinary(coverImageLocalPath, "coverImage");
         const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath, "coverImage") : null;

         // checking avatar upload
         if (!avatar){
            throw new ApiError(500, "Failed to upload avatar image");
         }


         // create user object - create entry in db
         const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            username: username.toLowerCase(),
            password
         });

         
         // removing sensitive info from response
         const createdUser = await User.findById(user._id).select("-password -refreshToken");


         // checking user creation
         if(!createdUser){
            throw new ApiError(500, "Somwthing went wrong while registering user");
         }
         

         // returning response
         return res.status(201).json(
            new ApiResponse(
               201,
               createdUser,
               "User registered successfully",

            )
         ) ;
   }
);


export {registerUser}