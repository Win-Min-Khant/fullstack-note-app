// import type { NextFunction, Request, Response } from "express";

// export const asyncHandler = (controllerFn: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => (req: Request, res: Response, next?: NextFunction) => {
//     Promise.resolve(controllerFn(req, res, next)).catch(next);
// }

import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { AuthRequest } from "../middlewares/protect.js";

// controllerFn ရဲ့ return type ကို any သို့မဟုတ် Promise<any> ထားတာက ပိုအဆင်ပြေပါတယ်
export const asyncHandler = (controllerFn: (req: Request | AuthRequest, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req, res, next) => {
        // Promise.resolve က controllerFn ထဲက error တွေကို ဖမ်းပြီး next ဆီ ပို့ပေးမှာပါ
        Promise.resolve(controllerFn(req, res, next)).catch(next);
    };
};
