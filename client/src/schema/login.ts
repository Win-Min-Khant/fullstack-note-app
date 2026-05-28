import z from "zod";

export const loginSchema = z.object({
    email: z.string().email('Please enter valid email address!').nonempty('Email is required to login.').trim(),
    password: z.string().nonempty('Password is required!').trim().min(5, 'Password must be at least 5 characters!')
})