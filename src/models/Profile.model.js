const prisma = require('./prismaClient');

// Fetch user profile by ID
module.exports.getUserProfile = async function getUserProfile(user_id) {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id, 10) },
      select: { 
        user_id: true,
        username: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    throw new Error("Failed to fetch user profile.");
  }
};

// Update user profile
module.exports.updateUserProfile = async function updateUserProfile(user_id, updateData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(user_id, 10) },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error.message);

    if (error.code === "P2025") {
      throw new Error("User not found.");
    }

    throw new Error("Failed to update user profile.");
  }
};
