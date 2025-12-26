import React, { useEffect } from "react";

const Toast = ({ message, type = "info", duration = 1500, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed top-20 right-5 z-50 px-4 py-3 rounded-sm text-white shadow-lg ${getBgColor()} animate-slide-in`}
    >
      {message}
    </div>
  );
};

export default Toast;
