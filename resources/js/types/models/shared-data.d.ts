import type { Config } from 'ziggy-js';
import type { Auth } from './auth';

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}
