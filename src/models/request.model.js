const prisma = require('./prismaClient');

module.exports = {
  // Function to create a new request
  createRequest: async (userId, title, message) => {
    try {
      const newRequest = await prisma.leaf.create({
        data: {
          type: "request",
          title, // Use the provided title
          description: message,
          fulfilled: false,
          user_id: parseInt(userId, 10), // Convert to integer
        },
      });
      return newRequest;
    } catch (error) {
      console.error("Error creating request:", error.message);
      throw new Error("Failed to create request");
    }
  },

  // Function to fetch all requests
  getRequests: async () => {
    try {
      const requests = await prisma.leaf.findMany({
        where: { type: "request" },
      });
      return requests;
    } catch (error) {
      console.error("Error fetching requests:", error.message);
      throw new Error("Failed to fetch requests");
    }
  },
};
