/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `User_Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_Tokens_token_key" ON "User_Tokens"("token");
