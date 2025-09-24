import React from "react";
import clsx from "clsx"; // optional, if not installed just use template strings

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "filled", // "filled" | "outline"
  color = "green", // "green" | "white"
  rounded = true, // true = pill, false = small rounded
  className = "",
}) => {
  const baseStyles =
    "px-6 py-2.5 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const shape = rounded ? "rounded-full" : "rounded-md";

  const variants = {
    filled: {
      green: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      white:
        "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-400",
    },
    outline: {
      green:
        "bg-transparent text-green-600 border border-green-600 hover:bg-green-50 focus:ring-green-500",
      white:
        "bg-transparent text-white border border-white hover:bg-white hover:text-green-700 focus:ring-white",
    },
  };

  const classes = clsx(baseStyles, shape, variants[variant][color], className);

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
