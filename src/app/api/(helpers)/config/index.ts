export const CONFIG = {
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
  supabase_bucket_url: process.env.SUPABASE_BUCKET_URL,
  supabase_service_role_key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  user_bucket: process.env.USER_BUCKET,
};