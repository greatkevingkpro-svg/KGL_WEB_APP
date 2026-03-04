const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

// database connection
const { connectToMongoDB } = require("./mongodb-app-server.js")
connectToMongoDB();

// importing middleware
const { errorHandler } = require("./middleware/error.js");

// importing routers
const { router: procurementRouter } = require("./routes/procRoutes.js");
const { router: salesRouter } = require("./routes/salesRoutes.js");
const { router: creditSales } = require("./routes/creditSalesRoutes.js")
const { router: usersRouter } = require("./routes/usersRoutes.js");
const authRouter = require("./routes/auth.js");

const { authMiddleware } = require("./middleware/authMiddleware.js")
const { protectedRouter } = require("./middleware/protectedRouter.js")


const app = express();

// swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Karibu Groceries APP API",
		version: "1.0.0",
		description: "REST API documentation for Karibu Groceries LTD"
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Development server"
		}
	]
};

// options for swagger jsdoc
const options = {
	swaggerDefinition,
	apis: ["./routes/*.js"] // path to all the API docs
};

// configure basic authentication for swagger UI
const swaggerAuth = basicAuth({
	users: { "kevin": "great-kevin123" },
	challenge: true,
	realm: "Swagger UI"
});

// generate swagger specifications
const swaggerSpec = swaggerJSDoc(options);

// setup swagger UI
app.use("/KGL_API_DOCS", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// allow all origins
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// get request to the homepage
app.get("/", (req, res) => {
	res.send("Welcome to Karibu Groceries LTD");
})

// login request 
app.post("/login", (req, res) => { })

app.use("/api/auth", authRouter);
app.use("/api", authMiddleware, protectedRouter);

// use all the imported routers for related path
protectedRouter.use("/procurements", procurementRouter);
protectedRouter.use("/sales", salesRouter);
protectedRouter.use("/credit-sales", creditSales);
protectedRouter.use("/users", usersRouter);


// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3050;
app.listen(PORT, (err) => {
	if (err) {
		console.log("Error starting the server:", err)
	} else {
		console.log(`Server is successfully running on port: ${PORT}`);
	}
})