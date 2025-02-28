// const { Router } = require('express');

// const authController = require('../controllers/authController'); //import

// const router = Router();
// router.get('/Signup Now',authController.signup_get); //uses get request handler that sends back sign up view.
// router.post('/Signup Now',authController.signup_post); //communicate with db and add a new user
// router.get('/Login',authController.login_get);
// router.post('/Login',authController.login_post);

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        console.log("Received signup request:", req.body);
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", userId: newUser._id });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
