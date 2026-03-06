require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel } = require("./UsersModels.js"); // adjust path

const URI = process.env.KGL_DB_URI;

const seedUsers = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected for seeding");

        await userModel.deleteMany({
            userName: {
                $in: [
                    "directorofall@email.com",
                    "managerofproc@email.com",
                    "agentofsales@email.com",
                    "directorofall@gmail.com",
                    "managerofproc@gmail.com",
                    "agentofsales@gmail.com"
                ]
            }
        });
        console.log("Old seeded users removed");

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
                await userModel.create(user); // pre-save hook hashes password automatically
                console.log(`Inserted ${user.role}`);
            } else {
                console.log(`${user.role} already exists`);
            }
        }

        console.log("Seeding completed successfully.");
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedUsers();