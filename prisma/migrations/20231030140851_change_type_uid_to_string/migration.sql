/*
  Warnings:

  - The primary key for the `Shopping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vendas` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_authorId_fkey";

-- AlterTable
ALTER TABLE "Shopping" DROP CONSTRAINT "Shopping_pkey",
ALTER COLUMN "uid" DROP DEFAULT,
ALTER COLUMN "uid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shopping_pkey" PRIMARY KEY ("uid");
DROP SEQUENCE "Shopping_uid_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "uid" DROP DEFAULT,
ALTER COLUMN "uid" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");
DROP SEQUENCE "User_uid_seq";

-- AlterTable
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_pkey",
ALTER COLUMN "uid" DROP DEFAULT,
ALTER COLUMN "uid" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vendas_pkey" PRIMARY KEY ("uid");
DROP SEQUENCE "Vendas_uid_seq";

-- AddForeignKey
ALTER TABLE "Vendas" ADD CONSTRAINT "Vendas_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
