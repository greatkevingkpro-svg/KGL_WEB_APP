const { userModel } = require("./UsersModels.js");

const seedUsers = async () => {
  try {
    const users = [
      {
        name: "Mr Director",
        userName: "director@email.com",
        password: "123456",
        role: "director",
        status: "active"
      },
      {
        name: "Mr Manager",
        userName: "manager@email.com",
        password: "123456",
        role: "manager",
        branch: "Maganjo",
        status: "active"
      },
      {
        name: "Mr Agent",
        userName: "agent@email.com",
        password: "123456",
        role: "sales agent",
        branch: "Matugga",
        status: "active"
      }
    ];

    for (let user of users) {
      const existingUser = await userModel.findOne({ userName: user.userName });

      if (!existingUser) {
        await userModel.create(user);
        console.log(`Inserted ${user.role}`);
      } else {
        console.log(`${user.role} already exists`);
      }
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

seedUsers();