export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    profile_id: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
