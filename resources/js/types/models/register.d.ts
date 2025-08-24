export interface Register {
    id: number,
    form_id: number,
    contact_id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    message: string | null,
    acceptance: boolean | null,
    review: boolean | null,
    review_date: Date | null,
    created_at: Date,
    updated_at: Date
}
