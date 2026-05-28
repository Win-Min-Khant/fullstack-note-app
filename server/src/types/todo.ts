import type { Schema } from "mongoose";

export interface Todo {
    _id: string;
    title: string;
    description: string;
    userId: Schema.Types.ObjectId
}