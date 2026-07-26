import OrderModel from "../models/Order.model.js";

//  @desc Get All Orders (Admin Only)
//  @access Private/Admin
const getAllOrders = async (req, res) => {
  let { page, limit } = req.query;
  let pageNumber = Number(page) || 1;
  let limitNumber = Number(limit) || 10;
  try {
    const orders = await OrderModel.find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    const totalOrders = await OrderModel.countDocuments();
    res.status(200).json({
      success: true,
      error: false,
      message: "All Orders fetched successfully",
      total: totalOrders,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

//  @desc Update Orders Status (Admin Only)
//  @access Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered = req.body.status === "Delivered" ? true : false;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
      const updatedOrder = await order.save();
      res.status(201).json({
        success: true,
        error: false,
        message: "Order status updated successfully",
        data: updatedOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

//  @desc Delete an Order (Admin Only)
//  @access Private/Admin
const deleteOrder = async (req, res) => {
  try {
    let order = await OrderModel.findByIdAndDelete(req.params.id);
    if (order) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Order Deleted Successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export { getAllOrders, updateOrderStatus, deleteOrder };
