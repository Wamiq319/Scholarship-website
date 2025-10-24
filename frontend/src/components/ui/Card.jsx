import React, { useState } from "react";
import * as Icons from "lucide-react";
import { formatDate } from "@/utils";
import { Button } from "@/components";

const Card = ({ scholarship, fields, actions }) => {
  const [expanded, setExpanded] = useState(false);

  const getValue = (obj, path) =>
    path.split(".").reduce((acc, part) => acc?.[part], obj);

  const calculateDaysLeft = (deadline) => {
    if (!deadline) return 0;
    return Math.max(
      0,
      Math.ceil(
        (new Date(deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  return (
    <div className="max-w-3xl h-fit relative bg-white rounded-lg p-5 shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="flex justify-between">
        <h3
          className="relative w-fit bg-purple-700 p-4 sm:px-10 pr-8 sm:pr-20 py-4 text-sm md:text-md lg:text-xl font-extrabold text-white"
          style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)" }}
        >
          {scholarship.title}
        </h3>

        {/* Status */}
        <span
          className={`text-sm font-semibold ${
            scholarship.isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {scholarship.isActive ? "Active" : "Closed"}
        </span>
      </div>

      {/* Info List */}
      <ul className="mt-4 ml-2 space-y-2 text-gray-600 text-sm">
        {fields.map(({ key, label, icon }) => {
          const Icon = Icons[icon];
          let value = getValue(scholarship, key);

          if (key === "deadline" && value) value = formatDate(value);
          if (Array.isArray(value)) value = value.join(", ");
          if (value === undefined || value === null) value = "N/A";

          return (
            <li key={key} className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4 text-gray-800" />}
              <span className="font-medium text-black">{label}:</span> {value}
            </li>
          );
        })}
      </ul>

      {/* Description */}
      <div className="relative ml-2 mt-3">
        <p
          className={`text-gray-600 transition-all duration-300 ${
            expanded ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {scholarship.description}
        </p>
        {scholarship.description?.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-yellow-500 mt-1 font-semibold hover:underline"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}
      </div>

      <img className="w-full mt-5" src="/union.svg" alt="" />

      {/* Expires + Buttons */}
      <div className="mt-4 flex items-center justify-between">
        {actions.map((action, index) => {
          if (action.type === "text") {
            let value = getValue(scholarship, action.valueKey);
            if (action.format === "daysLeft") value = calculateDaysLeft(value);
            return (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-blue-600 font-semibold">
                  {action.label}
                </span>
                <span className="text-yellow-500 font-bold">{value} Days</span>
              </div>
            );
          }

          if (action.type === "button") {
            return (
              <Button
                key={index}
                onClick={() => action.onClick(scholarship)}
                variant="filled"
                color="blue"
                rounded
                className="flex items-center space-x-1"
              >
                <span>{action.label}</span> <span>→</span>
              </Button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Card;
