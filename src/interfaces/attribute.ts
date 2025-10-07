export interface AttributeValue {
  id: string;
  title: string;
  position: number;
}

export interface Attribute {
  id: string;
  name: string;
  attribute_values: AttributeValue[];
  type: "SINGLE" | "MULTIPLE";
  category: { id: string; title: string } | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
}
