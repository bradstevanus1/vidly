const _ = require("lodash");
const express = require("express");
const { validateUser } = require("../models/user");
const { createUser, getUserWithSelector } = require("../db/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await getUserWithSelector({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = await createUser(_.pick(req.body, ["name", "email", "password"]));

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
