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
            remarks: "Application rejected",
          },
        ],
      })
    );
  };

  const handleAssign = (row) => {
    dispatch(
      updateApplication(row._id, {
        status: "under_review",
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

    if (status === "under_review") {
      return [
        {
          icon: <FaEye />,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          onClick: handleView,
          title: "View",
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

    if (status === "evaluated") {
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

    return [
      {
        icon: <FaEye />,
        className: "bg-blue-500 hover:bg-blue-600 text-white",
        onClick: handleView,
        title: "View",
      },
      {
        icon: <FaTrash />,
        className: "bg-red-600 hover:bg-red-700 text-white",
        onClick: handleDelete,
        title: "Delete",
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
        size="lg"
        showSecondaryActionButton
        secondaryActionText="Close"
      >
        {selectedApp ? (
          <div className="space-y-6 text-gray-700">
            {/* Student Info */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">
                Student Information
              </h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {selectedApp?.studentId?.name || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedApp?.studentId?.email || "-"}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {selectedApp?.studentId?.department || "-"}
                </p>
              </div>
            </div>

            {/* Scholarship Info */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">
                Scholarship Information
              </h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p>
                  <strong>Title:</strong>{" "}
                  {selectedApp?.scholarshipId?.title || "-"}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(
                    selectedApp?.scholarshipId?.deadline
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Evaluations */}
            {selectedApp?.evaluations?.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-blue-600">
                  Committee Evaluation
                </h4>
                {selectedApp.evaluations.map((ev, i) => (
                  <div
                    key={ev._id || i}
                    className="border border-gray-100 rounded-xl p-3 mb-3 bg-gray-50"
                  >
                    <p className="text-sm mb-1">
                      <strong>Merit:</strong> {ev.scores?.merit} |{" "}
                      <strong>Need:</strong> {ev.scores?.need} |{" "}
                      <strong>Extracurricular:</strong>{" "}
                      {ev.scores?.extracurricular}
                    </p>
                    <p className="text-sm italic text-gray-600">
                      “{ev.comments || "No comment"}”
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Evaluated on: {new Date(ev.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Status & Notes */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">
                Status & Admin Notes
              </h4>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedApp?.status === "approved"
                      ? "text-green-600"
                      : selectedApp?.status === "rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {selectedApp?.status}
                </span>
              </p>
              <p>
                <strong>Eligibility Reason:</strong>{" "}
                {selectedApp?.eligibilityReason || "-"}
              </p>
              <p>
                <strong>Review Notes:</strong>{" "}
                {selectedApp?.reviewNotes || "No notes"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading details...</p>
        )}
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
