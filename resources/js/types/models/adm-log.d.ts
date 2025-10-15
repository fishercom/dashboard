import { AdmEvent } from './adm-event';
import { User } from './user';

export interface AdmLog {
    id: number;
    event_id: number;
    user_id: number;
    comment?: string;
    created_at: string;
    updated_at: string;
    event: AdmEvent;
    user: User;
}

export interface AdmLogForm {
    id?: number;
    event_id: number;
    user_id: number;
    comment: string;
}
