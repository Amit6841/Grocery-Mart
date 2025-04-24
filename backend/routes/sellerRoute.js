import express from "express";
import { sellerLogin,isSellerAuth,sellerLogout} from "../controllers/sellerController.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const sellerRouter = express.Router()

sellerRouter.post('/login',sellerLogin)
sellerRouter.get('/isauth',sellerAuth,isSellerAuth)
sellerRouter.get('/logout',sellerLogout)

export default sellerRouter;