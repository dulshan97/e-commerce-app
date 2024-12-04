export interface NotificationProps {
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose?: () => void;
}

export enum NotificationType {

    SUCCESS = 'success',
    WARINING = 'warning',
    CART = 'cart',
    FAVOURITE = 'favorite,'
}