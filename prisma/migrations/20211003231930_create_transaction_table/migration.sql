-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "date" BIGINT NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL,
    "vendor" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "transaction"("id");
