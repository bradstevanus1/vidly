const express = require("express");
const auth = require("../middleware/auth");
const { validateCustomer } = require("../models/customer");
const {
  createCustomer,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require("../db/customers");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await createCustomer(req.body);
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await getCustomer(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

router.get("/", async (req, res) => {
  const customers = await getAllCustomers();
  res.send(customers);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await updateCustomer(req.params.id, req.body);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await deleteCustomer(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

module.exports = router;
