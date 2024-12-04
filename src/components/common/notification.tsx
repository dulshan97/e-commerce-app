import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Heart,
    Check,
    Info,
    AlertCircle,
    XCircle
} from "lucide-react";

// Exported type for use in the hook
export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'cart' | 'favorite';

// Exported interface for use in the hook
export interface NotificationProps {
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose?: () => void;
}

// Notification styles remain the same
export const notificationStyles: Record<NotificationType, {
    icon: React.ElementType,
    bgColor: string,
    textColor: string
}> = {
    success: {
        icon: Check,
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-500',
        textColor: 'text-white'
    },
    warning: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-500',
        textColor: 'text-black'
    },
    cart: {
        icon: ShoppingCart,
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    },
    favorite: {
        icon: Heart,
        bgColor: 'bg-pink-500',
        textColor: 'text-white'
    }
};

const AnimatedNotification: React.FC<NotificationProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const { icon: Icon, bgColor, textColor } = notificationStyles[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        y: 50,
                        scale: 0.8,
                        transition: { duration: 0.3 }
                    }}
                    className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 ${bgColor} ${textColor}`}
                >
                    <Icon className="w-5 h-5" />
                    <span>{message}</span>
                    <Check className="w-5 h-5 ml-2" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedNotification;