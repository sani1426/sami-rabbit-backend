import userModel from "../models/User.model.js";
import  Jwt  from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log(name, email, password, role);
    res.status(400).json({name, email, password,role})
  } catch (error) {
    console.log(`Register User Faild :  ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
