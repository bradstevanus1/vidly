const mongoose = require("mongoose");
const Joi = require("joi");

// Customer document model for mongoDb

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 50, required: true },
    phone: { type: String, minlength: 11, maxlength: 11, required: true },
    isGold: { type: Boolean, default: false, required: true }
  })
);

// Customer object validation for request body sent in API

const validateCustomer = customerObj => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    phone: Joi.string()
      .length(11)
      .required(),
    isGold: Joi.bool()
      .default(false)
      .required()
  };
  return Joi.validate(customerObj, schema);
};

module.exports = { Customer, validateCustomer };
