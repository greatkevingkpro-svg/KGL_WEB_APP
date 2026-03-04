const { userModel } = require("./UsersModels.js");

const seedUsers = async () => {
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

    await userModel.deleteMany({})
    await userModel.insertMany(users)

};

seedUsers();