import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConfirmationModal,
  DataTable,
  Modal,
  FormModal,
} from "@/components";
import {
  fetchResources,
  deleteResource,
  createScholarship,
} from "@/redux/slices/resourcesSLice";

const scholarshipFields = [
  {
    label: "Title",
    name: "title",
    placeholder: "Enter scholarship title",
    required: true,
  },
  {
    label: "Amount",
    name: "amount",
    placeholder: "Enter scholarship amount",
    type: "number",
    required: true,
  },
  {
    label: "Deadline",
    name: "deadline",
    type: "date",
    required: true,
  },
  {
    label: "Category",
    name: "category",
    type: "dropdown",
    options: [
      { label: "Need-based", value: "Need-based" },
      { label: "Merit-based", value: "Merit-based" },
      { label: "Special", value: "Special" },
      { label: "Other", value: "Other" },
    ],
    defaultValue: "Other",
    required: true,
  },
      {
        label: "Description",
        name: "description",
        placeholder: "Enter scholarship description",
        type: "textarea",
        rows: 3,
        required: true,
        className: "md:col-span-2",
      },
      {
        label: "Eligibility Criteria",
        name: "eligibilityCriteria",
        placeholder: "Enter eligibility details",
        type: "textarea",
        rows: 3,
        required: true,
        className: "md:col-span-2",
      },];

export const ScholarManagementPage = () => {
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.resources);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const formId = "scholarship-form";

  useEffect(() => {
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && isFormOpen) {
      setIsFormOpen(false);
    }
  }, [status]);

  //  DELETE Scholarship
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(
        deleteResource({ resource: "scholarships", id: deleteId })
      );
      setDeleteId(null);
      setIsConfirmOpen(false);
    }
  };

  const handleCreateScholarship = (formData) => {
    dispatch(createScholarship(formData));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mt-10 md:mt-0 items-center">
        <h1 className="text-xl font-bold ">Scholarship Management</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
        </Button>
      </div>

      {/* Loading/Error UI */}
      {status === "loading" && !data.scholarships?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading scholarships...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Scholarships"
          tableHeader={[
            { label: "Title", key: "title" },
            { label: "Amount (PKR)", key: "amount" },
            { label: "Deadline", key: "deadline" },
            { label: "Category", key: "category" },
            { label: "Active", key: "isActive" },
          ]}
          tableData={data.scholarships || []}
          buttons={[
            {
              icon: <FaTrash />,
              className: "bg-red-500 hover:bg-red-600 text-white",
              onClick: (row) => handleDelete(row._id),
            },
          ]}
        />
      )}

      {/* Scholarship Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        headerTitle="Create Scholarship"
        size="lg"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText="Create"
        showPrimaryActionButton={true}
        showSecondaryActionButton={true}
      >
        <FormModal
          formId={formId}
          fields={scholarshipFields}
          onSubmit={handleCreateScholarship}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this scholarship?"
      />
    </div>
  );
};

