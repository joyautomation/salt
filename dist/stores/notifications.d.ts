/// <reference types="svelte" />
export interface NotificationInput {
    type: string;
    message: string;
}
export interface Notification {
    id: string;
    type: string;
    message: string;
}
export declare const notifications: import("svelte/store").Writable<Notification[]>;
export declare function addNotification(notification: NotificationInput): void;
