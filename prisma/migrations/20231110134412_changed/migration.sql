/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `User_Tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_uid]` on the table `User_Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User_Tokens" ALTER COLUMN "expiresAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Tokens_token_key" ON "User_Tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_Tokens_user_uid_key" ON "User_Tokens"("user_uid");
