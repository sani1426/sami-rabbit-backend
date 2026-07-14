import express from 'express' ;
import { getAllUsers, registerController } from '../controllers/User.Controller.js';


const userRouter = express.Router()

//  @route POST /api/users/register
//  @desc Register a new user
//  @access Public

userRouter.post("/register", registerController);
userRouter.get("/all", getAllUsers);


export default userRouter;