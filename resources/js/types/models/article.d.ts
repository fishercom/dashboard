// import type { CustomField } from './custom-field';

export interface Article {
    id: number,
    parent_id: number,
    schema_id: number,
    lang_id: number,
    title: string,
    metadata: Record<string, unknown>,
    slug: string,
    active: boolean,
    updated_at: Date,
    created_at: Date
}
