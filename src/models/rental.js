const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true,
        required: true
      },
      dailyRentalRate: {
        type: Number,
        validate: {
          validator: v => Number.isInteger(v) && v >= 0,
          message: "dailyRentalRate must be a non-negative integer"
        },
        min: 0,
        max: 255,
        required: true
      }
    }),
    required: true
  },
  dateOut: { type: Date, default: Date.now, required: true },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0, required: true }
});

const Rental = mongoose.model("Rental", rentalSchema);

const validateRental = rental => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
};

module.exports = { Rental, validateRental };
