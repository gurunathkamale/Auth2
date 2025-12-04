

import { Request, Response, Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/authControllers";
import { authorizeRoles, protect } from "../middlewares/authMiddleware";
import User from "../models/User";


const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", getAllUsers)





router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});


router.get(
  '/admin/users',
  protect,                            // 1. Verify JWT from cookie (or header)
  authorizeRoles('admin'),            // 2. Check if user.role === 'admin'
  async (req: Request, res: Response) => {
    try {
      // Optional: add pagination later
      const users = await User.find().select('-password').lean();

      return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
);



export default router