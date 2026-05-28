import type { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthRequest } from "./protect.js";
import { Todo } from "../models/todo.js";

const authorizeOwner = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
        res.status(404).send({message: "Todo not found!"});
    }
    if (todo?.userId.toString() !== req.user?._id.toString()) {
        res.status(403).send({message: "You are not the owner."});
    }
    next();
})

export {authorizeOwner};