import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export const generateToken = (payload, expiresIn = "1d") => jwt.sign(payload, JWT_SECRET, { expiresIn });

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return false;
    }
};