export interface CmsParameterGroup {
    id: number;
    name: string;
    alias: string;
    children?: boolean;
    active?: boolean;
    created_at: string;
    updated_at: string;
}
