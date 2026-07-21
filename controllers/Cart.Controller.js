import CartModel from "../models/Cart.model.js";
import ProductModel from "../models/Product.model.js";
import { getCart } from "../utils/Cart.helper.js";

//  @desc Add a product to the Cart  for a guest Or logged in user
//  @access Public
const addProductToCartController = async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "product not found",
      });
    }

    //  Deterimne if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId.toString() &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return res.status(200).json({
          success: true,
          error: false,
          message: "product quantity updated successfully",
          data: cart,
        });
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return res.status(200).json({
          success: true,
          error: false,
          message: "product added to cart successfully",
          data: cart,
        });
      }
    } else {
      const newCart = new CartModel({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      await newCart.save();
      return res.status(201).json({
        success: true,
        error: false,
        message: "new cart created successfully",
        data: newCart,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internall server error : ${error.message} `,
    });
  }
};

//  @desc Update Product quantity in the cart for a guest Or logged in user
//  @access Public
const updateProductQuantityController = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "cart not found",
      });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json({
        success: true,
        error: false,
        message: "product quantity updated successfully",
        data: cart,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: "product not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internall server error : ${error.message} `,
    });
  }
};

//  @desc Remove a Product From the Cart
//  @access Public
const deleteProductFromCartController = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "cart not found",
      });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json({
        success: true,
        error: false,
        message: "product removed from cart successfully",
        data: cart,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: "product not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internall server error : ${error.message} `,
    });
  }
};


//  @desc Get logged-in user's  Or guest user's cart
//  @access Public
const getCartController = async (req , res) => {
const { userId , guestId } = req.body;
try {
  const cart = await getCart(userId , guestId)
  if (cart) {
    return res.status(200).json({
      success: true,
      error: false,
      message: "cart retrieved successfully",
      data: cart,
    });
  }else {
    return res.status(404).json({
      success: false,
      error: true,
      message: "cart not found",
    });
  }
} catch (error) {
  res.status(500).json({
    success: false,
    error: true,
    message: `internall server error : ${error.message} `,
  });
}
}


//  desc Merge guest  cart into user cart on login
//  @access Private
const mergeCartController = async (req , res) => {
  const {guestId} = req.body
  try {
    const guestCart = await CartModel.findOne({guestId});
    const userCart = await CartModel.findOne({user : req.user._id});
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "guest cart is empty",
        });
      } 
      if (userCart) {
        guestCart.products.forEach(guestItem => {
          const productIndex = userCart.products.findIndex(
            (item) =>item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color
          )

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          }else {
            userCart.products.push(guestItem);
          }
        })
        userCart.totalPrice = userCart.products.reduce(
          (acc , item) => acc + item.price * item.quantity,
          0
        )
        await userCart.save() ;

        try {
          await CartModel.findOneAndDelete({guestId})
        } catch (error) {
          console.error(error)
        }
        res.status(200).json({
          success: true,
          error: false,
          message: "guest cart merged into user cart successfully",
          data: userCart,
        });
      
      }else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json({
          success: true,
          error: false,
          message: "guest cart merged into user cart successfully",
          data: guestCart,
        });
      }
    }else {
      if (userCart) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "user cart already exists",
          data: userCart,
        });
        res.status(404).json({
          success: false,
          error: true,
          message: "guest cart not found",
        });
      }
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `internall server error : ${error.message} `,
    });
  }
}


export {
  addProductToCartController,
  deleteProductFromCartController,
  getCartController,
  mergeCartController,
  updateProductQuantityController,
};
