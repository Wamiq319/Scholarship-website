import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "filled", // "filled" | "outlined"
  color = "blue", // "blue" | "gold" | "white"
  rounded = true,
  className = "",
  disabled = false,
  isLoading = false,
  icon,
}) => {
  const baseStyles =
    "px-6 py-2.5 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 flex items-center justify-center gap-2";

  const shape = rounded ? "rounded-full" : "rounded-md";

  const variants = {
    filled: {
      blue: "bg-gradient-to-r from-[#185D86] to-[#12254D] text-white hover:opacity-90 focus:ring-blue-500",
      gold: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
      white:
        "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-400",
    },
    outlined: {
      blue: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      gold: "bg-transparent text-yellow-600 border border-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400",
      white:
        "bg-transparent text-white border border-white hover:bg-white hover:text-blue-700 focus:ring-white",
    },
  };

  const classes = clsx(
    baseStyles,
    shape,
    variants[variant][color],
    className,
    (disabled || isLoading) && "opacity-60 cursor-not-allowed"
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
