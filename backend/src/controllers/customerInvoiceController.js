const queries = require("../utils/queries");

const customerInvoiceController = {
  // http://localhost:3000/api/v1/customerInvoice?payment_method=EFECTIVO&payment_status=PENDIENTE

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
      const customer_invoice = await queries.findAll("customer_invoice", {
        where: filterOptions,
      });

      if (!customer_invoice || customer_invoice.length === 0) {
        return res
          .status(404)
          .json({ message: "No invoices found with the given filters" });
      }
      res.status(200).json(customer_invoice);
    } catch (error) {
      console.log(`Error finding customer_invoice: ${error.message}`);
      res.status(500).json({ error: "Error finding customer_invoice" });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const customer_invoice = await queries.findById(
        "customer_invoice",
        Number(id)
      );
      if (!customer_invoice) {
        return res.status(404).json({ message: "customer_invoice not found" });
      }

      res.status(200).json(customer_invoice);
    } catch (error) {
      console.log(`Error fetching customer_invoice: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id customer_invoice" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const customer_invoice = await queries.create("customer_invoice", data);
      res.status(201).json(customer_invoice);
    } catch (error) {
      console.log(`Error creating customer_invoice: ${error.message}`);
      res.status(500).json({ error: "Error creating  customer_invoice" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid customer_invoice ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const customer_invoice = await queries.update(
        "customer_invoice",
        Number(id),
        data
      );
      console.log("Updating customer_invoice with ID:", id, "Data:", data);
      res.status(200).json(customer_invoice);
      if (!customer_invoice) {
        return res.status(404).json({ error: "customer_invoice not found" });
      }
    } catch (error) {
      console.log(`Error updating customer_invoice: ${error.message}`);
      res.status(500).json({ error: "Error updating customer_invoice" });
    }
  },

  async count(req, res) {
    try {
      const customer_invoice = await queries.count("customer_invoice");
      res.status(200).json({ total: customer_invoice });
    } catch (error) {
      console.log("Error counting customer_invoice:", error);
      res.status(500).json({ error: "Error counting customer_invoice" });
    }
  },
};

module.exports = customerInvoiceController;
