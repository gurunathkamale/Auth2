
// import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';

import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env";


interface JwtPayload {
    id: string,
    role: string
}



export const protect = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies?.token;

    if(!token) return res.status(401).json({message: 'Not authenticated'});

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error: any) {
        return res.json({message: 'Invalid Token'})
    };
};





export const authorizeRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
