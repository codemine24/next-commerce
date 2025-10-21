/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `news_letters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "news_letters_email_key" ON "public"."news_letters"("email");
