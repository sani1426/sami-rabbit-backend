import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name : {
        type: String ,
        required: true ,
        trim : true
    },
    email: {
        type: String ,
        required: true ,
        unique: true ,
        trim : true ,
        match : [/.+\@.+\..+/, "لطفا ایمیل را صحیح وارد کنید"]
    },
    password: {
        type: String ,
        required: true ,
        trim : true ,
        minlength: 6 ,
    },
    role : {
        type: String ,
        enum: ["customer" , "admin"] ,
        default: "customer" ,
    }

}, {
    timestamps: true
})


const userModel = mongoose.model("User" , userSchema)

export default userModel