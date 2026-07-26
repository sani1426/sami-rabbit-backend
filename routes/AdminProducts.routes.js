
import express from "express" ;
import { Protect , admin } from "../middlewares/authMiddleware.js";
import { getAllProducts } from "../controllers/AdminProducts.Controller.js";

const AdminProductsRouter = express.Router();

//  @route GET api/admin/products
//  @desc Get All Products (Admin Only)
//  @access Private/Admin
AdminProductsRouter.get("/", Protect, admin, getAllProducts);



export default AdminProductsRouter