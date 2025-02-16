const { products } = require("../utils/prismaClient");
const queries = require("../utils/queries");
const { count } = require("./employeesController");

const supplierController = {
  async getAll(req, res) {
    try {
      const supplier = await queries.findAll("supplier");
      res.status(200).json(supplier);
    } catch (error) {
      console.log(`Error finding supplier: ${error.message}`);
      res.status(500).json({ error: "Error finding supplier" });
    }
  },
  //http://localhost:3000/api/v1/suppliers/2?includeProducts=true
  //http://localhost:3000/api/v1/suppliers/2
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeProducts } = req.query;
      const includeOptions =
        includeProducts === "true" ? { products: true } : {};

      const supplier = await queries.findById(
        "supplier",
        Number(id),
        includeOptions
      );
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      res.status(200).json(supplier);
    } catch (error) {
      console.log(`Error fetching supplier: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id supplier" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const supplier = await queries.create("supplier", data);
      res.status(201).json(supplier);
    } catch (error) {
      console.log(`Error creating supplier: ${error.message}`);
      res.status(500).json({ error: "Error creating  supplier" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid employee ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const supplier = await queries.update("supplier", Number(id), data);
      console.log("Updating supplier with ID:", id, "Data:", data);
      res.status(200).json(supplier);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
    } catch (error) {
      console.log(`Error updating supplier: ${error.message}`);
      res.status(500).json({ error: "Error updating supplier" });
    }
  },

  async count(req, res) {
    try {
      const supplier = await queries.count("supplier");
      res.status(200).json({ total: supplier });
    } catch (error) {
      console.log("Error counting suppliers:", error);
      res.status(500).json({ error: "Error counting suppliers" });
    }
  },
  // http://localhost:3000/api/v1/suppliers/deactivate/1
  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const supplier = await queries.deactivate("supplier", Number(id));
      res
        .status(200)
        .json({ message: `Successfully disabled supplier`, supplier });
    } catch (error) {
      console.log(("Error deactivating supplier:", error));
      res.status(500).json({ error: "Error deactivating supplier" });
    }
  },
  // http://localhost:3000/api/v1/suppliers/activate/1
  async activate(req, res) {
    try {
      const { id } = req.params;
      const supplier = await queries.activate("supplier", Number(id));
      res
        .status(200)
        .json({ message: `Successfully activating supplier`, supplier });
    } catch (error) {
      console.log(("Error activating supplier:", error));
      res.status(500).json({ error: "Error activating supplier" });
    }
  },

  // http://localhost:3000/api/v1/suppliers/status?status=false
  async findStatus(req, res) {
    try {
      const { status } = req.query;
      const supplier = await queries.findStatus("supplier", status === "true");
      res.status(200).json(supplier);
    } catch (error) {
      console.log("Error fetching suppliers by status:", error);
      res.status(500).json({ error: "Error fetching suppliers by status" });
    }
  },
};

module.exports = supplierController;
