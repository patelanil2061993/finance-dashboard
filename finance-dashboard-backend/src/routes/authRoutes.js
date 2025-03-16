const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); // User Registration
router.post("/login", loginUser); // User Login
router.get("/profile", protect, getProfile); // Get User Profile (Protected)

module.exports = router;
