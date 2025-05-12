/*
  Warnings:

  - You are about to drop the column `slotLength` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "slotLength";

-- CreateTable
CREATE TABLE "SlotLength" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "SlotLength_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SlotLength" ADD CONSTRAINT "SlotLength_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
