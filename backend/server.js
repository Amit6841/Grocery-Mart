import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors';
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cardRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import connectDB from "./configs/db.js";
import 'dotenv/config'

const app = express();
const Port = process.env.PORT || 4000;

connectDB()
connectCloudinary()

const allowedOrigin = ["https://grocery-mart-npj4.vercel.app"]
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigin ,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send("server hello")
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRoute)
app.use('/api/order', orderRouter)

app.listen(Port, () => {
    console.log("server listening at port 4000")
})
