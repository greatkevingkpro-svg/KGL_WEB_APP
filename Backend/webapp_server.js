const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");

// database connection
const {connectToMongoDB} = require("./mongodb-app-server.js")
connectToMongoDB();

// importing middleware
const {errorHandler} = require("./middleware/error.js");

// importing routers
const {router: procurementRouter} = require("./routes/procRoutes.js");
const {router: salesRouter} = require("./routes/salesRoutes.js");
const {router: creditSales} = require("./routes/creditSalesRoutes.js")
const {router: usersRouter} = require("./routes/usersRoutes.js");


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
  users: {"kevin": "great-kevin123"},
  challenge: true,
  realm: "Swagger UI"
});

// generate swagger specifications
const swaggerSpec = swaggerJSDoc(options);

// setup swagger UI
app.use("/KGL_API_DOCS", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// get request to the homepage
app.get("/", (req, res) => {
  res.send("Welcome to Karibu Groceries LTD");
})

// use all the imported routers for related path
app.use("/procurements", procurementRouter);
app.use("/sales", salesRouter);
app.use("/credit-sales", creditSales);
app.use("/users", usersRouter);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting the server:", err)
  } else {
    console.log(`Server is successfully running on port: ${PORT}`);
  }
})