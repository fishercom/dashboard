// import type { CustomField } from './custom-field';

export interface Article {
    id: number,
    parent_id: number,
    schema_id: number,
    lang_id: number,
    title: string,
    subtitle: string,
    subtitle2: string,
    resumen: string,
    description: string,
    description2: string,
    description3: string,
    date: Date | null,
    ref_type: string,
    ref_id: number | null,
    ref_url: string,
    ref_target: string,
    metadata: string,
    in_home: boolean,
    hide_menu: boolean,
    slug: string,
    active: boolean,
    updated_at: Date,
    created_at: Date
}
