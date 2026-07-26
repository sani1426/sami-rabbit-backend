
import ProductModel from "../models/Product.model.js";


//  @desc Get All Products (Admin Only)
//  @access Private/Admin
const getAllProducts = async (req , res) => {
    const {page , limit} = req.query
    let pageNumber = Number(page) || 1;
    let limitNumber = Number(limit) || 10;
    try {
        const products = await ProductModel.find({}).sort({createdAt : -1}).skip((pageNumber - 1) * limitNumber).limit(limitNumber)
        const totalProducts = await ProductModel.countDocuments();
        res.status(200).json({
            success : true ,
            error : false ,
            message : "All Products fetched successfully",
            total : totalProducts ,
            data : products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true ,
            message : `Internal Server Error : ${error.message}`
        })
    }
}





export { getAllProducts };