import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const addressSearchableFields = [
    "name",
    "email",
    "contact_number",
    "address",
    "city",
    "district",
    "country",
    "postal_code",
];
export const addressSortableFields = [
    "name",
    "email",
    "contact_number",
    "address",
    "city",
    "district",
    "country",
    "postal_code",
    "created_at",
    "updated_at",
];

export const AddressFieldsValidationConfig: Record<string, any> = {
    sort_by: addressSortableFields,
    sort_order: SORT_ORDER_VALUE,
};