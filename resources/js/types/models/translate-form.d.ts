export interface TranslateForm {
    id: number,
    alias: string,
    input_type: number,
    metadata: { iso: string, value: string }[],
}
