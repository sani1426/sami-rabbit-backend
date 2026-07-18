
import CartModel from "../models/Cart.model.js";

const getCart = async (userId , guestId) => {
    if (userId) {
        return await CartModel.findOne({ user: userId })
    }else if (guestId) {
        return await CartModel.findOne({ guestId })
    }else {
        return null; // or throw an error if no user or guestId is provided
    }
}



export { getCart };