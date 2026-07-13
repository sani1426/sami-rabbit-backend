import userModel from "../models/User.model.js";
import Jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

  try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "all required fild must provide",
        });
      }
    let user = await  userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false,
        error: true,
        message: "User Already Exist",
       });
    }
    user = new userModel({ name, email, password });
    await user.save();
    return res.status(201).json({
      error: false,
      success: true,
      data: {
        _id : user._id,
        name : user.name,
        email: user.email,
        role: user.role,
      },
      message: "success",
    });
  } catch (error) {
    console.log(`Register User Faild :  ${error.message}`);
    res.status(500).json({
      success: false,
      error: true,
      message: "Register User Faild",
    });
  }
};
