import {
  Button,
  ConfirmationModal,
  DataTable,
  FormModal,
  Modal,
} from "@/components";
import {
  createCommitteeMember,
  deleteResource,
  fetchResources,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const UserManagementPage = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const formId = "create-committee-form";

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, status, error } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources({ resource: "users" }));
  }, [dispatch]);

  // DELETE user
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(deleteResource({ resource: "users", id: deleteId }));
      setDeleteId(null);
      setIsConfirmOpen(false);
    }
  };

  // handle form submit
  const handleSubmit = async (formData) => {
    const payload = {
      ...formData,
      role: "COMMITTEE",
    };

    if (status === "loading") return;

    await dispatch(createCommitteeMember(payload));
    setIsFormOpen(false);
  };

  const committeeFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mt-10 md:mt-0 items-center">
        <h1 className="text-xl font-bold ">User Management</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
        </Button>
      </div>

      {/* Loading/Error UI */}
      {status === "loading" && !data.users?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading students...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Students"
          tableHeader={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Role", key: "role" },
            { label: "Department", key: "department" },
            { label: "Roll No", key: "rollNo" },
            { label: "Phone", key: "profile.phone" },
            { label: "GPA", key: "profile.gpa" },
            { label: "Family Income", key: "profile.familyIncome" },
          ]}
          tableData={data.users || []}
          buttons={[
            {
              icon: <FaTrash />,
              className: "bg-red-500 hover:bg-red-600 text-white",
              onClick: (row) => handleDelete(row._id),
            },
          ]}
        />
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        headerTitle="Create Scholarship"
        size="md"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText="Create"
        showPrimaryActionButton={true}
        showSecondaryActionButton={true}
      >
        <FormModal
          formId={formId}
          fields={committeeFields}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};
