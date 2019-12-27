const mongoose = require("mongoose");
const debug = require("debug")("database");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true },
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  phone: { type: String, required: true, minlength: 11, maxlength: 11 }
});

const Customer = mongoose.model("Customer", customerSchema);

// Check validation triggers on create request (comes back in the response) (besides joi validation)

const createCustomer = async customerObj => {
  const customerDocument = new Customer(customerObj);
  try {
    const customer = await customerDocument.save();
    debug("SUCCESS: Created customer:", customer);
    return customer;
  } catch (err) {
    debug("ERROR: An excpetion occured while creating a customer:", err);
  }
};

const getCustomer = async id => {
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
};

const getAllCustomers = async () => {
  try {
    const customers = await Customer.find().sort("name");
    debug("SUCCESS: Got customers:", customers);
    return customers;
  } catch (err) {
    debug("ERROR: An expection occured while trying to get customers:", err);
  }
};

const updateCustomer = async (id, customerObj) => {
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
};

const deleteCustomer = async id => {
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
};

module.exports = {
  createCustomer,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
