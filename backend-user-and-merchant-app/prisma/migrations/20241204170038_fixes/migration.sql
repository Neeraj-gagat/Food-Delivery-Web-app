/*
  Warnings:

  - A unique constraint covering the columns `[merchantId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "merchantId" DROP DEFAULT;
DROP SEQUENCE "order_merchantid_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Order_merchantId_key" ON "Order"("merchantId");
