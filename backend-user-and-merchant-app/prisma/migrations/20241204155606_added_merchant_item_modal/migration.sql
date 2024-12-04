-- AlterTable
CREATE SEQUENCE order_merchantid_seq;
ALTER TABLE "Order" ALTER COLUMN "merchantId" SET DEFAULT nextval('order_merchantid_seq');
ALTER SEQUENCE order_merchantid_seq OWNED BY "Order"."merchantId";
