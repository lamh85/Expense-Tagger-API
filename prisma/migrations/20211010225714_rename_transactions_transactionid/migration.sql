/*
  Warnings:

  - You are about to drop the column `transactionId` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_id,bank]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "transaction_transactionId_bank_key";

-- DropIndex
DROP INDEX "transaction_transactionId_key";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "transactionId",
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transaction_id_key" ON "transaction"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transaction_id_bank_key" ON "transaction"("transaction_id", "bank");
