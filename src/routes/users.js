const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const { validateUser } = require("../models/user");
const { createUser, getUser, getUserWithSelector } = require("../db/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await getUserWithSelector({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userObj = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  };

  user = await createUser(userObj);

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/me", auth, async (req, res) => {
  const user = await getUser(req.user._id);
  res.send(user);
});

module.exports = router;
