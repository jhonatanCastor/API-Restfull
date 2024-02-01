/*
  Warnings:

  - You are about to drop the column `customer_uid` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_customer_uid_fkey";

-- DropForeignKey
ALTER TABLE "Orders_Products" DROP CONSTRAINT "Orders_Products_orders_uid_fkey";

-- DropForeignKey
ALTER TABLE "Orders_Products" DROP CONSTRAINT "Orders_Products_product_uid_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "customer_uid";

-- AddForeignKey
ALTER TABLE "Orders_Products" ADD CONSTRAINT "Orders_Products_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders_Products" ADD CONSTRAINT "Orders_Products_orders_uid_fkey" FOREIGN KEY ("orders_uid") REFERENCES "Orders"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;
