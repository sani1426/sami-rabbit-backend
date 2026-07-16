import express from "express";
import { Protect, admin } from "../middlewares/authMiddleware.js";
import {
  createNewProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/Product.Controller.js";

const productRouter = express.Router();

//  @route POST /api/products
//  @desc Create a new product
//  @access Private/Admin
productRouter.post("/", Protect,admin , createNewProductController);

//  @route PUT /api/products/:id
//  @desc Update a product
//  @access Private/Admin
productRouter.put("/:id", Protect , admin , updateProductController);

//  @route DELETE /api/products/:id
//  @desc Delete a product
//  @access Private/Admin
productRouter.delete("/:id", Protect, admin, deleteProductController);


export default productRouter
