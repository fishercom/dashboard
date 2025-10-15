import { AdmAction } from './adm-action';

export interface AdmEvent {
    id: number;
    module_id: number;
    action_id: number;
    created_at: string;
    updated_at: string;
    action: AdmAction;
}
