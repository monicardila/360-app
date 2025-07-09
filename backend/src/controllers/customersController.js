const {
  customer_invoice,
  invoice_content_customer,
  products,
} = require("../utils/prismaClient");
const queries = require("../utils/queries");

const customersController = {
  // http://localhost:3000/api/v1/customers?includeInvoices=true
  async getAll(req, res) {
    try {
      const includeInvoices = req.query.includeInvoices === "true";

      const customers = await queries.findAll("customers", {
        include: includeInvoices
          ? {
              customer_invoice: {
                include: {
                  invoice_content_customer: {
                    include: {
                      products: true,
                    },
                  },
                },
              },
            }
          : {},
      });
      console.log("controller CUSTOMER: ", customers);

      res.status(200).json(customers);
    } catch (error) {
      console.log(`Error finding customers: ${error.message}`);
      res.status(500).json({ error: "Error finding customers" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params; // este es el identification_card
      const { includeInvoices } = req.query;

      const includeOptions =
        includeInvoices === "true"
          ? {
              customer_invoice: {
                include: {
                  invoice_content_customer: {
                    include: {
                      products: true,
                    },
                  },
                },
              },
            }
          : {};

      console.log("controller CUSTOMER includeOptions: ", includeOptions);

      const customer = await queries.findById("customers", id, includeOptions);

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json(customer);
    } catch (error) {
      console.log(`Error fetching customer: ${error.message}`);
      res.status(500).json({ error: "Error fetching by id customer" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const customers = await queries.create("customers", data);
      res.status(201).json(customers);
    } catch (error) {
      console.log(`Error creating customers: ${error.message}`);
      res.status(500).json({ error: "Error creating  customers" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid customers ID" });
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res
          .status(400)
          .json({ error: "Invalid request body. Expected an object." });
      }

      const customers = await queries.update("customers", Number(id), data);
      console.log("Updating customers with ID:", id, "Data:", data);
      res.status(200).json(customers);
      if (!customers) {
        return res.status(404).json({ error: "customers not found" });
      }
    } catch (error) {
      console.log(`Error updating customers: ${error.message}`);
      res.status(500).json({ error: "Error updating customers" });
    }
  },

  async count(req, res) {
    try {
      const customers = await queries.count("customers");
      res.status(200).json({ total: customers });
    } catch (error) {
      console.log("Error counting customers:", error);
      res.status(500).json({ error: "Error counting customers" });
    }
  },
};

module.exports = customersController;
