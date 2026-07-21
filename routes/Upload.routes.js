
import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"
import dotenv from "dotenv"
dotenv.config()

const upladRouter = express.Router()

// cloadinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// multer setup using memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage})

upladRouter.post("/" , upload.single("image") , async (req , res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "No image uploaded",
            })
        }

        //  Function to handle the stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error , result) => {
                    if (result) {
                        resolve(result)
                    }else {
                        reject(error)
                    }
                });
                //  Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        }
        //  Call the streamUpload function
        const result = await streamUpload(req.file.buffer)

        //  Respond with the uploaded image details
        res.json({imageUrl : result.secure_url})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: `Internal server error : ${error.message}`
        })
    }
})


export default upladRouter;