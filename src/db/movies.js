const debug = require("debug")("database");
const { Movie } = require("../models/movie");
const { DBMessage } = require("../utils/general");

const DBName = "Movies";

async function createMovie(movieObj) {
  const movieDocument = new Movie(movieObj);
  try {
    const movie = await movieDocument.save();
    debug(DBMessage.createSuccess(DBName), movie);
    return movie;
  } catch (err) {
    debug(DBMessage.createError(DBName), err);
  }
}

async function getMovie(id) {
  try {
    const movie = await Movie.findById(id);
    if (movie) debug(DBMessage.getSuccess(DBName), movie);
    else debug(DBMessage.getWarn(DBName), id);
    return movie;
  } catch (err) {
    debug(DBMessage.getError(DBName), id, err);
  }
}

async function getAllMovies() {
  try {
    const movies = await Movie.find().sort("title");
    debug(DBMessage.getAllSuccess(DBName), movies);
    return movies;
  } catch (err) {
    debug(DBMessage.getAllError(DBName), err);
  }
}

async function updateMovie(id, movieObj) {
  try {
    const movie = await Movie.findByIdAndUpdate(id, movieObj, {
      new: true
    });
    if (movie) debug(DBMessage.updateSuccess(DBName), id, movie);
    else debug(DBMessage.updateWarn(DBName), id);
    return movie;
  } catch (err) {
    debug(DBMessage.updateError(DBName), id, err);
  }
}

async function deleteMovie(id) {
  try {
    const movie = await Movie.findByIdAndRemove(id);
    if (movie) debug(DBMessage.deleteSuccess(DBName), id, movie);
    else debug(DBMessage.deleteWarn(DBName), id);
    return movie;
  } catch (err) {
    debug(DBMessage.deleteError(DBName), id, err);
  }
}

module.exports = {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
};
