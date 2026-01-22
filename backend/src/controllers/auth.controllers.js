import User from "../models/User";
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

        const user = User.findOne({email: email})
        if (user) {
            return res.status(400).json({ message : "User already exists"});
        }



    } catch (error) {

    }

}

export const login = (req, res) => {
    res.send("signup endpoint");
}

export const logout = (req, res) => {
    res.send("logout endpoint");
}