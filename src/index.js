const mongoose = require("mongoose");
const debugDB = require("debug")("database");
const debugServer = require("debug")("server");
const express = require("express");

const homeRoutes = require("./routes/homeRoute");
const genresRoutes = require("./routes/genresRoute");
const customersRoutes = require("./routes/customersRoute");

const app = express();

const TEST_PORT = 3000;
const port = process.env.PORT || TEST_PORT;

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => debugDB("Connected to MongoDB..."))
  .catch(err => debugDB("Could not connect to MongoDb...", err));

app.use(express.json());
app.use("/", homeRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customersRoutes);

app.listen(port, () => debugServer(`Listening on port ${port}...`));
