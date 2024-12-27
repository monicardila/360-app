const prisma = require("./src/utils/prismaClient");
const express = require("express");
const cors = require("cors"); // Imports CORS middleware
const { PORT } = require("./config");
const cookieParser = require("cookie-parser");
const { router: authRouter } = require("./auth");
const protectedRoutes = require("./src/routes/protectedRoutes");

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
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// specific configuration CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route general
app.get("/", (req, res) => {
  res.send("principal");
});

// Routes models
app.use("/api/v1/invoiceContentCustomer", invoiceContentCustomerRoutes); //ok
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

// Routes authentication
app.use("/app", authRouter);

// Routes protected
app.use("/app/protected", protectedRoutes);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// // 1. Productos con stock bajo
// // 2. Categorías más vendidas
// // 3. Branch stores con más ventas
