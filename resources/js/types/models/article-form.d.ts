// import type { CustomField } from './custom-field';

export type ArticleForm = {
    id: number | null,
    parent_id: number | null,
    schema_id: number,
    lang_id: number,
    title: string,
    metadata: Record<string, unknown>,
    slug: string,
    active: boolean,
}
