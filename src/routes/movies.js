const express = require("express");
const { validateMovie } = require("../models/movie");
const {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} = require("../db/movies");
const { getGenre } = require("../db/genres");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await getGenre(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");
  const movieObj = {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  };
  const movie = await createMovie(movieObj);
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await getMovie(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.get("/", async (req, res) => {
  const movies = await getAllMovies();
  res.send(movies);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await updateMovie(req.params.id, req.body);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await deleteMovie(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

module.exports = router;
