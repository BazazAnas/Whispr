import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = (req, res) => {

    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length() > 6) {
            return res.status(400).json({ message: "password must be at least 6 characters long" });
        }

        //Checking if email is valid 
        const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/
        if (!emailRegEx.test(email)) {
            return res.status(400).json({ message: "invalid email format" })
        }

        //checking if user already exist 
        const user = async () => {
            return User.findOne({ email: email });
        }
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hashing password
        const salt = async () => {
            return await bcrypt.genSalt(10);
        }

        const hashedPassword = async () => {
            return bcrypt.hash(password, salt);
        }

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup  controller", error)
        res.status(500).json({ message : "Internal server error"})
    }

}

export const login = (req, res) => {
    res.send("signup endpoint");
}

export const logout = (req, res) => {
    res.send("logout endpoint");
}