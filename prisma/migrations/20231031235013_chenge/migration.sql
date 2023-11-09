/*
  Warnings:

  - You are about to drop the column `authorId` on the `Vendas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_authorId_fkey";

-- AlterTable
ALTER TABLE "Vendas" DROP COLUMN "authorId";
