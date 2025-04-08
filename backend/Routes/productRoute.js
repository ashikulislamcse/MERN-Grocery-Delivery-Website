import express from "express";
import { singleUpload } from "../Utils/multer.js";
import authSeller from "../Middlewares/authSeller.js";
import { addProduct, changeStock, productList } from "../Controllers/productController.js";



const Router = express.Router();

Router.post("/add",singleUpload, authSeller, addProduct );
Router.get("/list", productList );
Router.get("/id", productList );
Router.post("/stock",authSeller, changeStock );

export default Router;
