/*
  Warnings:

  - The values [REMOTE] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobType_new" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');
ALTER TABLE "public"."Job" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "type" TYPE "JobType_new" USING ("type"::text::"JobType_new");
ALTER TYPE "JobType" RENAME TO "JobType_old";
ALTER TYPE "JobType_new" RENAME TO "JobType";
DROP TYPE "public"."JobType_old";
ALTER TABLE "Job" ALTER COLUMN "type" SET DEFAULT 'FULL_TIME';
COMMIT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isRemote" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_phone_key" ON "Candidate"("phone");
