const debug = require("debug")("database");
const { User } = require("../models/user");
const { DBMessage } = require("../utils/general");

const DBName = "Users";

// TODO: put all document creation in the try block (for other APIs)
async function createUser(userObj) {
  try {
    const userDocument = new User(userObj);
    const user = await userDocument.save();
    debug(DBMessage.createSuccess(DBName), user);
    return user;
  } catch (err) {
    debug(DBMessage.createError(DBName), err);
  }
}

async function getUser(id) {
  try {
    const user = await User.findById(id).select("-password");
    if (user) debug(DBMessage.getSuccess(DBName), user);
    else debug(DBMessage.getWarn(DBName), id);
    return user;
  } catch (err) {
    debug(DBMessage.getError(DBName), id, err);
  }
}

async function getUserWithSelector(selector) {
  try {
    const user = await User.findOne(selector);
    if (user) debug(DBMessage.getSuccess(DBName), user);
    else debug(DBMessage.getWarn(DBName), selector);
    return user;
  } catch (err) {
    debug(DBMessage.getError(DBName), selector, err);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserWithSelector
};
