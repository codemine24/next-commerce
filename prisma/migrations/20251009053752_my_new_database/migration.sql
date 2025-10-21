/*
  Warnings:

  - You are about to drop the column `code` on the `brands` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."BannerType" AS ENUM ('BANNER', 'SLIDER');

-- DropForeignKey
ALTER TABLE "public"."attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- DropIndex
DROP INDEX "public"."brands_code_key";

-- AlterTable
ALTER TABLE "public"."brands" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "is_hot_deal" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."app_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "secondary_logo" TEXT,
    "title" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,
    "secondary_color" TEXT,

    CONSTRAINT "app_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."banners" (
    "id" TEXT NOT NULL,
    "type" "public"."BannerType" NOT NULL DEFAULT 'BANNER',
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT,
    "sub_title" TEXT,
    "button_text" TEXT,
    "url" TEXT,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."news_letters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_letters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."news_letter_otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expires_at" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_letter_otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_letter_otp_otp_key" ON "public"."news_letter_otp"("otp");

-- AddForeignKey
ALTER TABLE "public"."attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."product_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
