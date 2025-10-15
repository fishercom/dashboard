import { CustomField } from './custom-field';
import { CmsSchemaGroup } from './cms-schema-group';

export interface CmsSchema {
    id: number;
    parent_id?: number;
    group_id: number;
    name: string;
    fields: CustomField[];
    iterations?: number;
    type?: 'PAGE' | 'HOME' | 'OPTIONS';
    position?: number;
    active?: boolean;
    created_at: string;
    updated_at: string;
    group: CmsSchemaGroup;
    parent?: CmsSchema;
    children?: CmsSchema[];
}

export interface CmsSchemaForm {
    id?: number | null;
    parent_id?: number | null;
    group_id: number;
    name: string;
    fields: CustomField[];
    iterations: number;
    type: 'PAGE' | 'HOME' | 'OPTIONS';
    active: boolean;
}
