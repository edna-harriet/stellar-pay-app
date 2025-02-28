"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Test Route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // Import the database connection function
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)(); // Call the function to establish the database connection
// Define Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
