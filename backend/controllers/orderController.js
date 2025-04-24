import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import Stripe from "stripe";


export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId; // Use userId from middleware or request body
        const { items, address } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Validate items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Items are required and must be an array" });
        }

        let amount = 0;
        for (const item of items) {
            const product = await productModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found` });
            }
            amount += product.offerPrice * item.quantity;
        }
        amount += Math.floor(amount * 0.02); // Add 2% tax

        // Create order
        await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        res.json({ success: true, message: "order placed successfully" });
    } catch (error) {
        console.error("Error in placeOrderCOD:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        const { items, address } = req.body;
        const { origin } = req.headers;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Items are required and must be an array" });
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const product = await productModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found` });
            }
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            amount += product.offerPrice * item.quantity;
        }
        amount += Math.floor(amount * 0.02); // Add 2% tax

        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType: "online",
        });

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.floor(item.price * 100 + item.price * 0.02 * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        console.log("Stripe Session URL:", session.url); // Debug log
        res.json({ success: true, url: session.url });
    } catch (error) {
        console.error("Error in placeOrderStripe:", error.message);
        return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

export const getUserOrder = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId; // Use userId from middleware or request body

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await orderModel
            .find({
                userId,
                $or: [{ paymentType: "COD" }, { isPaid: true }],
            })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error in getUserOrder:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({
                $or: [{ paymentType: "COD" }, { isPaid: true }],
            })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error in getAllOrders:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};