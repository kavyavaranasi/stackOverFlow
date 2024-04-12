import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/auth.js'; 

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(password, 14); 
        const newUser = await User.create({ name, email, password: hashedPass }); 
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.status(200).json({ user: newUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email }); 
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPassCrt = await bcrypt.compare(password, existingUser.password); 
        if (!isPassCrt) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.status(200).json({ user: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
