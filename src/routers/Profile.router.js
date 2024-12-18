const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../models/Profile.model');

// Middleware to validate and parse userId
const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  const id = parseInt(userId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid user ID format. User ID must be a number." });
  }

  req.userId = id; // Attach validated ID to the request object
  next();
};

// Fetch user profile
router.get('/:userId', validateUserId, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await getUserProfile(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully.',
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: "An error occurred while fetching the user profile." });
  }
});

// Update user profile
router.put('/:userId', validateUserId, async (req, res) => {
  const userId = req.userId;
  const updateData = req.body;

  // Validate request body
  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Update data cannot be empty." });
  }

  try {
    // Ensure only allowed fields are updated
    const allowedFields = ['name', 'email', 'bio', 'location'];
    const filteredUpdateData = {};

    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key) && updateData[key].trim() !== "") {
        filteredUpdateData[key] = updateData[key].trim();
      }
    });

    if (Object.keys(filteredUpdateData).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update." });
    }

    const updatedUser = await updateUserProfile(userId, filteredUpdateData);
    res.status(200).json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error.message);

    if (error.message === "User not found.") {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});

module.exports = router;
