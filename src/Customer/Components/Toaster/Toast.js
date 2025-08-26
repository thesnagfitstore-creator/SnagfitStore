import React, { useEffect } from "react";
import "../../Styles/Toast.css";

const Toast = ({ type, message, onClose }) => {
    // Auto close after 3s
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">
                {type === "success" && "✅"}
                {type === "error" && "❌"}
                {type === "warning" && "⚠️"}
            </span>
            <span className="toast-message">{message}</span>
        </div>
    );
};

export default Toast;
