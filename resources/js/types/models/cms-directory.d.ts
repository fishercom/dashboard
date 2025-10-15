import { CmsFileType } from './cms-filetype';

export interface CmsDirectory {
    id: number;
    type_id: number;
    name: string;
    alias: string;
    path: string;
    active?: boolean;
    created_at: string;
    updated_at: string;
    type: CmsFileType; // Assuming a relationship
}

export interface CmsDirectoryForm {
    id?: number; // Add id as optional for create, required for edit
    name: string;
    type_id: number;
    alias: string;
    path: string;
    active: boolean;
}
