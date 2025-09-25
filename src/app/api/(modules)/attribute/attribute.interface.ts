import { AttributeType } from "@prisma/client";

export interface AttributeValue {
  title: string;
  position: number;
}

export interface AttributePayload {
  name: string;
  type: AttributeType;
  attribute_values: AttributeValue[];
}
