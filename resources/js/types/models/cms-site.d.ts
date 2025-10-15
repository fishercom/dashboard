import { CmsSchemaGroup } from './cms-schema-group';

export interface CmsSite {
    id: number;
    name: string;
    segment?: string;
    site_url: string;
    metadata?: Record<string, unknown>;
    schema_group_id: number;
    default?: boolean;
    active?: boolean;
    created_at: string;
    updated_at: string;
    schema_group: CmsSchemaGroup;
}

export interface CmsSiteForm {
    id?: number;
    name: string;
    segment: string;
    site_url: string;
    metadata: Record<string, unknown>;
    schema_group_id: number;
    default: boolean;
    active: boolean;
}
