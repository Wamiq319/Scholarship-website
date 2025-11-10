import React, { useEffect, useState } from "react";
import { InputField, Dropdown } from "@/components/input";

const defaultInitialData = {};

const FormModal = ({
  initialData = defaultInitialData,
  fields = [],
  onSubmit,
  formId,
  children,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const defaultState = {};
    fields.forEach((field) => {
      defaultState[field.name] =
        field.defaultValue || (field.type === "checkbox" ? false : "");
    });
    setFormData({ ...defaultState, ...initialData });
  }, [fields, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (name, index, key, value) => {
    setFormData((prev) => {
      const newTable = [...(prev[name] || [])];
      newTable[index][key] = value;
      return { ...prev, [name]: newTable };
    });
  };

  const handleAddRow = (name, columns) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [
        ...(prev[name] || []),
        Object.fromEntries(columns.map((col) => [col.key, ""])),
      ],
    }));
  };

  const handleRemoveRow = (name, index) => {
    setFormData((prev) => {
      const newTable = [...(prev[name] || [])];
      newTable.splice(index, 1);
      return { ...prev, [name]: newTable };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        setValidationError(`${field.label || field.name} is required.`);
        return;
      }
    }
    setValidationError("");
    onSubmit(formData);
  };

  const renderField = (field) => {
    const { type, ...props } = field;
    const value = formData[props.name] || "";

    switch (type) {
      case "dropdown":
        return (
          <Dropdown
            {...props}
            selectedValue={value}
            onChange={(val) =>
              handleDropdownChange(props.name, val.target.value)
            }
          />
        );

      case "image":
        return (
          <InputField
            {...props}
            type="image"
            value={value}
            onChange={handleChange}
          />
        );

      case "checkbox":
        return (
          <div className="flex mt-6 items-center gap-2 border p-3 rounded-md bg-white">
            <input
              type="checkbox"
              name={props.name}
              checked={!!formData[props.name]}
              onChange={handleChange}
              className="w-5 h-5 accent-[#185D86]"
            />
            <label className="text-[#12254D] font-semibold">
              {props.label}
            </label>
          </div>
        );

      case "table": {
        const rows = formData[props.name] || [];
        return (
          <div className=" border rounded-lg p-3 bg-white shadow-sm">
            <label className="block text-sm font-semibold mb-2 text-[#12254D]">
              {props.label}
            </label>
            <table className="w-full border border-[#185D86] rounded-md text-sm">
              <thead className="bg-[#E5F3FB]">
                <tr>
                  {props.columns.map((col) => (
                    <th
                      key={col.key}
                      className="border p-2 text-left text-[#185D86]"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="border p-2 text-center text-[#185D86]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {props.columns.map((col) => (
                      <td key={col.key} className="border p-2">
                        <input
                          type="text"
                          value={row[col.key] || ""}
                          onChange={(e) =>
                            handleTableChange(
                              props.name,
                              i,
                              col.key,
                              e.target.value
                            )
                          }
                          className="w-full border px-2 py-1 rounded focus:outline-[#185D86]"
                        />
                      </td>
                    ))}
                    <td className="border p-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(props.name, i)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => handleAddRow(props.name, props.columns)}
              className="mt-2 px-3 py-1 bg-[#185D86] text-white text-sm rounded-md hover:bg-[#13496A]"
            >
              + Add Row
            </button>
          </div>
        );
      }

      default:
        return (
          <InputField
            {...props}
            type={type}
            value={value}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          // check if field is a table or textarea
          if (field.type === "table" || field.type === "textarea") {
            return (
              <div key={field.name} className="col-span-1 md:col-span-2 w-full">
                {renderField(field)}
              </div>
            );
          }

          // default case (normal input, dropdown, checkbox, etc.)
          return (
            <div key={field.name} className={field.className || ""}>
              {renderField(field)}
            </div>
          );
        })}
      </div>

      {validationError && (
        <p className="text-red-600 text-sm">{validationError}</p>
      )}
      {children && <div>{children}</div>}
    </form>
  );
};

export default FormModal;
