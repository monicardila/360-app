-- CreateEnum
CREATE TYPE "Type_of_document" AS ENUM ('CC', 'CE', 'TI', 'NIT');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "employee_id" INTEGER;

-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "type_of_document" "Type_of_document" NOT NULL DEFAULT 'CC';

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
