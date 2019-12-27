const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    phone: { type: String, required: true, minlength: 11, maxlength: 11 }
  })
);

const validateCustomer = customer => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    phone: Joi.string()
      .length(11)
      .required(),
    isGold: Joi.bool().required()
  };
  return Joi.validate(customer, schema);
};

module.exports = { Customer, validateCustomer };
