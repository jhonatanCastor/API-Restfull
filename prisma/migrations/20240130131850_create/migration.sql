-- CreateTable
CREATE TABLE "Orders" (
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_uid" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Orders_Products" (
    "uid" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orders_uid" TEXT NOT NULL,
    "product_uid" TEXT NOT NULL,

    CONSTRAINT "Orders_Products_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_uid_key" ON "Orders"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_Products_uid_key" ON "Orders_Products"("uid");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_uid_fkey" FOREIGN KEY ("customer_uid") REFERENCES "Customers"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders_Products" ADD CONSTRAINT "Orders_Products_orders_uid_fkey" FOREIGN KEY ("orders_uid") REFERENCES "Orders"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders_Products" ADD CONSTRAINT "Orders_Products_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
