import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "./config"
import { NextFunction, Request, Response } from "express"

export function authMiddleWare (req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization as unknown as string;

    try {
         const payload = jwt.verify(token,JWT_PASSWORD);
        // @ts-ignore
         req.id = payload.id;
         next()
    } catch (e) {
        return res.status(403).json({
            message: "you are not signed up"
        })
    }
}