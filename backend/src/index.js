"use strict";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const db_1 = require("../db"); // Import the database connection function
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)(); // Call the function to establish the database connection
// Define Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post('/api/signup', async (req, res) => {
    try {
        console.log('Received signup request:', req.body); // ✅ Debugging line

        const { firstName, lastName, email, password } = req.body;

        // Ensure all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (Assuming you're using Mongoose & MongoDB)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log('User successfully registered:', newUser);

        return res.status(201).json({ message: 'User registered successfully', userId: newUser._id });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
