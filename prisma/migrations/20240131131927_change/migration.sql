/*
  Warnings:

  - Added the required column `customer_uid` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "customer_uid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_uid_fkey" FOREIGN KEY ("customer_uid") REFERENCES "Customers"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;
