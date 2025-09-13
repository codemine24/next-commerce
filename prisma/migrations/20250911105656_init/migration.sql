-- CreateTable
CREATE TABLE "public"."addresses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "secondary_contact_number" TEXT,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "postal_code" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'bangladesh',
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
