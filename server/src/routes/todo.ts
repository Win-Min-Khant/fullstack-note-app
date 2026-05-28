import { Router } from "express";
import { createTodo, deleteTodo, getSingleTodo, getTodos, updateTodo } from "../controllers/todo.js";
import { protect } from "../middlewares/protect.js";
import { authorizeOwner } from "../middlewares/authorizeOwner.js";

const router = Router();
router.post("/create", protect, createTodo);
router.get("/", getTodos);
router.get("/:id", getSingleTodo);
router.put("/:id", protect, authorizeOwner, updateTodo);
router.delete("/:id", protect, authorizeOwner, deleteTodo);

export default router;