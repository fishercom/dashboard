export interface CmsConfig {
    id: number;
    type: string;
    name: string;
    alias: string;
    value?: string;
    created_at: string;
    updated_at: string;
}

export interface CmsConfigForm {
    id?: number;
    type: string;
    name: string;
    alias: string;
    value: string;
}
