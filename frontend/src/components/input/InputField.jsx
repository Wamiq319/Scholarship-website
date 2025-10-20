import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useSelector } from "react-redux";

const defaultLangState = { lang: "en", words: { ui: {} } };

const InputField = ({
  required = true,
  label,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
  rows = 6,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { lang, words } = useSelector((state) => state.lang) || defaultLangState;

  const inputClasses = `
    w-full p-3 border-b-2 border-[#185D86] rounded-md
    focus:outline-dashed focus:outline-2 focus:outline-[#185D86] 
    transition-all duration-200 bg-white text-[#12254D] placeholder-[#8CA6B8]
    focus:bg-[#E5F3FB]
  `;

  const getInputType = () =>
    type === "password" && showPassword ? "text" : type;

  const eyePosition = lang === "ar" ? "left-0 pl-3" : "right-0 pr-3";

  return (
    <div className={`w-full mb-4 ${className}`}>
      <label className="block text-sm font-bold mb-2 text-[#12254D]">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <div className="relative">
          <input
            type={getInputType()}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={inputClasses}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 flex items-center ${eyePosition} pr-3`}
              aria-label={
                showPassword
                  ? words?.ui?.hide_password || "Hide password"
                  : words?.ui?.show_password || "Show password"
              }
            >
              {showPassword ? (
                <HiEyeOff size={20} className="text-[#185D86]" />
              ) : (
                <HiEye size={20} className="text-[#185D86]" />
              )}
            </button>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
