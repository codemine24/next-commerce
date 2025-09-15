-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('CASH_ON_DELIVERY', 'ONLINE_PAYMENT');

-- CreateEnum
CREATE TYPE "public"."PaymentGateway" AS ENUM ('STRIPE', 'BANK', 'CASH');

-- CreateEnum
CREATE TYPE "public"."DeliveryMethod" AS ENUM ('STORE_PICKUP', 'HOME_DELIVERY');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('DUE', 'PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."DiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- CreateEnum
CREATE TYPE "public"."BeneficiaryType" AS ENUM ('NEW_USER', 'EXISTING_USER', 'ALL');

-- CreateEnum
CREATE TYPE "public"."ProductMetaType" AS ENUM ('WARRANTY', 'TAG');

-- CreateEnum
CREATE TYPE "public"."AttributeType" AS ENUM ('SINGLE', 'MULTIPLE');

-- CreateEnum
CREATE TYPE "public"."CampaignPlatform" AS ENUM ('ONLINE', 'OFFLINE', 'ALL');

-- CreateEnum
CREATE TYPE "public"."CampaignStatus" AS ENUM ('ACTIVE', 'UPCOMING', 'CLOSED');

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "campaignId" TEXT;

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "user_id" TEXT,
    "address_id" TEXT NOT NULL,
    "payment_type" "public"."PaymentType" NOT NULL DEFAULT 'CASH_ON_DELIVERY',
    "delivery_method" "public"."DeliveryMethod" NOT NULL DEFAULT 'HOME_DELIVERY',
    "order_status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "payment_status" "public"."PaymentStatus" NOT NULL DEFAULT 'DUE',
    "delivery_charge" INTEGER NOT NULL,
    "discount_amount" INTEGER NOT NULL DEFAULT 0,
    "sub_amount" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "percentage_of_tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coupon_id" TEXT,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "order_id" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gateway" "public"."PaymentGateway" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transaction_id" TEXT,
    "paid_at" TIMESTAMP(3),
    "error_message" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refunds" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "paid_amount" DOUBLE PRECISION NOT NULL,
    "refund_amount" DOUBLE PRECISION NOT NULL,
    "penalty_charge" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reason" TEXT,
    "refunded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount_type" "public"."DiscountType" NOT NULL DEFAULT 'AMOUNT',
    "discount_value" DOUBLE PRECISION NOT NULL,
    "maximum_value" DOUBLE PRECISION,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "usage_limit" INTEGER,
    "per_user_limit" INTEGER,
    "min_order_amount" DOUBLE PRECISION,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "beneficiary_type" "public"."BeneficiaryType" NOT NULL DEFAULT 'ALL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."couriers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "contact_number" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipped_info" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "courier_id" TEXT NOT NULL,
    "tracking_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipped_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_otp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "contact_number" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expires_at" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_attributes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT[],
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_meta" (
    "id" TEXT NOT NULL,
    "type" "public"."ProductMetaType" NOT NULL DEFAULT 'TAG',
    "value" TEXT NOT NULL,

    CONSTRAINT "product_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."menus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."menu_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,
    "category_id" TEXT,
    "brand_id" TEXT,
    "position" INTEGER NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wishlists" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaigns" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT,
    "description" TEXT,
    "thumbnail" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "platform" "public"."CampaignPlatform" NOT NULL DEFAULT 'ALL',
    "conditions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "note" TEXT,
    "status" "public"."CampaignStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."qna" (
    "id" TEXT NOT NULL,
    "inquirer_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_EligibleBrandsCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleBrandsCoupon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_EligibleCampaignBrands" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleCampaignBrands_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_EligibleCategoriesCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleCategoriesCoupon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_EligibleProductsCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleProductsCoupon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_EligibleCampaignCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleCampaignCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_EligibleCampaignProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EligibleCampaignProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_id_key" ON "public"."orders"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_histories_order_id_status_key" ON "public"."order_histories"("order_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "public"."payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "refunds_order_id_key" ON "public"."refunds"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "public"."Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "shipped_info_order_id_key" ON "public"."shipped_info"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_otp_otp_key" ON "public"."user_otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "product_meta_type_value_key" ON "public"."product_meta"("type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "menus_name_key" ON "public"."menus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_slug_key" ON "public"."menu_items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_user_id_product_id_key" ON "public"."wishlists"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_title_key" ON "public"."campaigns"("title");

-- CreateIndex
CREATE INDEX "_EligibleBrandsCoupon_B_index" ON "public"."_EligibleBrandsCoupon"("B");

-- CreateIndex
CREATE INDEX "_EligibleCampaignBrands_B_index" ON "public"."_EligibleCampaignBrands"("B");

-- CreateIndex
CREATE INDEX "_EligibleCategoriesCoupon_B_index" ON "public"."_EligibleCategoriesCoupon"("B");

-- CreateIndex
CREATE INDEX "_EligibleProductsCoupon_B_index" ON "public"."_EligibleProductsCoupon"("B");

-- CreateIndex
CREATE INDEX "_EligibleCampaignCategories_B_index" ON "public"."_EligibleCampaignCategories"("B");

-- CreateIndex
CREATE INDEX "_EligibleCampaignProducts_B_index" ON "public"."_EligibleCampaignProducts"("B");

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_histories" ADD CONSTRAINT "order_histories_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_histories" ADD CONSTRAINT "order_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refunds" ADD CONSTRAINT "refunds_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipped_info" ADD CONSTRAINT "shipped_info_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipped_info" ADD CONSTRAINT "shipped_info_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "public"."couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_attributes" ADD CONSTRAINT "product_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."qna" ADD CONSTRAINT "qna_inquirer_id_fkey" FOREIGN KEY ("inquirer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleBrandsCoupon" ADD CONSTRAINT "_EligibleBrandsCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleBrandsCoupon" ADD CONSTRAINT "_EligibleBrandsCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignBrands" ADD CONSTRAINT "_EligibleCampaignBrands_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignBrands" ADD CONSTRAINT "_EligibleCampaignBrands_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCategoriesCoupon" ADD CONSTRAINT "_EligibleCategoriesCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCategoriesCoupon" ADD CONSTRAINT "_EligibleCategoriesCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleProductsCoupon" ADD CONSTRAINT "_EligibleProductsCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleProductsCoupon" ADD CONSTRAINT "_EligibleProductsCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignCategories" ADD CONSTRAINT "_EligibleCampaignCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignCategories" ADD CONSTRAINT "_EligibleCampaignCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignProducts" ADD CONSTRAINT "_EligibleCampaignProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EligibleCampaignProducts" ADD CONSTRAINT "_EligibleCampaignProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
