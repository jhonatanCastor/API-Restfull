-- CreateTable
CREATE TABLE "User_Tokens" (
    "uid" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "useruId" TEXT NOT NULL,

    CONSTRAINT "User_Tokens_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Tokens_uid_key" ON "User_Tokens"("uid");

-- AddForeignKey
ALTER TABLE "User_Tokens" ADD CONSTRAINT "User_Tokens_useruId_fkey" FOREIGN KEY ("useruId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;
