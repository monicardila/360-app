const express = require("express");
const customerInvoiceController = require("../controllers/customerInvoiceController");
const customerInvoiceRoutes = express.Router();

customerInvoiceRoutes.get("/count", customerInvoiceController.count); //Define specific routes FIRST
customerInvoiceRoutes.get("/", customerInvoiceController.getAll); //ok
customerInvoiceRoutes.get("/:id", customerInvoiceController.getById); //ok
customerInvoiceRoutes.post("/", customerInvoiceController.create); //ok
customerInvoiceRoutes.put("/:id", customerInvoiceController.update); //ok

module.exports = customerInvoiceRoutes;
