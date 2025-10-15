export interface CmsLang {
    id: number;
    name: string;
    iso?: string;
    active?: boolean;
    created_at: string;
    updated_at: string;
}

export interface CmsLangForm {
    id?: number;
    name: string;
    iso: string;
    active: boolean;
}
