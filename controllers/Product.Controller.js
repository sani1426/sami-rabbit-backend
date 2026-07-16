import ProductModel from "../models/Product.model.js";

//  @desc Create a new product
//  @access Private/Admin
const createNewProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new ProductModel({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      error: false,
      message: "new Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

//  @desc Update a product
//  @access Private/Admin
const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const goalProduct = await ProductModel.findById(req.params.id);
    if (goalProduct) {
      goalProduct.name = name || goalProduct.name;
      goalProduct.description = description || goalProduct.description;
      goalProduct.price = price || goalProduct.price;
      goalProduct.discountPrice = discountPrice || goalProduct.discountPrice;
      goalProduct.countInStock = countInStock || goalProduct.countInStock;
      goalProduct.category = category || goalProduct.category;
      goalProduct.brand = brand || goalProduct.brand;
      goalProduct.sizes = sizes || goalProduct.sizes;
      goalProduct.colors = colors || goalProduct.colors;
      goalProduct.collections = collections || goalProduct.collections;
      goalProduct.material = material || goalProduct.material;
      goalProduct.gender = gender || goalProduct.gender;
      goalProduct.images = images || goalProduct.images;
      goalProduct.isFeatured =
        isFeatured !== undefined ? isFeatured : goalProduct.isFeatured;
      goalProduct.isPublished =
        isPublished !== undefined ? isPublished : goalProduct.isPublished;
      goalProduct.tags = tags || goalProduct.tags;
      goalProduct.dimensions = dimensions || goalProduct.dimensions;
      goalProduct.weight = weight || goalProduct.weight;
      goalProduct.sku = sku || goalProduct.sku;

       const updatedProduct = await goalProduct.save();
       res.status(200).json({
         success: true,
         error: false,
         message: "Product updated successfully",
         data: updatedProduct,
       });
    }else{
      res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      })
    }

   
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};


//  @desc Delete a product
//  @access Private/Admin
const deleteProductController = async (req , res) => {
try {
  const goalProduct = await ProductModel.findById(req.params.id);
  if(goalProduct){
    await goalProduct.deleteOne();
    res.status(200).json({
      success: true,
      error: false,
      message: "Product deleted successfully",
    })
  }else{
    res.status(404).json({
      success: false,
      error: true,
      message: "Product not found",
    })
  }
} catch (error) {
  res.status(500).json({
    error: true,
    success: false,
    message: `Internal Server Error ${error}`,
  }) 
}
}

export {
  createNewProductController,
  updateProductController,
  deleteProductController,
};
