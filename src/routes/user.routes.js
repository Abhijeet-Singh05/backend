import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, changeCurrentPassword,
getCurrentUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(
    upload.fields([
    { 
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
    ]),
     registerUser);


router.route("/login").post(loginUser);

// secured routes can be added here
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(verifyJWT,refreshAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/getCurrentUser").post(verifyJWT,getCurrentUser);
router.route("/updateAccountDetails").post(verifyJWT,updateAccountDetails);
router.route("/updateAvatar").post(verifyJWT,upload.single("avatar"),updateAvatar);
router.route("/updateCoverImage").post(verifyJWT,upload.single("coverImage"),updateCoverImage);

export default router;