import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import userRouter from "./routes/User.routes.js";
import productRouter from "./routes/Product.routes.js";
import cartRouter from "./routes/Cart.routes.js";
import checkoutRouter from "./routes/Checkout.routes.js";
import orderRouter from "./routes/Order.routes.js";
import upladRouter from "./routes/Upload.routes.js";
import subscriberRouter from "./routes/Subscriber.routes.js";
import adminUsersRouter from "./routes/AdminUsers.routes.js";
import AdminProductsRouter from "./routes/AdminProducts.routes.js";
import adminOrdersRouter from "./routes/AdminOrders.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//  middlewares

app.use(
  cors({
    origin: "https://samirabbit.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  routes
app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/checkout", checkoutRouter);

app.use("/api/orders", orderRouter);

app.use("/api/upload" , upladRouter)

app.use("/api/subscribe" , subscriberRouter)

app.use("/api/admin/users", adminUsersRouter);

app.use("/api/admin/products", AdminProductsRouter);

app.use("/api/admin/orders", adminOrdersRouter);


// run server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
