const express = require("express");
const invoiceContentCustomerController = require("../controllers/invoiceContentCustomerController");
const invoiceContentCustomerRoutes = express.Router();

invoiceContentCustomerRoutes.get(
  "/count",
  invoiceContentCustomerController.count
); //Define specific routes FIRST
invoiceContentCustomerRoutes.get("/", invoiceContentCustomerController.getAll); //ok
invoiceContentCustomerRoutes.get(
  "/:id",
  invoiceContentCustomerController.getById
); //ok
invoiceContentCustomerRoutes.post("/", invoiceContentCustomerController.create); //ok
invoiceContentCustomerRoutes.put(
  "/:id",
  invoiceContentCustomerController.update
); //ok

module.exports = invoiceContentCustomerRoutes;
