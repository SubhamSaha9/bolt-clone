const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies?.token || req.body?.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }
        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invali",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while valedating the token.",
        });
    }
}