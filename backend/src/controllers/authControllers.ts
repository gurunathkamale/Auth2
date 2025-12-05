// import { Request, Response } from "express";
// import User from "../models/User";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/env";
// import cookie from 'cookie-parser'

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select("-password");
//     return res.status(200).json(users);
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// //register user
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, role } = req.body;

//     //checking for existing user
//     const exists = await User.findOne({ email });
//     if (exists)
//       return res.status(400).json({ message: "This Email already Exists" });

//     //hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({
//       email,
//       name,
//       password: hashedPassword,
//       role: role || "user",
//     });
//     res.status(201).json({ message: "Registration completed successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //login user

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password are required" });

//     //check user exist or not
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const pass = await bcrypt.compare(password, user.password);
//     if (!pass)
//       return res.status(400).json({ message: "Invalid email or password" });

//     //token generation
//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     //set token in httponly cookies

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       maxAge: 1*24*60*60*1000
//     });

//     res.set({
//       "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//       Pragma: "no-cache",
//       Expires: "0",
//       "Surrogate-Control": "no-store",
//     });

//     res.json({
//       message: "Login Successful",
//       user: { id: user._id, name: user.name, role: user.role },
//     });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //logout

// export const logoutUser = async (req: Request, res: Response) => {
//     try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       path: "/", // MUST match cookie !!!
//     });

//     return res.status(200).json({ message: "Logout successful" });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };




import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// ============================
//   GET ALL USERS
// ============================

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// ============================
//   REGISTER
// ============================

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "This Email already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Registration completed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
//   LOGIN
// ============================

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         // Required for Vercel + Railway (HTTPS)
      sameSite: "none",     // Required for cross-site cookies
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login Successful",
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
//   LOGOUT
// ============================

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,          // Must match login cookie
      sameSite: "none",
      path: "/",             // Must match login cookie
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
