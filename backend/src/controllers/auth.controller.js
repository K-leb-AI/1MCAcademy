import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";

export async function signup(req, res) {
    try {
        let { name, email, password } = req.body;
        name = name ? name.trim() : "";
        email = email ? email.trim().toLowerCase() : "";
        password = password ? password.trim() : "";
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
        // Create user (password will be hashed by pre-save hook in model)
        const newUser = new User({
            fullName: name,
            email,
            password
        });

        // Save user to DB
        const savedUser = await newUser.save();

        // token generation & cookie creation (signed with user id)
        const jwtToken = generateToken({ userId: savedUser._id });
        res.cookie("jwt", jwtToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(201).json({ message: "User registered successfully", user: { id: savedUser._id, fullName: savedUser.fullName, email: savedUser.email } });
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

        
        // generate token and set cookie
        const jwtToken = generateToken({ userId: user._id });
        res.cookie("jwt", jwtToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        // remove password before sending
        const userSafe = user.toObject();
        delete userSafe.password;

        res.status(200).json({ success: true, user: userSafe })

    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).json({ message: "Internal Server Error " })
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logout successful" })
}