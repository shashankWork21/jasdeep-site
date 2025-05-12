/*
  Warnings:

  - You are about to drop the `SlotLength` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `slotLength` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SlotLength" DROP CONSTRAINT "SlotLength_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "slotLength" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SlotLength";
