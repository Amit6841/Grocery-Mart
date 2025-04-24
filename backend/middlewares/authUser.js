import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
        } else {
            return res.json({ success: false, message: 'Not Authorized' })
        }
        next();
    } catch (error) {
        return res.json({ success: false, message:error.message});
    }
}