/*
  Warnings:

  - The `gradYear` column on the `Academic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endDate` column on the `Experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startYear` on the `Academic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startDate` on the `Experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Academic" DROP COLUMN "startYear",
ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL,
DROP COLUMN "gradYear",
ADD COLUMN     "gradYear" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Experience" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "phone" TEXT NOT NULL;
