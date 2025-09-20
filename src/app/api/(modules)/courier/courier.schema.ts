import z from "zod";

import { commonSchemas } from "../../(helpers)/shared/schema";

// Base schema (everything required unless specified otherwise)
const courierBase = z.object({
  name: z
    .string({
      error: "Courier name should be a text",
    })
    .min(1, "Courier name is required"),
  address: z
    .string({
      error: "Courier address should be a text",
    })
    .optional(),
  email: z.email("Enter a valid email").optional(),
  contact_number: commonSchemas.phoneSchema({
    required: false,
    allowEmpty: false,
  }),
});

// Add courier: name required
const addCourier = z.object({
  body: courierBase.strict(),
});

// Update courier: make all fields optional
const updateCourier = z.object({
  body: courierBase.partial().strict(),
});

export const CourierSchemas = {
  addCourier,
  updateCourier,
};
