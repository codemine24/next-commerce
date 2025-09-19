const CONFIG = {
    bucket_url: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL ?? "",
    general_bucket: process.env.NEXT_PUBLIC_GENERAL_BUCKET ?? "",
    user_bucket: process.env.NEXT_PUBLIC_USER_BUCKET ?? "",
    base_url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
    node_env: process.env.NEXT_PUBLIC_NODE_ENV ?? "development",
};

export default CONFIG;