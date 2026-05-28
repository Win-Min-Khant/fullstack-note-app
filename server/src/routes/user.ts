import { Router } from "express";
import { getAllUsers, getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.js";
import { protect } from "../middlewares/protect.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.get("/users", getAllUsers);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;