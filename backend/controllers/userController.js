import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name: name,
            email: email,
            password: hashpassword
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ success: true, user: { name: user.name, email: user.email }, message: "You have signed up successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, user: { name: user.name, email: user.email }, message: "You have signed in" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged out" });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
};
