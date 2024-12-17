-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD', 'TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "Payment_status" AS ENUM ('PAGADA', 'PENDIENTE', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Delivery_status" AS ENUM ('APROBADA', 'RECHAZADA', 'RECIBIDA', 'BORRADOR', 'EN_ESPERA');

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "identification_card" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "branch_store_id" INTEGER NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "nit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier_invoices" (
    "id" SERIAL NOT NULL,
    "branch_store_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_name" TEXT DEFAULT 'Caja',
    "supplier_nit" TEXT NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "vat" DECIMAL(5,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "amount_paid" DECIMAL(10,2) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "payment_status" "Payment_status" NOT NULL DEFAULT 'PAGADA',

    CONSTRAINT "Supplier_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice_content_supplier" (
    "id" SERIAL NOT NULL,
    "supplier_invoice_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "invoice_detail" TEXT,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Invoice_content_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'Producto',
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "supplier_id" INTEGER DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplier_nit" TEXT NOT NULL,
    "employees_identification_card" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "delivery_status" "Delivery_status" NOT NULL DEFAULT 'BORRADOR',

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "identification_card" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer_invoice" (
    "id" SERIAL NOT NULL,
    "branch_store_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_name" TEXT NOT NULL,
    "customer_identification_card" TEXT NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "vat" DECIMAL(5,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "amount_paid" DECIMAL(10,2) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "payment_status" "Payment_status" NOT NULL DEFAULT 'PAGADA',

    CONSTRAINT "Customer_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice_content_customer" (
    "id" SERIAL NOT NULL,
    "customer_invoice_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "invoice_detail" TEXT,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Invoice_content_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchStore" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Principal',
    "address" TEXT NOT NULL,
    "manager_name" TEXT NOT NULL,
    "number_of_employees" INTEGER NOT NULL,

    CONSTRAINT "BranchStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_identification_card_key" ON "Employees"("identification_card");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_name_key" ON "Employees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_phone_key" ON "Employees"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_bank_account_number_key" ON "Employees"("bank_account_number");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_nit_key" ON "Supplier"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_phone_key" ON "Supplier"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_address_key" ON "Supplier"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_identification_card_key" ON "Customers"("identification_card");

-- CreateIndex
CREATE UNIQUE INDEX "BranchStore_name_key" ON "BranchStore"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BranchStore_address_key" ON "BranchStore"("address");

-- CreateIndex
CREATE INDEX "_CategoryToProducts_B_index" ON "_CategoryToProducts"("B");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_branch_store_id_fkey" FOREIGN KEY ("branch_store_id") REFERENCES "BranchStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier_invoices" ADD CONSTRAINT "Supplier_invoices_branch_store_id_fkey" FOREIGN KEY ("branch_store_id") REFERENCES "BranchStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier_invoices" ADD CONSTRAINT "Supplier_invoices_employee_name_fkey" FOREIGN KEY ("employee_name") REFERENCES "Employees"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier_invoices" ADD CONSTRAINT "Supplier_invoices_supplier_nit_fkey" FOREIGN KEY ("supplier_nit") REFERENCES "Supplier"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_content_supplier" ADD CONSTRAINT "Invoice_content_supplier_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "Supplier_invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_content_supplier" ADD CONSTRAINT "Invoice_content_supplier_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_supplier_nit_fkey" FOREIGN KEY ("supplier_nit") REFERENCES "Supplier"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_employees_identification_card_fkey" FOREIGN KEY ("employees_identification_card") REFERENCES "Employees"("identification_card") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_invoice" ADD CONSTRAINT "Customer_invoice_branch_store_id_fkey" FOREIGN KEY ("branch_store_id") REFERENCES "BranchStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_invoice" ADD CONSTRAINT "Customer_invoice_employee_name_fkey" FOREIGN KEY ("employee_name") REFERENCES "Employees"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_invoice" ADD CONSTRAINT "Customer_invoice_customer_identification_card_fkey" FOREIGN KEY ("customer_identification_card") REFERENCES "Customers"("identification_card") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_content_customer" ADD CONSTRAINT "Invoice_content_customer_customer_invoice_id_fkey" FOREIGN KEY ("customer_invoice_id") REFERENCES "Customer_invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_content_customer" ADD CONSTRAINT "Invoice_content_customer_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProducts" ADD CONSTRAINT "_CategoryToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProducts" ADD CONSTRAINT "_CategoryToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
