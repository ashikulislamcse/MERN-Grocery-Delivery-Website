import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { addAddress, getAddress } from "../Controllers/addressController.js";

const Router = express.Router();

Router.post("/add", isAuthenticated, addAddress);
Router.get("/get", isAuthenticated, getAddress);

export default Router;
