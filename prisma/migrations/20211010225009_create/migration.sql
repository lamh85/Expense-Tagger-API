-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "date" BIGINT NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL,
    "vendor" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transactionId_key" ON "transaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transactionId_bank_key" ON "transaction"("transactionId", "bank");
