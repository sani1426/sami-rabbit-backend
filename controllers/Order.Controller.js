import OrderModel from "../models/Order.model.js";

//  @desc Get Logged-in user's orders
//  @access Private
const getUsersOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      error: false,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internal server error : ${error.message} `,
    });
  }
};

//  @desc get Order Details by id
//  @access Private
const getOrderDetailsController = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.prarams.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internal server error : ${error.message} `,
    });
  }
};

export { getUsersOrdersController, getOrderDetailsController };
