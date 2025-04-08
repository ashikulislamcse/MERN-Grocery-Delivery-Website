import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../Controllers/orderController.js";
import authSeller from "../Middlewares/authSeller.js";

const Router = express.Router();

Router.post("/cod", isAuthenticated, placeOrderCOD);
Router.get("/user", isAuthenticated, getUserOrders);
Router.get("/seller", authSeller, getAllOrders);

export default Router;
