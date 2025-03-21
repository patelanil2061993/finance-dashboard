const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const reportRoutes = require('./routes/reportRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const swaggerDocs = require('./swaggerConfig');
const financeRoutes = require("./routes/financeRoutes");
const authRoutes = require("./routes/authRoutes"); // Example additional route
const userRoutes = require("./routes/userRoutes"); // Example additional route

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/finance", financeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/files', fileUploadRoutes);
app.use('/api/files', fileUploadRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Finance API");
});

module.exports = app;
