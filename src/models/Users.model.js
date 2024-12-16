
const prisma = require('./prismaClient');
const bcrypt = require('bcrypt');




module.exports.login = async function login(username, password) {
    console.log("username:", username, "password:", password);

    try {
        // Fetch user from the database
        const user = await prisma.user.findFirst({
            where: { username },
        });

        console.log("Fetched User:", user);

        // Unified error message for both invalid username and invalid password
        const invalidErrorMessage = "Invalid username or password";

        if (!user) {
            console.error("Login Error:", invalidErrorMessage);
            throw new Error(invalidErrorMessage);
        }

        // Compare plain password with hashed password
        const isPasswordValid = await bcrypt.compare(String(password), String(user.passwordHash));
        
        if (!isPasswordValid) {
            console.error("Login Error:", invalidErrorMessage);
            throw new Error(invalidErrorMessage);
        }

        return user; // Successful login
    } catch (error) {
        console.error("Login Error:", error.message);
        throw new Error("Invalid username or password"); // Return a unified error message
    }


}// Create a new user
module.exports.createUser = async function createUser(data) {
    return prisma.person.create({
      data,
    });
  };
  
  // Find a user by email
  module.exports.findUserByEmail = async function findUserByEmail(email) {
    return prisma.person.findUnique({
      where: { email },
    });
  };

