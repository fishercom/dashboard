export interface User {
    id: number;
    profile_id?: number;
    email: string;
    email_verified_at?: string;
    username?: string;
    password?: string; // Password should not be sent to frontend
    name: string;
    lastname?: string;
    metadata?: Record<string, unknown>;
    active?: boolean;
    default?: boolean;
    remember_token?: string;
    created_at: string;
    updated_at: string;
}