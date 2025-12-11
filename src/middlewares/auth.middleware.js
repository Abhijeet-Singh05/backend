import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";


const verifyJWT = asyncHandler(
    async(req,_,next) => {

       
       try {
         // verify JWT token logic here
         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
         if(!token){
             throw new ApiError(401, "Unauthorized");
         }
 
         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

         if(!decodedToken){
             throw new ApiError(401, "Invalid token");
         }
 
         const user = await User.findById(decodedToken._id);
         if(!user){
 
             /// if user not found
 
             throw new ApiError(404, "User not found");
         }
 
         // attach user to request object
         req.user = user;
 
         next();
       } 
       catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized");
       }

    }
);


export default verifyJWT;