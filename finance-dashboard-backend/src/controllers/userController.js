const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // Assuming you have a User model

// @desc   Get all users
// @route  GET /api/users
// @access Private (Admin only)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private (Admin/User)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private (Admin/User)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { getUsers, getUserById, updateUser, deleteUser };
