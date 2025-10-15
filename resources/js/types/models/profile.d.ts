export interface Profile {
    id: number;
    name: string;
    active?: boolean;
    sa?: boolean;
    permissions?: [];
    created_at: string;
    updated_at: string;
}
