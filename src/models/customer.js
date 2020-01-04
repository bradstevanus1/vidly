const mongoose = require("mongoose");
const Joi = require("joi");

// Customer document model for mongoDb

const customerSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 50, required: true },
  phone: { type: String, minlength: 11, maxlength: 11, required: true },
  isGold: { type: Boolean, default: false, required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

// Customer object validation for request body sent in API

function validateCustomer(customerObj) {
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
}

module.exports = { customerSchema, Customer, validateCustomer };
