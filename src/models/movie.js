const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true
  },
  genre: { type: genreSchema, length: 1, required: true },
  numberInStock: {
    type: Number,
    validate: {
      validator: v => Number.isInteger(v) && v >= 0,
      message: "numberInStock must be a non-negative integer"
    },
    min: 0,
    max: 255,
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
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = movie => {
  const schema = {
    title: Joi.string()
      .min(2)
      .max(50)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .integer()
      .positive()
      .allow(0)
      .required(),
    dailyRentalRate: Joi.number()
      .integer()
      .positive()
      .allow(0)
      .required()
  };
  return Joi.validate(movie, schema);
};

module.exports = { movieSchema, Movie, validateMovie };
