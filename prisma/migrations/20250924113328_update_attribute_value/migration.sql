-- DropForeignKey
ALTER TABLE "public"."attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."product_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
