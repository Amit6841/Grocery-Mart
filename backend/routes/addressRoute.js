import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import { authUser } from "../middlewares/authUser.js";


const addressRoute = express.Router();

addressRoute.post('/add',authUser,addAddress)
addressRoute.get('/get',authUser,getAddress)

export default addressRoute