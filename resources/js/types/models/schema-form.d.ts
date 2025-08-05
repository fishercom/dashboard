import type { CustomField } from './custom-field';

export type SchemaForm = {
    id: number,
    parent_id: number,
    group_id: number,
    name: string,
    fields: CustomField[],
    iterations: number,
    type: string,
    active: boolean,
}
