import { useState } from "react";
import AnimatedNotification, { NotificationProps } from "../components/common/notification";


export const useNotification = () => {
    const [notification, setNotification] = useState<NotificationProps | null>(null);

    const showNotification = (props: NotificationProps) => {
        setNotification(props);
    };

    const clearNotification = () => {
        setNotification(null);
    };

    const NotificationComponent = notification ? (
        <AnimatedNotification
            {...notification}
            onClose={clearNotification}
        />
    ) : null;

    return {
        showNotification,
        clearNotification,
        NotificationComponent
    };
};