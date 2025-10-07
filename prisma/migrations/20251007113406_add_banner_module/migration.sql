-- CreateEnum
CREATE TYPE "public"."BannerType" AS ENUM ('BANNER', 'SLIDER');

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
    "button_url" TEXT NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);
