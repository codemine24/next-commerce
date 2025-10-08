declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    APP_NAME: string;
    APP_EMAIL_ADDRESS: string;
    EMAIL_APP_PASS: string;
    DATABASE_URL: string;
    SALT_ROUNDS: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRESIN: number | StringValue | undefined;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRESIN: number | StringValue | undefined;
    SUPABASE_BUCKET_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    USER_BUCKET: string;
    GENERAL_BUCKET: string;
  }
}
