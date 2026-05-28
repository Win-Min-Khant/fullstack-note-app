import z from "zod";

export const profileSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters.').max(8, 'Username must not be greater than 8 characters.').trim().lowercase('All username must be lowercase letters.'),
    email: z.string().trim().nonempty('Email is required!').email(),
    password: z.string().trim().optional().refine((val) => !val || val.length <= 5, {
        message: "Password must contain at least 5 characters."
    })
})