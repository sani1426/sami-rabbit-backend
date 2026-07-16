
import jwt from 'jsonwebtoken' ;
import UserModel from "../models/User.model.js"; 

const Protect = async (req , res , next) => {
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await UserModel.findById(decode.user.id).select("-password");
        next()
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            error: true,
            message: "token verification failed"
        })  
    }
}else{
    res.status(401).json({
        success: false,
        error: true,
        message: "no token provided"
    })  
}
}

//  middleware to check if user is admin
const admin = async (req,res,next) => {
    if(req.user && req.user.role === "Admin") {
        next()
    }else{
        return res.status(403).json({
            success: false,
            error: true,
            message: "Not Authorization as admin "
        })  
    }
}

export { Protect, admin };