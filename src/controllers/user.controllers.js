import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";   
import { User }   from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// generating auth tokens
const generateAccessTokenAndRefreshToken = async (userId) => {
   try{
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();


      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave:false});

      return {accessToken, refreshToken};
   }
   catch(err){
      throw new ApiError(500, "Something went wrong while generating auth tokens");
   }
}



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


const loginUser = asyncHandler(
   async (req,res) => {
      // Login logic here
      // Steps for logging in user
      /* get user details from frontend
         check if username and email are provided
         find user in db using username or email
         if user not found, throw error
         else compare provided password with stored password
         if password does not match, throw error
         if password matches, generate auth tokens (access and refresh)
         remove sensitive info from response
         return response with user details and tokens
      */

      // get user details from frontend
      const {username,email,password} = req.body;
      
      console.log("login email:", email);
      console.log("login username:", username);

      // check if username and email are provided
      if(!username && !email ){
         throw new ApiError(400, "Username or email  are required");
      }
      if(!password){
         throw new ApiError(400, "Password is required");
      }

      // find user in db using username or email
      const user = await User.findOne({
         $or: [{username},{email}]
      })

      // if user not found, throw error
      if(!user){
         throw new ApiError(404, "User not found with this username or email");
      }

      // compare provided password with stored password
      const isPasswordValid = await user.isPasswordCorrect(password);

      // if password does not match, throw error
      if(!isPasswordValid){
         throw new ApiError(401, "Invalid password");
      }

      // if password matches, generate auth tokens (access and refresh)
      const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);


      // remove sensitive info from response
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
      
      // send response in cookie
      
      const options = {
         httpOnly: true,
         secure : true,
      }

      return res
      .status(200)
      .cookie("accessToken",accessToken, options)
      .cookie("refreshToken",refreshToken, options)
      .json(
         new ApiResponse(
            200,
            {
               user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
         )
      );
         
     

   }
)


const logoutUser = asyncHandler(
   async (req,res) => {
      // Logout logic here
      // Steps for logging out user
      /* get user id from req.user
         use verifyJWT middleware in route
         remove refresh token from db
         clear cookies from response
         return response
      */

         await User.findByIdAndUpdate(
            req.user._id,
            {
               $set: {refreshToken: undefined}
            },
            {
               new: true,
            }
         )

         const options = {
            httpOnly: true,
            secure : true,
         }

         return res.
         status(200)
         .clearCookie("accessToken", options)
         .clearCookie("refreshToken", options)
         .json(
            new ApiResponse(
               200,
               null,
               "User logged out successfully"
            )
         )

   }
);

const refreshAccessToken = asyncHandler(
   async(req,res) => {
      // Refresh access token logic here
      /* get refresh token from cookies or headers
         if not provided, throw error
         verify refresh token
         if invalid, throw error
         find user in db using id from token
         if user not found, throw error
         generate new access token
         return response with new access token
      */

      // get refresh token from cookies or headers
      const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
      // if not provided, throw error
      if(!incomingRefreshToken){
         throw new ApiError(401, "Unauthorized request");
      }
      try {
         // verify refresh token
         const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
   
         if(!decodedToken){
            throw new ApiError(401, "Invalid refresh token");
         }
   
         // find user in db using id from token
         const user = await User.findById(decodedToken._id);
         // check if user query return something
         if(!user){
            throw new ApiError(401,"invalid refresh token!");
         }
         // if token is not matched db refresh token
         if( incomingRefreshToken !== user?.refreshToken ){
            throw new ApiError(401,"Refresh token is used or expired");
         }
         
         const options = {
            httpOnly: true,
            secure: true,
         }
   
   
         // generating token
         const {accessToken,newrefreshToken} = await generateAccessTokenAndRefreshToken(user._id);
   
         // sending response cookie
         return res
         .status(200)
         .cookie("accessToken",accessToken,options)
         .cookie("refreshToken",newrefreshToken,options)
         .json(
            new ApiResponse(
               200,
               {accessToken,refreshToken: newrefreshToken},
               "Access token is refreshed"
            )
         )
   
      } catch (error) {
         throw new ApiError(401,error?.message || "unauthorized requrest.")
      }


   }
)

export {registerUser,loginUser,logoutUser,refreshAccessToken}