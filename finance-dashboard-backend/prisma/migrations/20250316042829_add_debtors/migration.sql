/*
  Warnings:

  - The primary key for the `Debtor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Debtor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Debtor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debtor" DROP CONSTRAINT "Debtor_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Debtor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Debtor_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Debtor_email_key" ON "Debtor"("email");

-- AddForeignKey
ALTER TABLE "Debtor" ADD CONSTRAINT "Debtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
