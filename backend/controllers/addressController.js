import addressModel from "../models/address.js";

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId; 
        const { address } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (!address || !address.street || !address.city || !address.state || !address.country || !address.zipcode || !address.phone) {
            return res.status(400).json({ success: false, message: "All address fields are required" });
        }

        await addressModel.create({
            ...address,
            userId,
        });

        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.error("Error in addAddress:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId; // Retrieve userId from auth middleware

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const address = await addressModel.find({ userId }); // Retrieve all addresses for the user

        if (!address || address.length === 0) {
            return res.status(404).json({ success: false, message: "No addresses found for this user" });
        }

        res.json({ success: true, address });
    } catch (error) {
        console.error("Error in getAddress:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};