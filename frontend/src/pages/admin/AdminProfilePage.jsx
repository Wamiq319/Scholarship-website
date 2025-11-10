import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResource } from "@/redux/slices/resourcesSLice";
import { Button, FormModal } from "@/components";

export const AdminProfilePage = () => {
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { data = storedUser } = useSelector((state) => state.auth || {});

  const initialData = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const result = await dispatch(
      updateResource({ resource: "users", id: data._id, body })
    );

    if (result.payload?.success) {
      const updatedUser = result.payload.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setIsSubmitting(false);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Update Admin Profile
      </h2>

      <FormModal
        initialData={initialData}
        fields={fields}
        onSubmit={handleSubmit}
        formId="admin-profile-form"
      >
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            variant="filled"
            color="blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </FormModal>
    </div>
  );
};
