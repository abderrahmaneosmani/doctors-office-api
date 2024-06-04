/*
  Warnings:

  - A unique constraint covering the columns `[patient_id,doctor_id]` on the table `Appointement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Appointement_patient_id_doctor_id_startDate_key";

-- CreateIndex
CREATE UNIQUE INDEX "Appointement_patient_id_doctor_id_key" ON "Appointement"("patient_id", "doctor_id");
