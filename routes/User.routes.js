import express from 'express' ;
import {  loginController, profileController,registerController } from '../controllers/User.Controller.js';
import { Protect } from '../middlewares/authMiddleware.js';


const userRouter = express.Router()

//  @route POST /api/users/register
//  @desc Register a new user
//  @access Public

userRouter.post("/register", registerController);

// @route POST /api/users/login
// @desc Login a user
// @access Public

userRouter.post("/login", loginController);

// @route GET /api/users/profile
// @desc Get Logged In user profile (Protected Route)
// @access Private

userRouter.get("/profile",Protect , profileController);



export default userRouter;