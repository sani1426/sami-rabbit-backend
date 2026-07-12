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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
})


// match user entered password to hashed password//
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("User" , userSchema)

export default userModel