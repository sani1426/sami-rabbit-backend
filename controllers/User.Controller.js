
import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";

//  register controller
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
    const payload = { user : {id : newUser._id , name : newUser.name , email : newUser.email , role : newUser.role }}
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          error: false,
          message: "user registered successfully",
          data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
          token: token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    });
  }
};

//  login controller

const loginController = async (req , res) => {
try {
  const {email , password} =req.body;
  if(!email || !password) {
    return res.status(400).json({
      success: false,
      error : true ,
      message : "all required fields must provide"
    })
  }
  let user = await UserModel.findOne({email})
  if(!user) {
    return res.status(400).json({
      success: false,
      error : true ,
      message : "user not found"
    })
  }
  const isMatch = bcrypt.compareSync(password , user.password)
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error : true ,
      message : "password is incorrect"
    })
  }else{
    const payload = {user : {id : user._id , name : user.name , email : user.name , role : user.role}}
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          error: false,
          message: "user successfully logged in",
          token,
        });
      }
    );
  }

} catch (error) {
   res.status(500).json({
     error: true,
     success: false,
     message: `server error ${error}`,
   });
}
}

//  profile controller

const profileController = async (req , res) => {
res.status(200).json({
  success: true,
  error: false,
  message: "user profile fetched successfully",
  data: req.user,
});  
}




  
export { registerController, loginController, profileController };
