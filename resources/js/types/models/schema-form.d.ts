import type { CustomField } from './custom-field';

export type SchemaForm = {
    id: number | null,
    parent_id: number | null,
    group_id: number,
    name: string,
    fields: CustomField[],
    iterations: number,
    type: string,
    active: boolean,
}
