import type { CustomField } from './custom-field';

export interface Schema {
    id: number,
    parent_id: number,
    group_id: number,
    name: string,
    fields: CustomField[],
    iterations: number,
    type: string,
    active: boolean,
    updated_at: Date,
    created_at: Date
}
