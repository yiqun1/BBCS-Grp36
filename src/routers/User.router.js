const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../models/prismaClient"); // Import Prisma directly

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug request body

    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user already exists using Prisma directly
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        username: name,
        email,
        passwordHash: hashedPassword,
      },
    });

    console.log("User Registered:", newUser); // Debug success

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});

module.exports = router;
