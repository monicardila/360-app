/*
  Warnings:

  - The values [CASH,CREDIT_CARD,TRANSFER,OTHER] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('EFECTIVO', 'TARJETA_CREDITO', 'TRANSFERENCIA', 'OTRA');
ALTER TABLE "Customer_invoice" ALTER COLUMN "payment_method" DROP DEFAULT;
ALTER TABLE "Supplier_invoices" ALTER COLUMN "payment_method" DROP DEFAULT;
ALTER TABLE "Supplier_invoices" ALTER COLUMN "payment_method" TYPE "PaymentMethod_new" USING ("payment_method"::text::"PaymentMethod_new");
ALTER TABLE "Customer_invoice" ALTER COLUMN "payment_method" TYPE "PaymentMethod_new" USING ("payment_method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
ALTER TABLE "Customer_invoice" ALTER COLUMN "payment_method" SET DEFAULT 'EFECTIVO';
ALTER TABLE "Supplier_invoices" ALTER COLUMN "payment_method" SET DEFAULT 'EFECTIVO';
COMMIT;

-- AlterTable
ALTER TABLE "Customer_invoice" ALTER COLUMN "payment_method" SET DEFAULT 'EFECTIVO';

-- AlterTable
ALTER TABLE "Supplier_invoices" ALTER COLUMN "payment_method" SET DEFAULT 'EFECTIVO';
