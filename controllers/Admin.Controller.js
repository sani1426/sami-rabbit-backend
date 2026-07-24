
import UserModel from "../models/User.model.js";
import bycrypt from "bcryptjs"; 


//  @desc Get all users (Admin only)
//  @access Private/Admin
const GetAllUsersController = async (req , res) => {
    let {page , limit} = req.query
    let pageNumber = Number(page) || 1;
    let limitNumber = Number(limit) || 10;
try {
    const users = await UserModel.find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
      const totalUsers = await UserModel.countDocuments(); 
    res.status(200).json({
        success: true,
        error: false,
        message: "Users fetched successfully" , 
        data : users ,
        total : totalUsers
    })
    
} catch (error) {
    res.status(500).json({
        success: false,
        error: true,
        message: `Internal server error : ${error.message}`
    })  
}
}


//  @desc Create new user (Admin only)
//  @access Private/Admin
const createNewUserController = async (req , res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }

    try {
            let user = await UserModel.findOne({email});
            if (user) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Email already exists" , 
                })
            }
            let salt = await bycrypt.genSalt(10);
            let hashedPassword = await bycrypt.hash(password , salt)
            user = new UserModel({
              name,
              email,
             password : hashedPassword,
              role: role || "User",
            });
            await user.save();
            res.status(201).json({
                success: true,
                error: false,
                message: "User created successfully" , 
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: `Internal server error : ${error.message}`
        })  
    }
}


//  @desc Update user info (Admin only)
//  @access Private/Admin
const updateUserInfoController = async (req , res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role
        }
        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            error: false,
            message: "User updated successfully" , 
            data : updatedUser
        }) 

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: `Internal server error : ${error.message}` , 
        })
    }
}


//  @desc Delete a user (Admin only)
//  @access Private/Admin
const deleteUserController = async (req , res) => {
try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (user) {
        res.status(200).json({
            success: true,
            error: false,
            message: "User deleted successfully" , 
        }) 
    } else {
        res.status(404).json({
            success: false,
            error: true,
            message: "User not found" , 
        }) 
    } 
    
} catch (error) {
    res.status(500).json({
        success: false,
        error: true,
        message: `Internal server error : ${error.message}` , 
    })
}
}

export {
  GetAllUsersController,
  createNewUserController,
  updateUserInfoController,
  deleteUserController,
};