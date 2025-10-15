// import type { CustomField } from './custom-field';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue }
type JsonArray = JsonValue[];
type FormDataConvertible = string | number | boolean | null | File | Blob | Date | FormDataConvertible[] | { [key: string]: FormDataConvertible };

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

export interface ArticleForm {
    id: number | null;
    parent_id: number | null;
    schema_id: number;
    lang_id: number;
    title: string;
    metadata: { [key: string]: FormDataConvertible };
    slug: string;
    active: boolean;
}