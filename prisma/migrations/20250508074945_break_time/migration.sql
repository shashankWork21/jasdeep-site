/*
  Warnings:

  - Changed the type of `status` on the `Slot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "breakBetweenSlots" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "status",
ADD COLUMN     "status" "SlotStatus" NOT NULL;
