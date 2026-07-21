
import express from "express";
import {Protect} from "../middlewares/authMiddleware.js" ; 

import {
  createCheckoutController,
  updateCheckoutController,
  finalizeCheckoutController,
} from "../controllers/Checkout.Controller.js"; 



const checkoutRouter = express.Router()


//  @route  POST /api/checkout
//  @desc  Create a new checkout session
//  @access Private
checkoutRouter.post("/", Protect, createCheckoutController);


// @route PUT /api/checkout/:id/pay
//  @desc Update Checkout to mark as paid after successful payment
//  @access Private
checkoutRouter.put("/:id/pay", Protect, updateCheckoutController);


//  @route POST /api/checkout/:id/finalize
//  @desc Finalize checkout and convert to an order after payment confirmation
//  @access Private
checkoutRouter.post("/:id/finalize", Protect, finalizeCheckoutController);


export default checkoutRouter

