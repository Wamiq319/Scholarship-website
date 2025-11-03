import { ConfirmationModal, DataTable, Modal } from "@/components";
import {
  deleteResource,
  fetchResources,
  updateApplication,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState, useRef } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

export const ApplicationsManagementPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchResources({ resource: "applications" }));
  }, [dispatch]);

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Scholarship Application Details",
    removeAfterPrint: true,
  });

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
            <div className="flex justify-end mb-3 print:hidden">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                🖨 Print
              </button>
            </div>

            {/* --------- PRINTABLE CONTENT --------- */}
            <div
              ref={printRef}
              className="bg-white text-gray-800 p-8 rounded-xl border border-gray-200 space-y-6 print:p-0 print:border-none print:rounded-none"
            >
              {/* Header */}
              <div className="text-center border-b pb-3 mb-4">
                <h1 className="text-2xl font-bold text-blue-700">
                  Scholarship Application Report
                </h1>
                <p className="text-sm text-gray-500">
                  Generated on {new Date().toLocaleString()}
                </p>
              </div>

              {/* Student Info */}
              <section>
                <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b pb-1">
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

                <div className="mt-3">
                  <strong>Eligibility Reason (Student Provided):</strong>
                  <div className="mt-1 whitespace-pre-wrap bg-gray-50 border rounded-md p-3 text-sm text-gray-700">
                    {selectedApp?.eligibilityReason || "—"}
                  </div>
                </div>
              </section>

              {/* Scholarship Info */}
              <section>
                <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b pb-1">
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
                <section>
                  <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b pb-1">
                    Committee Evaluation
                  </h2>

                  {/*Show total evaluators */}
                  <p className="text-sm text-gray-600 mb-2">
                    Evaluated by{" "}
                    <strong>{selectedApp?.evaluations?.length}</strong>{" "}
                    committee member
                    {selectedApp?.evaluations?.length > 1 ? "s" : ""}.
                  </p>

                  {selectedApp.evaluations.map((ev, i) => (
                    <div
                      key={i}
                      className="border rounded-md p-3 mb-3 bg-gray-50 text-sm"
                    >
                      <p>
                        <strong>Merit:</strong> {ev.scores?.merit || "—"} |{" "}
                        <strong>Need:</strong> {ev.scores?.need || "—"} |{" "}
                        <strong>Extracurricular:</strong>{" "}
                        {ev.scores?.extracurricular || "—"}
                      </p>
                      <p className="italic text-gray-600 mt-1">
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
              <section>
                <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b pb-1">
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

                <p className="mt-2">
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
          <p className="text-center text-gray-400">Loading details...</p>
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
