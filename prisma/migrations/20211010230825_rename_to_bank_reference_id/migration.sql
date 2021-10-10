/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bank_reference_id]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bank_reference_id,bank]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bank_reference_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "transaction_transaction_id_bank_key";

-- DropIndex
DROP INDEX "transaction_transaction_id_key";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "transaction_id",
ADD COLUMN     "bank_reference_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "transaction_bank_reference_id_key" ON "transaction"("bank_reference_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_bank_reference_id_bank_key" ON "transaction"("bank_reference_id", "bank");
