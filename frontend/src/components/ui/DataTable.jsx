import { formatDate } from "@/utils";
import React from "react";
import Button from "@/components/ui/Button";

const DataTable = ({ heading, tableHeader, tableData, buttons = [] }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full overflow-x-auto">
      {heading && (
        <h2 className="text-xl font-bold text-gray-800 mb-4">{heading}</h2>
      )}

      <table className="w-full border-collapse border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {tableHeader.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 border border-gray-200 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            {buttons.length > 0 && (
              <th className="px-4 py-3 border border-gray-200 text-center whitespace-nowrap">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, idx) => (
              <tr
                key={row._id || idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {tableHeader.map((col, i) => {
                  const value = row[col.key];

                  // Boolean indicator
                  if (typeof value === "boolean") {
                    return (
                      <td
                        key={i}
                        className="px-4 py-3 border border-gray-200 whitespace-nowrap"
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            value
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {value ? "Active" : "Inactive"}
                        </span>
                      </td>
                    );
                  }

                  // Date formatting
                  if (typeof value === "string" && value.includes("T")) {
                    return (
                      <td
                        key={i}
                        className="px-4 py-3 border border-gray-200 whitespace-nowrap"
                      >
                        {formatDate(value)}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={i}
                      className="px-4 py-3 border border-gray-200 whitespace-nowrap"
                    >
                      {value ?? "-"}
                    </td>
                  );
                })}

                {buttons.length > 0 && (
                  <td className="px-4 py-3 border border-gray-200 text-center">
                    <div className="flex justify-center gap-2">
                      {buttons.map((btn, idx) => (
                        <Button
                          key={idx}
                          onClick={() => btn.onClick(row)}
                          className={btn.className}
                          color={btn.color || "blue"}
                          variant={btn.variant || "filled"}
                          rounded={btn.rounded ?? true}
                        >
                          {btn.icon && <span>{btn.icon}</span>}
                          {btn.text && <span>{btn.text}</span>}
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeader.length + (buttons.length > 0 ? 1 : 0)}
                className="p-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
