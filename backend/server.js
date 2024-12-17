const prisma = require("./src/utils/prismaClient");
const express = require("express");
// const cors = require('cors');
const employeesRoutes = require("./src/routes/employeesRoutes");
const supplierRoutes = require("./src/routes/supplierRoutes");
const customersRoutes = require("./src/routes/customersRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const branchStoreRoutes = require("./src/routes/branchStoreRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");
const customerInvoiceRoutes = require("./src/routes/customerInvoiceRoutes");
const supplierInvoiceRoutes = require("./src/routes/supplierInvoicesRoutes");
const invoiceContentSupplierRoutes = require("./src/routes/invoiceContentSupplierRoutes");
const invoiceContentCustomerRoutes = require("./src/routes/invoiceContentCustomerRoutes");
const app = express();
// app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/invoiceContentCustomer", invoiceContentCustomerRoutes);
app.use("/api/v1/invoiceContentSupplier", invoiceContentSupplierRoutes); //ok
app.use("/api/v1/supplierInvoices", supplierInvoiceRoutes); //ok
app.use("/api/v1/customerInvoice", customerInvoiceRoutes); //ok
app.use("/api/v1/orders", ordersRoutes); //ok
app.use("/api/v1/branchStore", branchStoreRoutes); //ok
app.use("/api/v1/category", categoryRoutes); //ok
app.use("/api/v1/products", productsRoutes); //ok
app.use("/api/v1/customers", customersRoutes); //ok
app.use("/api/v1/employees", employeesRoutes); //ok
app.use("/api/v1/suppliers", supplierRoutes); //ok

// Route general
app.get("/", (req, res) => {
  res.send("principal");
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.eventNames.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
