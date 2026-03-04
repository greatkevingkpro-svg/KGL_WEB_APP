require("dotenv").config();
const mongoose = require("mongoose");
const { userModel } = require("./UsersModels.js"); // adjust path

const URI = process.env.KGL_DB_URI;

const seedUsers = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");

    const users = [
      {
        name: "Mr Director",
        userName: "directorofall@gmail.com",
        password: "123456",
        role: "director",
        status: "active"
      },
      {
        name: "Mr Manager",
        userName: "managerofproc@gmail.com",
        password: "123456",
        role: "manager",
        branch: "Maganjo",
        status: "active"
      },
      {
        name: "Mr Agent",
        userName: "agentofsales@gmail.com",
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
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Only run seed if RUN_SEED=true
if (process.env.RUN_SEED === "true") {
  seedUsers();
} else {
  console.log("RUN_SEED not enabled — skipping seeding");
}