import express from "express";
import { Protect, admin } from "../middlewares/authMiddleware.js";
import {
  GetAllUsersController,
  createNewUserController,
  updateUserInfoController,
} from "../controllers/Admin.Controller.js";

const adminRouter = express.Router();


//  @route GET /api/admin/users
//  @desc Get all users (Admin only)
//  @access Private/Admin
adminRouter.get("/users", Protect, admin, GetAllUsersController);

//  @route POST /api/admin/users
//  @desc Create new user (Admin only)
//  @access Private/Admin
adminRouter.post("/users", Protect , admin , createNewUserController);

//  @route PUT /api/admin/users/:id
//  @desc Update user info (Admin only)
//  @access Private/Admin
adminRouter.put("/users/:id", Protect, admin, updateUserInfoController);

export default adminRouter;
