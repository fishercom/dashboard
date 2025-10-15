import { CmsForm } from './cms-form';
import { User } from './user';

export interface CmsNotify {
    id: number;
    form_id: number;
    user_id: number;
    recipients?: string;
    active?: boolean;
    created_at: string;
    updated_at: string;
    form: CmsForm;
    user: User;
}

export interface CmsNotifyForm {
    id?: number;
    form_id: number;
    user_id: number;
    recipients: string;
    active: boolean;
}
