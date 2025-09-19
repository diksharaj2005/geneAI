/*
  Warnings:

  - You are about to drop the column `industryId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_industryId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "industryId",
ADD COLUMN     "industry" TEXT;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "public"."IndustryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE;
