import bcrypt from "bcryptjs";

export const hashData = async (data, salt = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, salt);
        return hashedData;
    } catch (error) {
        throw error;
    }
}