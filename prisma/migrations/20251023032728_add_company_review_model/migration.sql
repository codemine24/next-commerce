-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('OFFLINE', 'FACEBOOK', 'x', 'GOOGLE', 'YOUTUBE', 'INSTAGRAM', 'LINKEDIN');

-- AlterTable
ALTER TABLE "public"."app_info" ADD COLUMN     "favicon" TEXT;

-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "is_banner_product" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."company_reviews" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "designation" TEXT,
    "comment" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "platform" "public"."Platform" NOT NULL DEFAULT 'OFFLINE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("id")
);
