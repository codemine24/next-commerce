-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('OFFLINE', 'FACEBOOK', 'x', 'GOOGLE', 'YOUTUBE', 'INSTAGRAM', 'LINKEDIN');

-- AlterTable
ALTER TABLE "public"."company_reviews" ADD COLUMN     "platform" "public"."Platform" NOT NULL DEFAULT 'OFFLINE';
