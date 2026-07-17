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
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
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
const deleteProductController = async (req, res) => {
  try {
    const goalProduct = await ProductModel.findById(req.params.id);
    if (goalProduct) {
      await goalProduct.deleteOne();
      res.status(200).json({
        success: true,
        error: false,
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

//  @desc Get all products with optional query filteres
//  @access Public
const getAllProductsController = async (req, res) => {
  try {
    let {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      page,
    } = req.query;
    let query = {};
    let limit = 10;
    let pageNumber = Number(page) || 1;
    // filter logic
    if (collection && collection.toLowerCase() !== "all") {
      query.collection = collection;
    }
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sortBy = { price: 1 };
          break;
        case "priceDesc":
          sortBy = { price: -1 };
          break;
        case "popularity":
          sortBy = { rating: -1 };
          break;

        default:
          break;
      }
    }

    //  Fetch Products And Apply Sorting And Limit
    let products = await ProductModel.find(query)
      .sort(sortBy)
      .limit(Number(limit))
      .skip((pageNumber - 1) * Number(limit));
    const totalProducts = await ProductModel.countDocuments(query);
    res.status(200).json({
      success: true,
      error: false,
      message: "Products fetched successfully",
      data: products,
      totalProducts: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error}`,
    });
  }
};

//  @desc Get a single product by ID
//  @access Public
const getProductDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (product) {
      res.status(200).json({
        success: true,
        error: false,
        message: "successfully fetch product details",
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error} `,
    });
  }
};

//  @dsc Retrieve similar products based on the current product ID
//  @access Public
const getSimilarProductsContoller = async (req , res) => {
  try {
    const {id} = req.params;
    const product =  await ProductModel.findById(id)
    if (!product) {
      return res.status(404).json({
        success : false ,
        error : true ,
        message : "product not found" , 
      })
    }
    const similarProducts = await ProductModel.find({
      _id : {$ne : id} ,  //Exclude the current product
    category :  product.category,
    gender : product.gender,
    }).limit(4);
    res.status(200).json({
      success : true ,
      error : false ,
      message : "similar products fetched successfully" , 
      data : similarProducts , 
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error} `,
    });
  }
}

//  @desc Retrieve product with highest rating
//  @access Public
const getBestSellerProductController = async (req , res) => {
  try {
    const bestSellerProduct = await ProductModel.find().sort({rating : -1}).limit(1);
    res.status(200).json({
      success : true ,
      error : false ,
      message : "best seller product fetched successfully" , 
      data : bestSellerProduct , 
    })
    
  } catch (error) {
    res.status(500).json({
      success : false ,
      error : true ,
      message : `Internal Server Error ${error} `, 
    })
  }
}

//  @desc Retrieve latest 8 products - Creation Date
//  @access Public
const getNewArrivalsController = async (req , res) => {
  try {
    const newArrivals = await ProductModel.find().sort({createdAt : -1}).limit(8);
    res.status(200).json({
      success : true ,
      error : false ,
      message: "new arrivals fetched successfully" , 
      data : newArrivals
    })
  } catch (error) {
     res.status(500).json({
       success: false,
       error: true,
       message: `Internal Server Error ${error} `,
     });
  }
}

export {
  createNewProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductDetailsController,
  getSimilarProductsContoller,
  getBestSellerProductController,
  getNewArrivalsController,
};
