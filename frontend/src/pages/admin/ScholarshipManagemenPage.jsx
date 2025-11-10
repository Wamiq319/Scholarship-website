import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
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
  updateResource,
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
      { label: "PEEF", value: "PEEF" },
      { label: "Other", value: "Other" },
    ],
    defaultValue: "Other",
    required: true,
  },
  {
    label: "Scope",
    name: "scope",
    type: "dropdown",
    options: [
      { label: "National", value: "National" },
      { label: "International", value: "International" },
    ],
    required: true,
  },
  {
    label: "Minimum GPA",
    name: "eligibilityCriteria.minGPA",
    placeholder: "Enter minimum GPA (e.g. 3.0)",
    type: "number",
    step: "0.1",
    required: true,
  },
  {
    label: "Maximum Income",
    name: "eligibilityCriteria.maxIncome",
    placeholder: "Enter maximum family income",
    type: "number",
    required: true,
  },
  {
    label: "Eligible Departments",
    name: "eligibilityCriteria.department",
    placeholder: "Enter eligible departments (comma separated)",
    type: "text",
    required: true,
  },
  {
    label: "Eligible Semesters",
    name: "eligibilityCriteria.semester",
    placeholder: "Enter eligible semesters (comma separated)",
    type: "text",
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
];

export const ScholarManagementPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const formId = "scholarship-form";

  useEffect(() => {
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && isFormOpen) {
      setIsFormOpen(false);
      setEditData(null);
    }
  }, [status]);

  //  Delete Scholarship
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

  // Edit Scholarship
  const handleEdit = (scholarship) => {
    setEditData(scholarship);
    setIsFormOpen(true);
  };

  //  Create or Update Scholarship
  const handleCreateScholarship = (formData) => {
    const departments =
      formData["eligibilityCriteria.department"]
        ?.split(",")
        .map((d) => d.trim()) || [];

    const semesters =
      formData["eligibilityCriteria.semester"]
        ?.split(",")
        .map((n) => Number(n.trim())) || [];

    const payload = {
      title: formData.title,
      amount: Number(formData.amount),
      deadline: formData.deadline,
      category: formData.category,
      scope: formData.scope,
      description: formData.description,
      eligibilityCriteria: {
        minGPA: Number(formData["eligibilityCriteria.minGPA"]),
        maxIncome: Number(formData["eligibilityCriteria.maxIncome"]),
        department: departments,
        semester: semesters,
      },
    };

    if (editData) {
      dispatch(
        updateResource({
          resource: "scholarships",
          id: editData._id,
          body: payload,
        })
      ).then(() => {
        dispatch(fetchResources({ resource: "scholarships" }));
      });
    } else {
      dispatch(createScholarship(payload)).then(() => {
        dispatch(fetchResources({ resource: "scholarships" }));
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mt-10 md:mt-0 items-center">
        <h1 className="text-xl font-bold ">Scholarship Management</h1>
        <Button
          onClick={() => {
            setIsFormOpen(true);
            setEditData(null);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add
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
              icon: <FaEdit />,
              className: "bg-yellow-500 hover:bg-yellow-600 text-white",
              onClick: (row) => handleEdit(row),
            },
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
        onClose={() => {
          setIsFormOpen(false);
          setEditData(null);
        }}
        headerTitle={editData ? "Edit Scholarship" : "Create Scholarship"}
        size="lg"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText={editData ? "Update" : "Create"}
        showPrimaryActionButton
        showSecondaryActionButton
      >
        <FormModal
          formId={formId}
          fields={scholarshipFields}
          onSubmit={handleCreateScholarship}
          initialData={
            editData
              ? {
                  ...editData,
                  "eligibilityCriteria.minGPA":
                    editData.eligibilityCriteria?.minGPA,
                  "eligibilityCriteria.maxIncome":
                    editData.eligibilityCriteria?.maxIncome,
                  "eligibilityCriteria.department":
                    editData.eligibilityCriteria?.department?.join(", "),
                  "eligibilityCriteria.semester":
                    editData.eligibilityCriteria?.semester?.join(", "),
                }
              : {}
          }
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this scholarship?"
      />
    </div>
  );
};
