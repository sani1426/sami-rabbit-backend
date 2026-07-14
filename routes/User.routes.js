import express from 'express' ;
import {  loginController, registerController } from '../controllers/User.Controller.js';


const userRouter = express.Router()

//  @route POST /api/users/register
//  @desc Register a new user
//  @access Public

userRouter.post("/register", registerController);

// @route POST /api/users/login
// @desc Login a user
// @access Public

userRouter.post("/login", loginController);



export default userRouter;