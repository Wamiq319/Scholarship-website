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
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const CommitteeManagementPage = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formId = "create-committee-form";

  const { data, status, error } = useSelector((state) => state.resources);

  const users = useMemo(() => data?.users || [], [data?.users]);

  const evaluations = useMemo(() => data?.evaluations || [], [data?.evaluations]);

  useEffect(() => {
    dispatch(fetchResources({ resource: "users" }));
    dispatch(fetchResources({ resource: "evaluations" }));
  }, [dispatch]);

  // Filter committee members & attach evaluation count
  const committees = useMemo(() => {
    const committeeMembers = users.filter((u) => u.role === "COMMITTEE");

    return committeeMembers.map((member) => {
      const evalCount = evaluations.filter(
        (e) => e.committeeMemberId === member._id
      ).length;

      return { ...member, evaluationCount: evalCount };
    });
  }, [users, evaluations]);


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
    const payload = { ...formData, role: "COMMITTEE" };

    if (status === "loading") return;

    await dispatch(createCommitteeMember(payload));
    setIsFormOpen(false);
  };

  const committeeFields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mt-10 md:mt-0 items-center">
        <h1 className="text-xl font-bold">Committee Management</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add Member
        </Button>
      </div>

      {/* Loading/Error UI */}
      {status === "loading" && !users.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading committee members...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Committee Members"
          tableHeader={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Role", key: "role" },
            { label: "Total Evaluations", key: "evaluationCount" },
          ]}
          tableData={committees || []}
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
        headerTitle="Create Committee Member Account"
        size="md"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText="Create Account"
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
        message="Are you sure you want to delete this committee member?"
      />
    </div>
  );
};
