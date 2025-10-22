import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    hashData
} from "../utils/utils.js";

export async function signup(req, res) {
    try {
        let { name,email, password } = req.body;
        name = name.trim();
        email = email.trim().toLowerCase();
        password = password.trim();
        // validate input
        if (!(name && email && password)) {
            throw new Error("All input is required");
        }
        const nameRegex = /^[a-zA-Z ]*$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!nameRegex.test(name)) {
            throw new Error("Invalid name format");
        } else if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        } else if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            throw new Error("User already exists. Please login.");
        }
        // Hash password
        const hashedPassword = await hashData(password);
        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        // Save user to DB
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully" });  
        return savedUser;

    } catch (error) {
        res.status(400).send({ error: error.message });
        throw error;
    }
}


