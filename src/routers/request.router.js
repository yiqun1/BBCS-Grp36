const express = require("express");
const router = express.Router();
const requestModel = require("../models/request.model");

// POST /requests - Create a new request
router.post("/", async (req, res) => {
    const { userId, title, message } = req.body;
  
    if (!userId || !title || title.length < 3 || title.length > 100 || message.length < 10 || message.length > 500) {
      return res.status(400).json({ error: "Invalid input. Please check your data." });
    }
  
    try {
      const newRequest = await requestModel.createRequest(userId, title, message);
      res.status(201).json({ message: "Request submitted successfully!", data: newRequest });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
  
// GET /requests - Fetch all requests
router.get("/", async (req, res) => {
  try {
    const requests = await requestModel.getRequests();
    res.status(200).json({ data: requests });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch requests" });
  }
});

module.exports = router;
