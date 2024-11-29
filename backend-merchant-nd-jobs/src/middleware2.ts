import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_PASSWORDRIDER } from "./config"

export function authMiddleWare (req:Request, res:Response, next:NextFunction):void {
    const token = req.headers.authorization as unknown as string;

    try {
         const payload = jwt.verify(token,JWT_PASSWORDRIDER);
        // @ts-ignore
         req.id = payload.id;
         next()
    } catch (e) {
        console.log(e)
         res.status(403).json({
            message: "you are not signed up"
        })
    }
}