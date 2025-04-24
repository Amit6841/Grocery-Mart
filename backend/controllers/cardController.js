import userModel from "../models/user.js";

export const updateCart = async (req, res) => {
    try {
        const {userId,cartItems} = req.body;
        await userModel.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true,message:"cart updated"})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}