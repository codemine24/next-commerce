export interface Attribute {
    id: string;
    name: string;
    value: string[];
    type: "SINGLE" | "MULTIPLE";
    category: { id: string; title: string } | null;
    category_id: string | null;
    created_at: string;
    updated_at: string;
}