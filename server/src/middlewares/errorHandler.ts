// import type { NextFunction, Request, Response } from "express";

// export const errorHandler = (err: Error, req: Request, res: Response, next?: NextFunction) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode).json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack
//     });
// }

import type { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // အကယ်၍ controller ထဲမှာ status code မသတ်မှတ်ခဲ့ရင် 500 လို့ ယူမယ်
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        // Production မှာ stack ကို လုံးဝ မပြတော့ဘဲ ဖျောက်ထားမယ်
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};