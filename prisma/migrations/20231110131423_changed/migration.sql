/*
  Warnings:

  - You are about to drop the column `useruId` on the `User_Tokens` table. All the data in the column will be lost.
  - The required column `user_uid` was added to the `User_Tokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "User_Tokens" DROP CONSTRAINT "User_Tokens_useruId_fkey";

-- AlterTable
ALTER TABLE "User_Tokens" DROP COLUMN "useruId",
ADD COLUMN     "user_uid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User_Tokens" ADD CONSTRAINT "User_Tokens_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;
