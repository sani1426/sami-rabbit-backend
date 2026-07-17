
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ProductModel from "./models/Product.model.js";
import UserModel from "./models/User.model.js";
import  products from "./data/product.js";


mongoose.connect(process.env.MONGO_URI )

const seedData = async () => {
    try {
        await ProductModel.deleteMany();
        await UserModel.deleteMany();

        // create default admin user
        // const createdUser = new UserModel({
        //     name : "Admin" ,
        //     email : "admin@example.com" ,
        //     password : "admin123" ,
        //     role : "Admin" ,
        // });
        //  assign the default user Id to each Product
        // const userId = createdUser._id;

        // const  sampleProducts = products.map((product) => {
        //     return {... product , user : userId}
        // })

        // insert the products into the database
        // await ProductModel.insertMany(sampleProducts)
        // console.log("Data seeded successfully");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedData();