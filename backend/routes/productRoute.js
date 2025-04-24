import express from "express";
import { upload } from "../configs/multer.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";


const productRoute = express.Router();


productRoute.post('/add',upload.array(["images"]),sellerAuth,addProduct)
productRoute.get('/list',productList)
productRoute.get('/id',productById)
productRoute.post('/stock',sellerAuth,changeStock)

export default productRoute