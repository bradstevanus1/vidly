const debug = require("debug")("database");
const { Customer } = require("../models/customer");

async function createCustomer(customerObj) {
  const customerDocument = new Customer(customerObj);
  try {
    const customer = await customerDocument.save();
    debug("SUCCESS: Created customer:", customer);
    return customer;
  } catch (err) {
    debug("ERROR: An exception occured while creating a customer:", err);
  }
}

async function getCustomer(id) {
  try {
    const customer = await Customer.findById(id);
    if (customer) debug(`SUCCESS: Got customer with ID ${id}:`, customer);
    else debug(`WARN: Did not find customer with ID ${id} to get.`);
    return customer;
  } catch (err) {
    debug(
      `ERROR: An exception occured while trying to get customer with ID ${id}:`,
      err
    );
  }
}

async function getAllCustomers() {
  try {
    const customers = await Customer.find().sort("name");
    debug("SUCCESS: Got customers:", customers);
    return customers;
  } catch (err) {
    debug("ERROR: An exception occured while trying to get customers:", err);
  }
}

async function updateCustomer(id, customerObj) {
  try {
    const customer = await Customer.findByIdAndUpdate(id, customerObj, {
      new: true
    });
    if (customer) debug(`SUCCESS: Updated customer with ID ${id}:`, customer);
    else debug(`WARN: Did not find customer with ID ${id} to update.`);
    return customer;
  } catch (err) {
    debug(
      `ERROR: An exception occured while trying to update customer with ID ${id}`,
      err
    );
  }
}

async function deleteCustomer(id) {
  try {
    const customer = await Customer.findByIdAndRemove(id);
    if (customer) debug(`SUCCESS: Deleted customer with ID ${id}:`, customer);
    else debug(`WARN: Did not find customer with ID ${id} to delete.`);
    return customer;
  } catch (err) {
    debug(
      `ERROR: An exception occured while trying to delete customer with ID ${id}`,
      err
    );
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
