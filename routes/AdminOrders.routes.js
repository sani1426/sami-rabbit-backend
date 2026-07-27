
import express from "express"
import {Protect , admin} from "../middlewares/authMiddleware.js";
import {
    deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/AdminOrders.Controller.js";

const adminOrdersRouter = express.Router();

//  @route GET api/admin/orders
// ? @desc Get All Orders (Admin Only)
// ! @access Private/Admin
adminOrdersRouter.get("/", Protect, admin, getAllOrders);

//  @route PUT api/admin/orders/:id
// ? @desc Update Orders Status (Admin Only)
// ! @access Private/Admin
adminOrdersRouter.put("/:id" , Protect , admin , updateOrderStatus)

//  @route DELETE api/admin/orders/:id
// ? @desc Delete an Order (Admin Only)
// ! @access Private/Admin
adminOrdersRouter.delete("/:id" , Protect , admin , deleteOrder)



export default adminOrdersRouter;