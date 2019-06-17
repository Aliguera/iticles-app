export interface Article {
    id?: string;
    title: string;
    body: string;
    created_at?: number;
    picture_path: string;
    subject: string;
    userID?: string;
}
