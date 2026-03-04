require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel } = require("./UsersModels.js"); // adjust path if needed

const URI = process.env.KGL_DB_URI;

const seedUsers = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");

        const users = [
            {
                name: "Mr Director",
                userName: "directorofall@email.com",
                password: "123456",
                role: "director",
                status: "active"
            },
            {
                name: "Mr Manager",
                userName: "managerofproc@email.com",
                password: "123456",
                role: "manager",
                branch: "Maganjo",
                status: "active"
            },
            {
                name: "Mr Agent",
                userName: "agentofsales@email.com",
                password: "123456",
                role: "sales agent",
                branch: "Matugga",
                status: "active"
            }
        ];

        for (let user of users) {
            const existingUser = await userModel.findOne({ userName: user.userName });

            if (!existingUser) {
                await userModel.create(user); // pre("save") will hash password
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

// Only run seed if RUN_SEED environment variable is set to "true"
if (process.env.RUN_SEED === "true") {
    seedUsers();
} else {
    console.log("RUN_SEED not enabled — skipping seeding");
}