const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Debugging Logs
console.log("User Controller:", userController);
console.log("Type of getUsers:", typeof userController.getUsers);

// Ensure all functions are defined before registering routes
if (typeof userController.getUsers !== "function") {
  throw new Error("userController.getUsers is not a function. Check your exports.");
}

// User Management Routes
router.get("/", protect, userController.getUsers); // Get all users
router.get("/:id", protect, userController.getUserById); // Get user by ID
router.put("/:id", protect, userController.updateUser); // Update user by ID
router.delete("/:id", protect, userController.deleteUser); // Delete user by ID

module.exports = router;
