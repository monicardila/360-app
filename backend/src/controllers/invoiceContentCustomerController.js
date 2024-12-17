const queries = require("../utils/queries");

const invoiceContentCustomerController = {
  async getAll(req, res) {
    try {
      const invoice_content_customer = await queries.findMany(
        "invoice_content_customer"
      );

      res.status(200).json(invoice_content_customer);
    } catch (error) {
      console.log(`Error finding invoice_content_customer: ${error.message}`);
      res.status(500).json({ error: "Error finding invoice_content_customer" });
    }
  },
  // http://localhost:3000/api/v1/invoiceContentCustomer/61?includeProducts=true
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { includeProducts } = req.query;
      const includeOptions =
        includeProducts === "true" ? { products: true } : {};

      const invoice_content_customer = await queries.findById(
        "invoice_content_customer",
        Number(id),
        includeOptions
      );
      if (!invoice_content_customer) {
        return res
          .status(404)
          .json({ message: "invoice_content_customer not found" });
      }

      res.status(200).json(invoice_content_customer);
    } catch (error) {
      console.log(`Error fetching invoice_content_customer: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error fetching by id invoice_content_customer" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const invoice_content_customer = await queries.create(
        "invoice_content_customer",
        data
      );
      res.status(201).json(invoice_content_customer);
    } catch (error) {
      console.log(`Error creating invoice_content_customer: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error creating  invoice_content_customer" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "Invalid invoice_content_customer ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const invoice_content_customer = await queries.update(
        "invoice_content_customer",
        Number(id),
        data
      );
      console.log(
        "Updating invoice_content_customer with ID:",
        id,
        "Data:",
        data
      );
      res.status(200).json(invoice_content_customer);
      if (!invoice_content_customer) {
        return res
          .status(404)
          .json({ error: "invoice_content_customer not found" });
      }
    } catch (error) {
      console.log(`Error updating invoice_content_customer: ${error.message}`);
      res
        .status(500)
        .json({ error: "Error updating invoice_content_customer" });
    }
  },

  async count(req, res) {
    try {
      const invoice_content_customer = await queries.count(
        "invoice_content_customer"
      );
      res.status(200).json({ total: invoice_content_customer });
    } catch (error) {
      console.log("Error counting invoice_content_customer:", error);
      res
        .status(500)
        .json({ error: "Error counting invoice_content_customer" });
    }
  },
};

module.exports = invoiceContentCustomerController;
