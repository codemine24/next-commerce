/*
  Warnings:

  - You are about to drop the column `code` on the `categories` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."categories_code_key";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "code";
