const express = require("express");
const productsController = require("../controllers/productsController");
const productsRoutes = express.Router();

productsRoutes.get("/status", productsController.getStatus); // ok
productsRoutes.get("/:id", productsController.getById); // ok
productsRoutes.get("/name/:name", productsController.getByName); // ok
productsRoutes.get("/count", productsController.count); // ok
productsRoutes.get("/", productsController.getAll); // ok
productsRoutes.post("/create", productsController.create); // ok
productsRoutes.put("/update:id", productsController.update); // ok
productsRoutes.put("/deactivate/:id", productsController.deactivate); // ok
productsRoutes.put("/activate/:id", productsController.activate); // ok

module.exports = productsRoutes;
