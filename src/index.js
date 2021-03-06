const config = require("config");
const Joi = require("joi");
// Add MongoDB objectID validation to Joi API validation
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debugDB = require("debug")("database");
const debugServer = require("debug")("server");
const express = require("express");

const homeRoute = require("./routes/home");
const genresRoute = require("./routes/genres");
const customersRoute = require("./routes/customers");
const moviesRoute = require("./routes/movies");
const rentalsRoute = require("./routes/rentals");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();

const TEST_PORT = 3000;
const port = process.env.PORT || TEST_PORT;

if (!config.get("jwtPrivateKey")) {
  debugServer("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => debugDB("Connected to MongoDB..."))
  .catch(err => debugDB("Could not connect to MongoDb...", err));

app.use(express.json());

app.use("/", homeRoute);
app.use("/api/genres", genresRoute);
app.use("/api/customers", customersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/rentals", rentalsRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => debugServer(`Listening on port ${port}...`));
