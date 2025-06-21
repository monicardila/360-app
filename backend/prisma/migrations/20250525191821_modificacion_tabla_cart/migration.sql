/*
  Warnings:

  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "userId",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
