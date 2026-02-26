/*
  Warnings:

  - You are about to drop the column `preferredDate` on the `leads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "leads" DROP COLUMN "preferredDate",
ADD COLUMN     "concerns" TEXT,
ADD COLUMN     "hairLossStage" TEXT,
ADD COLUMN     "hairProblems" TEXT,
ADD COLUMN     "isWhatsapp" TEXT,
ADD COLUMN     "tryingDuration" TEXT,
ADD COLUMN     "whatsappNumber" TEXT,
ADD COLUMN     "womansAgeBracket" TEXT;
