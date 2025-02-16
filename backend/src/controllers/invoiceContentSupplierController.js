const queries = require("../utils/queries");

const invoiceContentSupplierController = {
  async getAll(req, res) {
    try {
      const invoice_content_supplier = await queries.findAll(
        "invoice_content_supplier"
      );

      res.status(200).json(invoice_content_supplier);
    } catch (error) {
      console.log(`Error finding invoice_content_supplier: ${error.message}`);
      res.status(500).json({ error: "Error finding invoice_content_supplier" });
    }
  },
  // http://localhost:3000/api/v1/invoiceContentSupplier/11?includeProducts=true
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeProducts } = req.query;
      const includeOptions =
        includeProducts === "true" ? { products: true } : {};

      const invoice_content_supplier = await queries.findById(
        "invoice_content_supplier",
        Number(id),
        includeOptions
      );
      if (!invoice_content_supplier) {
        return res
          .status(404)
          .json({ message: "invoice_content_supplier not found" });
      }

      res.status(200).json(invoice_content_supplier);
    } catch (error) {
      console.log(`Error fetching invoice_content_supplier: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error fetching by id invoice_content_supplier" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const invoice_content_supplier = await queries.create(
        "invoice_content_supplier",
        data
      );
      res.status(201).json(invoice_content_supplier);
    } catch (error) {
      console.log(`Error creating invoice_content_supplier: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error creating  invoice_content_supplier" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "Invalid invoice_content_supplier ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const invoice_content_supplier = await queries.update(
        "invoice_content_supplier",
        Number(id),
        data
      );
      console.log(
        "Updating invoice_content_supplier with ID:",
        id,
        "Data:",
        data
      );
      res.status(200).json(invoice_content_supplier);
      if (!invoice_content_supplier) {
        return res
          .status(404)
          .json({ error: "invoice_content_supplier not found" });
      }
    } catch (error) {
      console.log(`Error updating invoice_content_supplier: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error updating invoice_content_supplier" });
    }
  },

  async count(req, res) {
    try {
      const invoice_content_supplier = await queries.count(
        "invoice_content_supplier"
      );
      res.status(200).json({ total: invoice_content_supplier });
    } catch (error) {
      console.log("Error counting invoice_content_supplier:", error);
      res
        .status(500)
        .json({ error: "Error counting invoice_content_supplier" });
    }
  },
};

module.exports = invoiceContentSupplierController;
