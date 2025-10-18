import React from "react";
import Button from "@/components/ui/Button";

export const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {title}
            </h2>

            <Button
              onClick={onClose}
              variant="outline"
              color="gray"
              className="text-2xl w-10 h-10 flex items-center justify-center p-0 rounded-full"
            >
              &times;
            </Button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};
