import express from "express";
import { Protect, admin } from "../middlewares/authMiddleware.js";
import {
  GetAllUsersController,
  createNewUserController,
  updateUserInfoController,
  deleteUserController,
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

//  @route DELETE /api/admin/users/:id
//  @desc Delete a user (Admin only)
//  @access Private/Admin
adminRouter.delete("/users/:id", Protect, admin, deleteUserController);

export default adminRouter;
