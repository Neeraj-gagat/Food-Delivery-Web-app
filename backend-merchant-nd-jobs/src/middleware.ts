import jwt , {JwtPayload} from "jsonwebtoken"
import { JWT_PASSWORD } from "./config"
import { NextFunction, Request, Response } from "express"

export function authMiddleWare (req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Authorization token required"
        })
    }

    try {
         const payload = jwt.verify(token,JWT_PASSWORD) as JwtPayload;
        // @ts-ignore
         req.id = payload.id;
         next()
    } catch (e) {
        return res.status(403).json({
            message: "you are not signed up"
        })
    }
}