
// import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';

import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env";
import User from "../models/User";
import { ObjectId } from "mongoose";

interface JwtPayload {
    id: string,
    role: string
}
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         _id: string | ObjectId
//         name: string;
//         email: string;
//         role: string;
//       };
//     }
//   }
// }

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


// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;

//   // 1. From cookie (your current setup)
//   if (req.cookies?.access_token) {
//     token = req.cookies.access_token;
//   }
//   // 2. From header (optional fallback)
//   else if (req.headers.authorization?.startsWith('Bearer ')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized – no token',
//     });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

//     const user = await User.findById(decoded.id).select('-password').lean();
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized – user not found',
//       });
//     }
// user ._id = user._id.toString() as any;

// req.user = {
//       _id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     };


   

//     next(); // success → go to next middleware/route
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized – invalid or expired token',
//     });
//   }
// }

export const authorizeRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
