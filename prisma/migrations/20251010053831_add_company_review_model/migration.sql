-- CreateTable
CREATE TABLE "public"."company_reviews" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "designation" TEXT,
    "comment" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("id")
);
