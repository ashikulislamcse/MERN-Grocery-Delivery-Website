import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import ConnectDB from "./config/db.js";
ConnectDB();
import userRoute from "./Routes/userRoute.js";
import sellerRouter from "./Routes/sellerRoute.js";
import connectClowdinary from "./Utils/clowdinary.js";
import productRouter from "./Routes/productRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import addressRouter from "./Routes/addressRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import { stripeWebhook } from "./Controllers/orderController.js";

connectClowdinary();

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: ["http://localhost:5173", "https://mern-grocery-delivery-website-backend.vercel.app"],
  credentials: true,
};
app.use(cors(corsOption));

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", userRoute);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, (req, res) => {
  console.log(`Server in Running on Port: ${PORT}`);
});
