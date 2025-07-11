const express = require("express");
const productsController = require("../controllers/productsController");
const productsRoutes = express.Router();

productsRoutes.get("/count", productsController.count); // ok
productsRoutes.get("/status", productsController.getStatus); // ok
productsRoutes.get("/", productsController.getAll); // ok
productsRoutes.get("/:id", productsController.getById); // ok
productsRoutes.get("/name/:name", productsController.getByName); // ok
productsRoutes.post("/", productsController.create); // ok
productsRoutes.put("/:id", productsController.update); // ok
productsRoutes.put("/deactivate/:id", productsController.deactivate); // ok
productsRoutes.put("/activate/:id", productsController.activate); // ok

module.exports = productsRoutes;
