import { AdmEvent } from './adm-event';

export interface AdmModule {
    id: number;
    menu_id: number;
    name: string;
    title?: string;
    description?: string;
    url: string;
    route: string;
    params?: string;
    icon?: string;
    position: number;
    visible?: boolean;
    created_at: string;
    updated_at: string;
    events: AdmEvent[];
}
