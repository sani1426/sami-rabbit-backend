import express from 'express' ;
import { registerUser } from '../controllers/User.Controller.js';


const userRouter = express.Router()

//  @route POST /api/users/register
//  @desc Register a new user
//  @access Public

userRouter.post("/register", registerUser);


export default userRouter;