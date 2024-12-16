const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../models/prismaClient"); 

const router = express.Router();
//Register
router.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: name,
        email,
        passwordHash: hashedPassword,
      },
    });

    console.log("User Registered:", newUser);

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});

module.exports = router;
