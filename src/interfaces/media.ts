export interface Media {
    id: string;
    user_id: string;
    name: string;
    alt_text: string;
    type: string;
    size: number;
    width: number,
    height: number,
    path: string,
    bucket_id: string,
    bucket_name: string,
    created_at: string,
    updated_at: string,
    uploaded_by: {
        id: string,
        first_name: string,
        last_name: string,
        role: string
    }
}