export interface User {
    username: string;
    email: string;
    id: string;
    password: string; // Only used as DTO. Not fetched from the database
    lastActive: string;
    phone: string;
}