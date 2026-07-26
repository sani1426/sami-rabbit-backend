import express from "express";
import { Protect, admin } from "../middlewares/authMiddleware.js";
import {
  GetAllUsersController,
  createNewUserController,
  updateUserInfoController,
  deleteUserController,
} from "../controllers/AdminUsers.Controller.js";

const adminUsersRouter = express.Router();


//  @route GET /api/admin/users
//  @desc Get all users (Admin only)
//  @access Private/Admin
adminUsersRouter.get("/", Protect, admin, GetAllUsersController);

//  @route POST /api/admin/users
//  @desc Create new user (Admin only)
//  @access Private/Admin
adminUsersRouter.post("/", Protect, admin, createNewUserController);

//  @route PUT /api/admin/users/:id
//  @desc Update user info (Admin only)
//  @access Private/Admin
adminUsersRouter.put("/:id", Protect, admin, updateUserInfoController);

//  @route DELETE /api/admin/users/:id
//  @desc Delete a user (Admin only)
//  @access Private/Admin
adminUsersRouter.delete("/:id", Protect, admin, deleteUserController);

export default adminUsersRouter;
