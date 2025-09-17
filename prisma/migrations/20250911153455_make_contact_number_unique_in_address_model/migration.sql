/*
  Warnings:

  - A unique constraint covering the columns `[contact_number]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_contact_number_key" ON "public"."addresses"("contact_number");
