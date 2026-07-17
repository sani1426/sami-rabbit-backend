import express from "express";
import { Protect, admin } from "../middlewares/authMiddleware.js";
import {
  createNewProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductDetailsController,
  getSimilarProductsContoller,
  getBestSellerProductController,
  getNewArrivalsController,
} from "../controllers/Product.Controller.js";

const productRouter = express.Router();

//  @route POST /api/products
//  @desc Create a new product
//  @access Private/Admin
productRouter.post("/", Protect, admin, createNewProductController);

//  @route PUT /api/products/:id
//  @desc Update a product
//  @access Private/Admin
productRouter.put("/:id", Protect, admin, updateProductController);

//  @route DELETE /api/products/:id
//  @desc Delete a product
//  @access Private/Admin
productRouter.delete("/:id", Protect, admin, deleteProductController);

//  @route GET /api/products
//  @desc Get all products with optional query filteres
//  @access Public

productRouter.get("/", getAllProductsController);

//  @route GET /api/products/best-seller
//  @desc Retrieve product with highest rating
//  @access Public

productRouter.get("/best-seller", getBestSellerProductController);

//  @route GET /api/products/new=arrivals
//  @desc Retrieve latest 8 products - Creation Date
//  @access Public
productRouter.get("/new-arrivals", getNewArrivalsController);

//  @route GET /api/products/:id
//  @desc Get a single product by ID
//  @access Public

productRouter.get("/:id", getProductDetailsController);

//  @route GET /api/products/similar/:id
//  @dsc Retrieve similar products based on the current product ID
//  @access Public

productRouter.get("/similar/:id", getSimilarProductsContoller);



export default productRouter;
