import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    hashData,token
} from "../utils/utils.js";

export async function signup(req, res) {
    try {
        let { name,email, password } = req.body;
        name = name.trim();
        email = email.trim().toLowerCase();
        password = password.trim();
        // validate input
        if (!(name && email && password)) {
            return res.status(400).json(({ message: "All fields are required" }))
        }
        // Verify password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        const nameRegex = /^[a-zA-Z ]*$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Invalid Name format" });
        } else if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        } 
        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, kindly use another" })
        }
        // Hash password
        const hashedPassword = await hashData(password);

        // token generation & cookie creation
        res.cookie("jwt", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true, // prevent xss attacks
            sameSite: "strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })
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
         console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal Server Error " })
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: "Invalid email or password " })

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" })

        
        res.cookie("jwt", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true, // prevent xss attacks
            sameSite: "strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).json({ message: "Internal Server Error " })
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logout successful" })
}