-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "riderId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
