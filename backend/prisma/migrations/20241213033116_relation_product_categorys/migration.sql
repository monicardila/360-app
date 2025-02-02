/*
  Warnings:

  - You are about to drop the `_CategoryToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProducts" DROP CONSTRAINT "_CategoryToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProducts" DROP CONSTRAINT "_CategoryToProducts_B_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "category_name" TEXT NOT NULL DEFAULT 'Sin categoria';

-- DropTable
DROP TABLE "_CategoryToProducts";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
