import bcrypt from "bcryptjs";

import UserModel from "../models/User.model.js";
import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "all required fild must provide",
      });
    }
    // const already = await UserModel.findOne({ email });
    // if (already) {
    //   return res.status(400).json({
    //     error: true,
    //     success: false,
    //     message: "User Already exists with the same email! Please try again",
    //   });
    // }

    let hashedPassword = bcrypt.hashSync(password, 10);
    let avatar = "";
    if (gender === "Men") {
      avatar = "https://avatar.iran.liara.run/public/boy";
    } else {
      avatar = "https://avatar.iran.liara.run/public/girl";
    }
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      avatar: avatar,
    });
    const newUser = await user.save();
    res.status(201).json({
      error: false,
      success: true,
      data: newUser,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    });
  }
};
