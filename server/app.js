const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Campus Connect backend is running!"
    });
});

// Student routes
app.use("/api/students", studentRoutes);

module.exports = app;
