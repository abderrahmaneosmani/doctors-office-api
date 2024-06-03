/*
  Warnings:

  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "password";
