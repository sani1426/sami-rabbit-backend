
import SubscriberModel from "../models/Subscriber.model.js";


//  @desc Handle newsLetter subscription
//  @access Public
const addSubscribeController = async (req , res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({
            success : false ,
            error : true ,
            message : "Email is required" , 
        })
    }
    try {
        let subscriber = await SubscriberModel.findOne({email});
        if (subscriber) {
            return res.status(400).json({
                success : false ,
                error : true ,
                message : "Email already exists" , 
            })
        }
        subscriber = new SubscriberModel({email});
        await subscriber.save();
        res.status(200).json({
            success : true ,
            error : false ,
            message : "Email subscribed successfully" , 
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error : true ,
            message : `Internal server error : ${error.message}`
        })
    }
}




export { addSubscribeController };