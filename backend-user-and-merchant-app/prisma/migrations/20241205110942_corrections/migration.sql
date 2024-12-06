-- DropIndex
DROP INDEX "Order_merchantId_key";

-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "Rider" ADD CONSTRAINT "Rider_pkey" PRIMARY KEY ("id");
