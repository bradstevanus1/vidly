const express = require("express");
const auth = require("../middleware/auth");
const { validateRental } = require("../models/rental");
const { getCustomer } = require("../db/customers");
const { getMovie } = require("../db/movies");
const { createRental, getRental, getAllRentals } = require("../db/rentals");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const [customer, movie] = await Promise.all([
    getCustomer(req.body.customerId),
    getMovie(req.body.movieId)
  ]);
  if (!customer) return res.status(400).send("Invalid customer.");
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie not in stock.");
  }

  const rentalObj = {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    rentalFee: movie.dailyRentalRate * 7 // Business logic here
  };

  try {
    const rentalDocument = createRental(rentalObj);
    res.send(rentalDocument);
  } catch (err) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", async (req, res) => {
  const rental = await getRental(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");
  res.send(rental);
});

router.get("/", async (req, res) => {
  const rentals = await getAllRentals();
  res.send(rentals);
});

module.exports = router;
