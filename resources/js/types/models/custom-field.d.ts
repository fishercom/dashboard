export interface CustomField {
    key: string;
    label: string;
    type: string;
    value?: string | number | boolean | null;
    fields?: CustomField[];
}
