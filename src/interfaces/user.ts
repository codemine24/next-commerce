import { UserStatus, UserRole } from "@prisma/client";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    contact_number: string;
    role: UserRole;
    status: UserStatus;
    avatar: string | null;
    created_at: string;
    updated_at: string;
}