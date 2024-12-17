const express = require("express");
const invoiceContentSupplierController = require("../controllers/invoiceContentSupplierController");
const invoiceContentSupplierRoutes = express.Router();

invoiceContentSupplierRoutes.get(
  "/count",
  invoiceContentSupplierController.count
); //Define specific routes FIRST
invoiceContentSupplierRoutes.get("/", invoiceContentSupplierController.getAll); //ok
invoiceContentSupplierRoutes.get(
  "/:id",
  invoiceContentSupplierController.getById
); //ok
invoiceContentSupplierRoutes.post("/", invoiceContentSupplierController.create); //ok
invoiceContentSupplierRoutes.put(
  "/:id",
  invoiceContentSupplierController.update
); //ok

module.exports = invoiceContentSupplierRoutes;
