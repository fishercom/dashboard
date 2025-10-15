import { CmsParameterGroup } from './cms-parameter-group';

export interface CmsParameter {
    id: number;
    group_id: number;
    parent_id?: number;
    name: string;
    value?: string;
    metadata?: Record<string, unknown>;
    position: number;
    active?: boolean;
    created_at: string;
    updated_at: string;
    group: CmsParameterGroup;
    parent?: CmsParameter; // Assuming CmsParameterAlias is CmsParameter
    children?: CmsParameter[]; // Assuming CmsParameterAlias is CmsParameter
}

export interface CmsParameterForm {
    id?: number;
    group_id: number;
    parent_id?: number;
    name: string;
    value: string;
    metadata: Record<string, unknown>;
    active: boolean;
}
