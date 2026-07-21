


//  @desc  Create a new checkout session

import CartModel from "../models/Cart.model.js";
import CheckoutModel from "../models/Checkout.model.js";
import OrderModel from "../models/Order.model.js";
import ProductModel from "../models/Product.model.js";

//  @access Private
const createCheckoutController = async (req , res) => {
const {checkoutItems , shippingAddress , paymentMethod , totalPrice } =req.body;
if (!checkoutItems ||  checkoutItems.length === 0) {
    return res.status(400).json({ 
        success : false , 
        error : true ,
        message : "No checkout items provided"
    })
}
try {
    const newCheckout = await CheckoutModel.create({
        user : req.user._id ,
        checkoutItems : checkoutItems ,
        shippingAddress ,
        paymentMethod ,
        totalPrice ,
        paymentStatus : "pending" ,
        isPaid : false ,
    })
    console.log(req.user._id);
    res.status(201).json({ 
        success : true , 
        error : false ,
        message : "Checkout session created successfully",
        checkout : newCheckout
    }) 
    
} catch (error) {
    res.status(500).json({ 
        success : false , 
        error : true ,
        message :`internal server error : ${error.message} `
    }) 
}
}


//  @desc Update Checkout to mark as paid after successful payment
//  @access Private
const updateCheckoutController = async (req , res) => {
    const {paymentStatus , paymentDetails} = req.body
    
    try {
        const checkout = await CheckoutModel.findById(req.params.id)
        if (!checkout) {
            return res.status(404).json({
                success : false , 
                error : true ,
                message : "Checkout not found"
            })
        }
        if (paymentStatus !== "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json({
                success : true ,
                error :false ,
                message : "Checkout marked as paid successfully",
                checkout : checkout
            })
        }else {
            res.status(400).json({
                success : false , 
                error : true ,
                message : "Invalid payment status provided" , 
            })
        }
    } catch (error) {
        res.status(500).json({ 
            success : false , 
            error : true ,
            message :`internal server error : ${error.message} `
        }) 
    }
}


//  @desc Finalize checkout and convert to an order after payment confirmation
//  @access Private
const finalizeCheckoutController = async (req , res) => {
    try{
        const checkout = await CheckoutModel.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                success : false , 
                error : true ,
                message : "Checkout not found"
            })
        }
        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await OrderModel.create({
                user : checkout.user ,
                orderItems : checkout.orderItems ,
                shippingAddress : checkout.shippingAddress ,
                paymentMethod : checkout.paymentMethode ,
                totalPrice : checkout.totalPrice ,
                isPaid : true ,
                paidAt : checkout.paidAt ,
                isDelivered : false ,
                paymentStatus : "paid" ,
                paymentDetails : checkout.paymentDetails
            })

            //  Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.fainalizedAt = Date.now();
            await checkout.save();

            // Delete the Cart associated with the user
            await CartModel.findOneAndDelete({user : checkout.user})
            res.status(200).json({
                success : true ,
                error : false ,
                message : "Checkout finalized and order created successfully",
                data : finalOrder
            })
        } else if (checkout.isFinalized) {
            res.status(400).json({
                success : false , 
                error : true ,
                message : "Checkout already finalized"
            })
        } else {
            res.status(400).json({
                success : false , 
                error : true ,
                message : "Checkout is not paid"
            })
        }
    
    } catch (error) {
        res.status(500).json({ 
            success : false , 
            error : true ,
            message :`internal server error : ${error.message} `
        }) 
    }
}


export {
  createCheckoutController,
  updateCheckoutController,
  finalizeCheckoutController,
};