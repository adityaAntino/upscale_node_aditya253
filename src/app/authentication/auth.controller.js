const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./auth.schema')

///REGISTER THROUGH EMAIL ROUTER
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hashedPassword });
        res.status(200).json({ message: "User Registered Successfully" });
    }
    catch (error) {
        console.log(`/register error ${error}`);
        console.log(error)
        res.status(500).json({ message: "Failed to register user" });
    }
};

///LOGIN THROUGH EMAIL ROUTER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log()
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: "1d" });
        res.json({ token });
    }
    catch (error) {
        console.log(`/login error ${error}`);
        console.log(error)
        res.status(500).json({ message: "Failed to login" });
    }
};

