const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateGenre } = require("../models/genre");
const {
  createGenre,
  getGenre,
  getAllGenres,
  updateGenre,
  deleteGenre
} = require("../db/genres");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await createGenre(req.body.name);
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await getGenre(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

router.get("/", async (req, res) => {
  const genres = await getAllGenres();
  res.send(genres);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await updateGenre(req.params.id, req.body.name);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await deleteGenre(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
