import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.js";
import type { Types } from "mongoose";

export interface AuthRequest extends Request {
   user?: {
        _id: string | Types.ObjectId;
        username: string;
        email: string;
   }
}

interface User {
    _id: string | Types.ObjectId;
    username: string;
    email: string;
}

const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401);
        throw new Error("User is unauthorized.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) {
            res.status(401);
            throw new Error("Not unauthorized, invalid token.");
        }
        req.user = await User.findById(decoded.userId).select("-password") as User;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not unauthorized, invalid token.");
    }
});

export { protect };