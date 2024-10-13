import jwt from 'jsonwebtoken';

// Middleware to authenticate user based on JWT token
const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Token is invalid or has expired, please log in again' });
    }
}

export default authMiddleWare;
