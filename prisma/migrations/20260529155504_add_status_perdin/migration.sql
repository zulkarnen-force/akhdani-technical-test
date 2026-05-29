/*
  Warnings:

  - The `status` column on the `perdin_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PerdinStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "perdin_requests" DROP COLUMN "status",
ADD COLUMN     "status" "PerdinStatus" NOT NULL DEFAULT 'PENDING';
