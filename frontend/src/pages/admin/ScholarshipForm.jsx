  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { InputField, Dropdown, Button } from "@/components";
import { createScholarship } from "@/redux/slices/resourcesSLice";


 export const ScholarshipForm = ({ onCancel }) => {
    const dispatch = useDispatch();

    const { status, error } = useSelector((state) => state.resources);

    const [formData, setFormData] = useState({
      title: "",
      description: "",
      eligibilityCriteria: "",
      amount: "",
      deadline: "",
      category: "Other",
    });

    const [validationError, setValidationError] = useState("");

    useEffect(() => {
      if (status === "succeeded" && !error) {
        //  form reset
        setFormData({
          title: "",
          description: "",
          eligibilityCriteria: "",
          amount: "",
          deadline: "",
          category: "Other",
        });
  
      }
    }, [status, error, onCancel]);

    // --- Handle Input Change ---
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- Dropdown Change ---
    const handleDropdownChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // --- Submit Form ---
    const handleSubmit = (e) => {
      e.preventDefault();

      const requiredFields = [
        "title",
        "description",
        "eligibilityCriteria",
        "amount",
        "deadline",
        "category",
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          setValidationError(`${field} is required`);
          return;
        }
      }

      setValidationError("");


      //  Dispatch Redux action
      dispatch(createScholarship(formData));
    };

    const categoryOptions = [
      { label: "Need-based", value: "Need-based" },
      { label: "Merit-based", value: "Merit-based" },
      { label: "Special", value: "Special" },
      { label: "Other", value: "Other" },
    ];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter scholarship title"
          />

          <InputField
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter scholarship amount"
            type="number"
          />

          <InputField
            label="Deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            type="date"
          />

          <Dropdown
            label="Category"
            options={categoryOptions}
            selectedValue={formData.category}
            onChange={(val) => handleDropdownChange("category", val)}
          />
          
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter scholarship description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Eligibility Criteria
          </label>
          <textarea
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
            placeholder="Enter eligibility details"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows="3"
          />
        </div>

        {(validationError || error) && (
          <p className="text-red-600 text-sm">
            {validationError || error}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onCancel} variant="outline" color="blue">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="filled"
            color="blue"
          >
            Create
          </Button>
        </div>
      </form>
    );
  };

