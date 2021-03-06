const debug = require("debug")("database");
const { Genre } = require("../models/genre");

async function createGenre(name) {
  const genre = new Genre({
    name: name
  });
  try {
    const genreResult = await genre.save();
    debug("SUCCESS: Saved to genres collection:", genreResult);
    return genreResult;
  } catch (err) {
    debug("ERROR: Failed to save to genres collection:", err);
  }
}

async function getGenre(id) {
  try {
    const genre = await Genre.findById(id);
    if (genre) debug(`SUCCESS: Got genre with ID ${id}:`, genre);
    else debug(`WARN: Did not find genre with ID ${id} to get.`);
    return genre;
  } catch (err) {
    debug(`ERROR: Failed to get genre with ID ${id}:`, err);
  }
}

async function getAllGenres() {
  try {
    const genres = await Genre.find().sort("name");
    debug("SUCCESS: Got genres:", genres);
    return genres;
  } catch (err) {
    debug("ERROR: Failed to get genres collection:", err);
  }
}

async function updateGenre(id, name) {
  try {
    const genre = await Genre.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );
    if (genre) debug(`SUCCESS: Updated genre with ID ${id}:`, genre);
    else debug(`WARN: Did not find genre with ID ${id} to update.`);
    return genre;
  } catch (err) {
    debug(`ERROR: Failed to update genre with ID ${id}`, err);
  }
}

async function deleteGenre(id) {
  try {
    const genre = await Genre.findByIdAndRemove(id);
    if (genre) debug(`SUCCESS: Deleted genre with ID ${id}:`, genre);
    else debug(`WARN: Did not find genre with ID ${id} to delete.`);
    return genre;
  } catch (err) {
    debug(`ERROR: Failed to delete genre with ID ${id}`, err);
  }
}

module.exports = {
  createGenre,
  getGenre,
  getAllGenres,
  updateGenre,
  deleteGenre
};
