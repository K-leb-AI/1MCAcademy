import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashData = async (data, salt = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, salt);
        return hashedData;
    } catch (error) {
        throw error;
    }
};

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
};

export default {
    hashData,
    generateToken,
};