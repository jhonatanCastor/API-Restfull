/*
  Warnings:

  - The required column `code` was added to the `Orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "code" TEXT NOT NULL;
