import express from "express";
import authSeller from "../Middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productList,
} from "../Controllers/productController.js";
import { Upload } from "../Utils/multer.js";

const Router = express.Router();

Router.post("/add", Upload.array('images'), authSeller, addProduct);
Router.get("/list", productList);
Router.get("/id", productList);
Router.post("/stock", authSeller, changeStock);

export default Router;
