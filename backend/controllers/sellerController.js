import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate environment variables
        if (!process.env.SELLER_EMAIL || !process.env.SELLER_PASSWORD || !process.env.SELLER_JWT) {
            throw new Error("Environment variables SELLER_EMAIL, SELLER_PASSWORD, or JWT_SECRET are not defined");
        }

        // Check credentials
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const sellerToken = jwt.sign({ email }, process.env.SELLER_JWT, { expiresIn: '7d' });

            // Set cookie
            res.cookie('sellerToken', sellerToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "Logged in" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const isSellerAuth = async (req, res) => {
    try {
        const { sellerToken } = req.cookies;

        if (!sellerToken) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        try {
            jwt.verify(sellerToken, process.env.SELLER_JWT);
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const sellerLogout = async (req, res) => {
    try {
        if (!req.cookies.sellerToken) {
            return res.status(400).json({ success: false, message: "No token to clear" });
        }

        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({ success: true, message: "Logged out" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
