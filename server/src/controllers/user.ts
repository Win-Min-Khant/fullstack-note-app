import type { Request, Response } from "express";
import { User } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthRequest } from "../middlewares/protect.js";

// --- Register User ---
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({ username, email, password });

    // Password ကို client ဆီ မပို့ခင် ဖယ်ထုတ်ခြင်း
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({ 
        user: userWithoutPassword, 
        message: "User created successfully." 
    });
});

// --- Login User ---
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // .select("+password") ပါမှ bcrypt compare လုပ်လို့ရမှာပါ
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.isMatchPassword(password))) {
        await generateToken(res, user._id);
        
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: "Login successful."
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});

// --- Get All Users ---
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json({ 
        users, 
        message: "Fetched all users successfully." 
    });
});

// Logout User
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: "User logout successfully."});
})

// Get User Profile
export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = {
        _id : req.user?._id,
        username: req.user?.username,
        email: req.user?.email
    };
    res.status(200).json({user});
})

// Update User Profile
export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.")
    }

    user.username = req.body.username || user.username
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    const { password: _, ...updatedUserWithoutPassword } = updatedUser.toObject();
    
    res.status(200).json({updatedUser: updatedUserWithoutPassword});
})