import { ConfirmationModal, DataTable, Modal } from "@/components";
import {
  deleteResource,
  fetchResources,
  updateApplication,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const ApplicationsManagementPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchResources({ resource: "applications" }));
  }, [dispatch]);

  const handleApprove = (row) => {
    dispatch(
      updateApplication(row._id, {
        status: "approved",
        tracking: [
          {
            stage: "approved",
            // ToDo: replace with actual admin user id
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application approved successfully",
          },
        ],
      })
    );
  };

  const handleReject = (row) => {
    dispatch(
      updateApplication(row._id, {
        status: "rejected",
        tracking: [
          {
            stage: "rejected",
            // ToDo: replace with actual admin user id
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application rejected successfully",
          },
        ],
      })
    );
  };

  const handleAssign = (row) => {
    dispatch(
      updateApplication(row._id, {
        status: "under-review",
        tracking: [
          {
            stage: "assigned-to-committee",
            // ToDo: replace with actual admin user id
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application assigned to committee",
          },
        ],
      })
    );
  };

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(
        deleteResource({ resource: "applications", id: deleteId })
      );
      setDeleteId(null);
      setIsConfirmOpen(false);
    }
  };
  const handleView = (row) => setSelectedApp(row);

  const getButtonsByStatus = (row) => {
    const status = row.status?.toLowerCase();

    if (status === "submitted") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
        },
        {
          icon: <FaUserPlus />,
          className: "bg-indigo-500 hover:bg-indigo-600 text-white",
          onClick: handleAssign,
          title: "Assign to Committee",
        },
      ];
    }

    if (status === "under-review") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
        },
        {
          icon: <FaCheck />,
          className: "bg-green-500 hover:bg-green-600 text-white",
          onClick: handleApprove,
          title: "Approve",
        },
        {
          icon: <FaTimes />,
          className: "bg-red-500 hover:bg-red-600 text-white",
          onClick: handleReject,
          title: "Reject",
        },
      ];
    }

    if (status === "rejected") {
      return [
        {
          icon: <FaTrash />,
          className: "bg-red-600 hover:bg-red-700 text-white",
          onClick: handleDelete,
          title: "Delete",
        },
      ];
    }

    return [
      {
        icon: <FaEye />,
        className: "bg-blue-500 hover:bg-blue-600 text-white",
        onClick: handleView,
        title: "View",
      },
    ];
  };

  return (
    <div>
      {status === "loading" && !data.applications?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading applications...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Applications"
          tableHeader={[
            { label: "Student", key: "studentId.name" },
            { label: "Scholarship", key: "scholarshipId.title" },
            { label: "Status", key: "status" },
            { label: "Score", key: "evaluationScore" },
            { label: "Review Notes", key: "reviewNotes" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          tableData={data.applications || []}
          dynamicButtons={getButtonsByStatus}
        />
      )}

      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="md"
      >
        <DataTable
          heading="Application Info"
          tableHeader={[
            { label: "Field", key: "field" },
            { label: "Value", key: "value" },
          ]}
          tableData={[
            { field: "Student", value: selectedApp?.studentId?.name || "N/A" },
            { field: "Scholarship", value: selectedApp?.scholarshipId?.title },
            { field: "Status", value: selectedApp?.status },
            { field: "Notes", value: selectedApp?.reviewNotes },
            { field: "Score", value: selectedApp?.evaluationScore },
            { field: "reviewedBy", value: selectedApp?.reviewedBy },
          ]}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this Application?"
      />
    </div>
  );
};
