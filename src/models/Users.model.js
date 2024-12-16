const prisma = require('../models/prismaClient.js');

// Create a new user
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