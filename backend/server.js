const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); // Import Helmet
const courseRoutes = require("./routes/courseRoutes");
const noteRoutes = require("./routes/noteRoutes");
const mainCategoryRoutes = require("./routes/mainCategoryRoutes");
require("dotenv").config();

const app = express();

// Configure Helmet to allow Vercel live script
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "https://vercel.live"],
        "connect-src": ["'self'", "https://vercel.live"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/udemyCourses")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection failed", err));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!"); // Basic response for root path
});

// API Routes
app.use("/courses", courseRoutes);
app.use("/courses/:courseId/notes", noteRoutes);
app.use("/notes", noteRoutes);
app.use("/main-category", mainCategoryRoutes);

// Start the server
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
