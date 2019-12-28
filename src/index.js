const mongoose = require("mongoose");
const debugDB = require("debug")("database");
const debugServer = require("debug")("server");
const express = require("express");

const homeRoute = require("./routes/home");
const genresRoute = require("./routes/genres");
const customersRoute = require("./routes/customers");
const moviesRoute = require("./routes/movies");

const app = express();

const TEST_PORT = 3000;
const port = process.env.PORT || TEST_PORT;

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => debugDB("Connected to MongoDB..."))
  .catch(err => debugDB("Could not connect to MongoDb...", err));

app.use(express.json());
app.use("/", homeRoute);
app.use("/api/genres", genresRoute);
app.use("/api/customers", customersRoute);
app.use("/api/movies", moviesRoute);

app.listen(port, () => debugServer(`Listening on port ${port}...`));
