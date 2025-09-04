import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "../config";

const supabase = createClient(
  CONFIG.supabase_bucket_url,
  CONFIG.supabase_service_role_key
);

export default supabase;
