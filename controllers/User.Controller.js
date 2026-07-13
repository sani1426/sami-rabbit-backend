import userModel from "../models/User.model.js";
import Jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user =await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user Already exist" });
    }
    user = new userModel({ name, email, password });
    await user.save();
    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(`Register User Faild :  ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
