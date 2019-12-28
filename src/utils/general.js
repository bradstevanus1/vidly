const messages = require("../../verbiage/messages.json");

const getMessage = index => messages[index];

const DBMessage = {
  createSuccess: DB_NAME => `(${DB_NAME}) ${getMessage("db.create.success")}:`,
  createError: DB_NAME => `(${DB_NAME}) ${getMessage("db.create.error")}:`,
  getSuccess: DB_NAME => `(${DB_NAME}) ${getMessage("db.get.success")}:`,
  getWarn: DB_NAME => `(${DB_NAME}) ${getMessage("db.get.warn")}:`,
  getError: DB_NAME => `(${DB_NAME}) ${getMessage("db.get.error")}:`,
  getAllSuccess: DB_NAME => `(${DB_NAME}) ${getMessage("db.get.all.success")}:`,
  getAllError: DB_NAME => `(${DB_NAME}) ${getMessage("db.get.all.error")}:`,
  updateSuccess: DB_NAME => `(${DB_NAME}) ${getMessage("db.update.success")}:`,
  updateWarn: DB_NAME => `(${DB_NAME}) ${getMessage("db.update.warn")}:`,
  updateError: DB_NAME => `(${DB_NAME}) ${getMessage("db.update.error")}:`,
  deleteSuccess: DB_NAME => `(${DB_NAME}) ${getMessage("db.delete.success")}:`,
  deleteWarn: DB_NAME => `(${DB_NAME}) ${getMessage("db.delete.warn")}:`,
  deleteError: DB_NAME => `(${DB_NAME}) ${getMessage("db.delete.error")}:`
};

module.exports = { DBMessage };
