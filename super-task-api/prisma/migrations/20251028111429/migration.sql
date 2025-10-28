/*
  Warnings:

  - You are about to drop the column `candidate_id` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidateId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_job_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_company_id_fkey";

-- DropIndex
DROP INDEX "public"."Application_candidate_id_idx";

-- DropIndex
DROP INDEX "public"."Application_job_id_idx";

-- DropIndex
DROP INDEX "public"."Job_title_company_id_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "candidate_id",
DROP COLUMN "job_id",
DROP COLUMN "status",
ADD COLUMN     "candidateId" TEXT NOT NULL,
ADD COLUMN     "jobId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "company_id",
ADD COLUMN     "companyId" TEXT;

-- DropEnum
DROP TYPE "public"."ApplicationStatus";

-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE INDEX "Application_candidateId_idx" ON "Application"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_companyId_key" ON "Job"("companyId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
