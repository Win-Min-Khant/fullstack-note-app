import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters.').max(8, 'Username must not be greater than 8 characters.').trim().lowercase('All username must be lowercase letters.'),
    email: z.string().trim().nonempty('Email is required!').email(),
    password: z.string().trim().nonempty('Password is required!').min(5, 'Password must be at least 5 characters!')
})