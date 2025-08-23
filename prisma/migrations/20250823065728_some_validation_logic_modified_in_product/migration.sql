/*
  Warnings:

  - You are about to drop the column `code` on the `products` table. All the data in the column will be lost.
  - The `key_features` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[product_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."products_code_key";

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "code",
ADD COLUMN     "product_code" TEXT,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "specification" SET DATA TYPE TEXT,
DROP COLUMN "key_features",
ADD COLUMN     "key_features" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "products_product_code_key" ON "public"."products"("product_code");
