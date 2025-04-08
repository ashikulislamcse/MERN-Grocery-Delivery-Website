import { v2 as cloudinary } from "cloudinary";
import Product from "../Models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
  }
};

export const productList = async (req, res) => {};

export const productById = async (req, res) => {};

export const changeStock = async (req, res) => {};
