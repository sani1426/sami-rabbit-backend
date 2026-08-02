import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import connectToDb from "../config/db.js";

//  @desc Register a new user
//  @access Public
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "all required fild must provide",
      });
    }
    const already = await UserModel.findOne({ email });
    if (already) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    }

    let hashedPassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.name,
        role: user.role,
      },
    };
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.cookie("token", token, tokenOption);
    res.status(201).json({
      error: false,
      success: true,
      data: tokenData,
      message: "success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    });
  }
};

// @desc Login a user
// @access Public
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "all required fild must provide",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "User doesnt exists! Please register first",
      });
    }
    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "password is wrong 😡😡",
      });
    } else {
      const tokenData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      res.cookie("token", token, tokenOption);
      return res.json({
        message: "Login successfully",
        error: false,
        success: true,
        data : tokenData ,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    });
  }
  
};

// @desc Get Logged In user profile (Protected Route)
// @access Private
const profileController = async (req, res) => {
  res.status(200).json({
    success: true,
    error: false,
    message: "user profile fetched successfully",
    data: req.user,
  });
};

export { registerController, loginController, profileController };
