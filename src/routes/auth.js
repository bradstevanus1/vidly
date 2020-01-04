const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { getUserWithSelector } = require("../db/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await getUserWithSelector({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send("Invalid email or password");
  }

  res.send(true);
});

function validateAuth(auth) {
  const schema = {
    email: Joi.string()
      .email()
      .min(2)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(auth, schema);
}

module.exports = router;
