import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getAllOrders, getUserOrder, placeOrderCOD, placeOrderStripe } from "../controllers/orderController.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const orderRoute = express.Router()

orderRoute.post('/cod',authUser,placeOrderCOD)
orderRoute.get('/user',authUser,getUserOrder)
orderRoute.get('/seller',sellerAuth,getAllOrders)
orderRoute.post('/stripe',authUser,placeOrderStripe)


export default orderRoute