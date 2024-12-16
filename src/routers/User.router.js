const express = require('express');
const bcrypt = require('bcrypt');
const { login } = require('../models/Users.model.js');

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "Both username and password are required" });
      }
  
      // Call the login function from the model
      const user = await login(username, password);
  
      res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
      console.error("Login Route Error:", error.message);
      res.status(401).json({ error: error.message || "Invalid login credentials" });
    }
  });
module.exports = router;
