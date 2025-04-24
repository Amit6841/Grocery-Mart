import productModel from "../models/product.js";
import {v2 as cloudinary} from "cloudinary"


export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files;

        let imageUrl = await Promise.all(
            images.map(async (item) => {

                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        await productModel.create({ ...productData, image: imageUrl });

        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const productList = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const productById = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        if (!id || inStock === undefined) {
            return res.status(400).json({ success: false, message: "Product ID and stock status are required" });
        }

        const product = await productModel.findByIdAndUpdate(id, { inStock }, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Stock updated successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};