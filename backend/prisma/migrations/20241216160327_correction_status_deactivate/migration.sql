/*
  Warnings:

  - You are about to drop the column `is_active` on the `Supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BranchStore" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "is_active",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
