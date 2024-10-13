import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from "../models/userModel.js";

// Utility function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Set expiration for better security
};

// Login user controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Doesn't Exist" });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        // Generate token and respond with success
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Register user controller
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User Already Exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enter A Valid Email" });
        }

        // Check password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter A Strong Password" });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save user to the database
        const user = await newUser.save();

        // Generate token and respond with success
        const token = createToken(user._id);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { loginUser, registerUser };
