
import express from "express";
import {Protect} from "../middlewares/authMiddleware.js" ; 
import {
  getUsersOrdersController,
  getOrderDetailsController,
} from "../controllers/Order.Controller.js";

const orderRouter = express.Router()

//  @route GET /api/orders/my-orders
//  @desc Get Logged-in user's orders
//  @access Private
orderRouter.get("/my-orders", Protect, getUsersOrdersController);


//  @route GET /api/orders/:id
//  @desc get Order Details by id
//  @access Private
orderRouter.get("/:id", Protect, getOrderDetailsController);



export default orderRouter