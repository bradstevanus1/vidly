const Fawn = require("fawn");
const debug = require("debug")("database");
const { Rental } = require("../models/rental");
const { DBMessage } = require("../utils/general");

const DBName = "Rentals";

/**
 * Creates a new movie rental given customer data, movie data, and
 * rental fee data. Function call must be wrapped in a try-catch block
 * as it may throw an error if the Fawn transaction is unsucessful.
 * @param {Object} rentalObj
 */
const createRental = rentalObj => {
  try {
    const rentalDocument = new Rental(rentalObj);
    new Fawn.Task()
      .save("rentals", rentalDocument)
      .update(
        "movies",
        { _id: rentalObj.movie._id },
        { $inc: { numberInStock: -1 } }
      )
      .run();
    debug(DBMessage.createSuccess(DBName), rentalDocument);
    return rentalDocument;
  } catch (err) {
    debug(DBMessage.createError(DBName), err);
    throw err;
  }
};

const getRental = async id => {
  try {
    const rental = await Rental.findById(id);
    if (rental) debug(DBMessage.getSuccess(DBName), rental);
    else debug(DBMessage.getWarn(DBName), id);
    return rental;
  } catch (err) {
    debug(DBMessage.getError(DBName), id, err);
  }
};

const getAllRentals = async () => {
  try {
    const rentals = await Rental.find().sort("-dateOut");
    debug(DBMessage.getAllSuccess(DBName), rentals);
    return rentals;
  } catch (err) {
    debug(DBMessage.getAllError(DBName), err);
  }
};
module.exports = {
  createRental,
  getRental,
  getAllRentals
};
