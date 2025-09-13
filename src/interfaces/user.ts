export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    contact_number: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    status: "ACTIVE" | "INACTIVE" | "BLOCKED";
    avatar: string | null;
    created_at: string;
    updated_at: string;
}