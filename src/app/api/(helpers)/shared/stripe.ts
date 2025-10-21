import Stripe from "stripe";

import { CONFIG } from "../config";

export const stripe = new Stripe(CONFIG.stripe_secret_key!, {
  apiVersion: "2025-09-30.clover",
  appInfo: {
    name: CONFIG.app_name,
  },
});
