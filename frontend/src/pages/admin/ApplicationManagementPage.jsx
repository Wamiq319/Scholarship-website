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

  // Actions
  const handleApprove = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "approved",
        tracking: [
          {
            stage: "approved",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application approved successfully",
          },
        ],
      })
    );

  const handleReject = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "rejected",
        tracking: [
          {
            stage: "rejected",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application rejected",
          },
        ],
      })
    );

  const handleAssign = (row) =>
    dispatch(
      updateApplication(row._id, {
        status: "under_review",
        tracking: [
          {
            stage: "assigned-to-committee",
            updatedBy: "68ebd2d781cba88fff5c263d",
            remarks: "Application assigned to committee",
          },
        ],
      })
    );

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
            { label: "Evaluated By", key: "evaluationsCount" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          tableData={data.applications || []}
          dynamicButtons={getButtonsByStatus}
        />
      )}

      {/* ----------- PRINTABLE MODAL ------------ */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="lg"
        showSecondaryActionButton
        secondaryActionText="Close"
      >
        {selectedApp ? (
          <>
            {/* Print Button */}
            <div className="flex justify-end mb-5">
              <button
                onClick={() => {
                  const printContent = document.getElementById("printArea");
                  const printWindow = window.open(
                    "",
                    "_blank",
                    "width=900,height=650"
                  );
                  printWindow.document.write(`
              <html>
                <head>
                  <title>Application Details</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                    h3 { color: #1d4ed8; }
                    .section { margin-bottom: 20px; }
                    img { max-width: 100%; border-radius: 8px; }
                    table, div, p { font-size: 14px; }
                  </style>
                </head>
                <body>${printContent.innerHTML}</body>
              </html>
            `);
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
              >
                Print
              </button>
            </div>

            {/* --------- PRINTABLE CONTENT --------- */}
            <div
              id="printArea"
              className="bg-white text-gray-800 p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8"
            >
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h1 className="text-2xl font-bold text-blue-700">
                  Scholarship Application Report
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Generated on {new Date().toLocaleString()}
                </p>
              </div>

              {/* Student Info */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-blue-600 border-b pb-1">
                  Student Information
                </h2>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {selectedApp?.studentId?.name || "—"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedApp?.studentId?.email || "—"}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {selectedApp?.studentId?.department || "—"}
                  </p>
                </div>

                <div>
                  <strong>Eligibility Reason:</strong>
                  <div className="mt-2 bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                    {selectedApp?.eligibilityReason || "—"}
                  </div>
                </div>
              </section>

              {/* Scholarship Info */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-blue-600 border-b pb-1">
                  Scholarship Information
                </h2>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p>
                    <strong>Title:</strong>{" "}
                    {selectedApp?.scholarshipId?.title || "—"}
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    {selectedApp?.scholarshipId?.category || "—"}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {selectedApp?.scholarshipId?.deadline
                      ? new Date(
                          selectedApp.scholarshipId.deadline
                        ).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </section>

              {/* Committee Evaluation */}
              {selectedApp?.evaluations?.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-lg font-semibold text-blue-600 border-b pb-1">
                    Committee Evaluation
                  </h2>
                  <p className="text-sm text-gray-600">
                    Evaluated by{" "}
                    <strong>{selectedApp?.evaluations?.length}</strong>{" "}
                    committee member
                    {selectedApp?.evaluations?.length > 1 ? "s" : ""}.
                  </p>

                  {selectedApp.evaluations.map((ev, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <p className="font-medium text-gray-800">
                        Evaluated By: {ev.committeeMemberId?.name || "—"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Merit: <strong>{ev.scores?.merit || "—"}</strong> |
                        Need: <strong>{ev.scores?.need || "—"}</strong> |
                        Extracurricular:{" "}
                        <strong>{ev.scores?.extracurricular || "—"}</strong>
                      </p>
                      <p className="italic text-gray-600 mt-2">
                        “{ev.comments || "No comments"}”
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Evaluated on: {new Date(ev.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Status & Score */}
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-blue-600 border-b pb-1">
                  Status & Score
                </h2>
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
                    {selectedApp?.status?.toUpperCase() || "—"}
                  </span>
                </p>
                <p>
                  <strong>Score:</strong> {selectedApp?.evaluationScore || "—"}
                </p>
              </section>

              {/* Footer */}
              <div className="text-center text-xs text-gray-500 border-t pt-4 mt-6">
                <p>
                  Scholarship Management System © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-8">Loading details...</p>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this application?"
      />
    </div>
  );
};
