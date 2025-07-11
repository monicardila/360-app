// 📁 backend/routes/sales.js
const express = require("express");
const salesController = require("../controllers/salesController");
const salesRoutes = express.Router();

salesRoutes.post("/", salesController.create);

module.exports = salesRoutes;
