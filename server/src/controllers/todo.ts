import type { Request, Response } from "express";
import { Todo } from "../models/todo.js";
import type { AuthRequest } from "../middlewares/protect.js";

export const createTodo = async (req: AuthRequest, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?._id;
    try {
        const newTodo = new Todo({
            title,
            description,
            userId
        });
        const savedTodo = await newTodo.save();
        res.status(201).json({
            message: "Todo created successfully.",
        })
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            message: "Todos retrieved successfully.",
            todos
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found."
            });
        }
        res.status(200).json({
            message: "Todo retrieved successfully.",
            todo
        });
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found."
            });
        }
        res.status(200).json({
            message: "Todo updated successfully."
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found."
            });
        }
        res.status(200).json({
            message: "Todo deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};