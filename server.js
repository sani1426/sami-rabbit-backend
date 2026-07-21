import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import userRouter from "./routes/User.routes.js";
import productRouter from "./routes/Product.routes.js";
import cartRouter from "./routes/Cart.routes.js";
import checkoutRouter from "./routes/Checkout.routes.js";
dotenv.config();

const app = express();


//  middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//  routes
app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/cart" , cartRouter)

app.use("/api/checkout" , checkoutRouter)



// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${PORT}`);
});
