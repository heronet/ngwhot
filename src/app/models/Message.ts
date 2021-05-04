export interface Message {
    id: string;
    text: string;
    sendername: string;
    senderId: string;
    recipientname: string;
    recipientId: string;
    createdAt: string;
    displayName: string;
    displayNameActive: boolean;
    userLastActive: string;
}