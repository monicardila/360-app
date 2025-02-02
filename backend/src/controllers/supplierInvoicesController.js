const queries = require("../utils/queries");

const supplierInvoicesController = {
  // http://localhost:3000/api/v1/supplierInvoices?payment_method=TRANSFERENCIA&payment_status=PENDIENTE
  async getAll(req, res) {
    try {
      const { payment_method, payment_status } = req.query;
      const filterOptions = {};

      if (payment_method) {
        filterOptions.payment_method = payment_method;
      }

      if (payment_status) {
        filterOptions.payment_status = payment_status;
      }
      // Searches only for records in the customer_invoice table that match the defined conditions.
      const supplier_invoices = await queries.findMany("supplier_invoices", {
        where: filterOptions,
      });

      if (!supplier_invoices || supplier_invoices.length === 0) {
        return res
          .status(404)
          .json({ message: "No invoices found with the given filters" });
      }
      res.status(200).json(supplier_invoices);
    } catch (error) {
      console.log(`Error finding supplier_invoices: ${error.message}`);
      res.status(500).json({ error: "Error finding supplier_invoices" });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const supplier_invoices = await queries.findById(
        "supplier_invoices",
        Number(id)
      );
      if (!supplier_invoices) {
        return res.status(404).json({ message: "supplier_invoices not found" });
      }

      res.status(200).json(supplier_invoices);
    } catch (error) {
      console.log(`Error fetching supplier_invoices: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id supplier_invoices" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const supplier_invoices = await queries.create("supplier_invoices", data);
      res.status(201).json(supplier_invoices);
    } catch (error) {
      console.log(`Error creating supplier_invoices: ${error.message}`);
      res.status(500).json({ error: "Error creating  supplier_invoices" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid supplier_invoices ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const supplier_invoices = await queries.update(
        "supplier_invoices",
        Number(id),
        data
      );
      console.log("Updating supplier_invoices with ID:", id, "Data:", data);
      res.status(200).json(supplier_invoices);
      if (!supplier_invoices) {
        return res.status(404).json({ error: "supplier_invoices not found" });
      }
    } catch (error) {
      console.log(`Error updating supplier_invoices: ${error.message}`);
      res.status(500).json({ error: "Error updating supplier_invoices" });
    }
  },

  async count(req, res) {
    try {
      const supplier_invoices = await queries.count("supplier_invoices");
      res.status(200).json({ total: supplier_invoices });
    } catch (error) {
      console.log("Error counting supplier_invoices:", error);
      res.status(500).json({ error: "Error counting supplier_invoices" });
    }
  },
};

module.exports = supplierInvoicesController;
