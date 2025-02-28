import express from "express";
import connectDB from "./db"; // Import the database connection function
import { Request, Response } from "express";


const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the function to establish the database connection

// Define Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

