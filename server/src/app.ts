import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import todoRoutes from './routes/todo.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : process.env.CLIENT_LOCAL_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.static("public"));

app.use(userRoutes);
app.use("/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT ${PORT}`);
})