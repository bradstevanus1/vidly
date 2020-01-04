const bcrypt = require("bcrypt");
const debug = require("debug")("database");
const { User } = require("../models/user");
const { DBMessage } = require("../utils/general");

const DBName = "Users";

// TODO: put all document creation in the try {} block
const createUser = async userObj => {
  try {
    const userDocument = new User(userObj);

    const salt = await bcrypt.genSalt(10);
    userDocument.password = await bcrypt.hash(userDocument.password, salt);

    const user = await userDocument.save();
    debug(DBMessage.createSuccess(DBName), user);
    return user;
  } catch (err) {
    debug(DBMessage.createError(DBName), err);
  }
};

const getUserWithSelector = async selector => {
  try {
    const user = await User.findOne(selector);
    if (user) debug(DBMessage.getSuccess(DBName), user);
    else debug(DBMessage.getWarn(DBName), selector);
    return user;
  } catch (err) {
    debug(DBMessage.getError(DBName), selector, err);
  }
};

module.exports = {
  createUser,
  getUserWithSelector
};
