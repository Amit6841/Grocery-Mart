import jwt from 'jsonwebtoken'

export const sellerAuth = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.json({ success: false, message: "Not Authorized" })
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.SELLER_JWT)

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next()
        } else {
            return res.json({ success: false, message: "Not Authorized" })
        }
        
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}