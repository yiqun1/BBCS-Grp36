const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Users to seed
  const users = [
    {
      
    },
    {
      username: "JaneDoe",
      email: "jane@example.com",
      password: "mypassword", 
    },
    {
      username: "AliceSmith",
      email: "alice@example.com",
      password: "securepass", 
    },
  ];

  for (const user of users) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        passwordHash: hashedPassword,
      },
    });

    console.log(`User ${user.username} created!`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((error) => {
    console.error("Error seeding the database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
