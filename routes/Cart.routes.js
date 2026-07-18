
import express from "express";
import {Protect} from "../middlewares/authMiddleware.js" ;
import {
  addProductToCartController,
  updateProductQuantityController,
  deleteProductFromCartController,
  getCartController,
  mergeCartController,
} from "../controllers/Cart.Controller.js";

const cartRouter = express.Router() ;

//  @route POST /api/cart
//  @desc Add a product to the Cart  for a guest Or logged in user
//  @access Public
cartRouter.post("/", addProductToCartController);

//  @route PUT /api/cart
//  @desc Update Product quantity in the cart for a guest Or logged in user
//  @access Public
cartRouter.put("/", updateProductQuantityController);

// @route DELETE /api/cart
//  @desc Remove a Product From the Cart
//  @access Public
cartRouter.delete("/", deleteProductFromCartController);

//  @route GET /api/cart
//  @desc Get logged-in user's  Or guest user's cart
//  @access Public
cartRouter.get("/", getCartController);

//  @route POST /api/cart/merge 
//  desc Merge guest  cart into user cart on login
//  @access Private
cartRouter.post("/merge" , Protect , mergeCartController)



export default cartRouter ;