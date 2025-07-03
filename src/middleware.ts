import { NextFunction, request, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwt_key =""

export interface x extends Request {
    userId?:string
}


export const userMiddleware = (req: Request & x, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, jwt_key)
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}