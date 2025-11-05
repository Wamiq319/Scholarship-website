import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal, DataTable, Modal } from "@/components";
import { FaEye, FaTrash } from "react-icons/fa";
import {
  deleteResource,
  fetchApplicationsById,
} from "@/redux/slices/resourcesSLice";

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);

  const [selectedApp, setSelectedApp] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const storedUser = localStorage.getItem("user");
  const student = storedUser ? JSON.parse(storedUser) : null;
  const studentId = student?._id || student?.id || student;

  useEffect(() => {
    if (studentId) {
      dispatch(fetchApplicationsById(studentId));
    }
  }, [dispatch, studentId]);

  const handleView = (row) => setSelectedApp(row);
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

  const applications = data?.applicationsById || [];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Loading */}
      {status === "loading" && !applications.length ? (
        <div className="flex justify-center items-center py-10 space-x-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">
            Loading applications...
          </span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-5 font-semibold">{error}</p>
      ) : !applications.length ? (
        <p className="text-gray-500 text-center mt-5 font-medium">
          No applications found yet.
        </p>
      ) : (
        <DataTable
          heading="My Scholarship Applications"
          tableHeader={[
            { label: "Scholarship", key: "scholarshipId.title" },
            { label: "Status", key: "status" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          buttons={[
            {
              icon: <FaEye />,
              className: "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
              onClick: handleView,
              title: "View",
            },
            {
              icon: <FaTrash />,
              className: "bg-red-600 hover:bg-red-700 text-white shadow-md",
              onClick: handleDelete,
              title: "Delete",
            },
          ]}
          tableData={applications}
        />
      )}

      {/* Application Details Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="lg"
      >
        {selectedApp && (
          <div className="space-y-8 print-area" id="printArea">
            {/* Print Button (hidden in print mode) */}
            <div className="flex justify-end mb-4 no-print">
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
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #1d4ed8; }
                    .section { margin-bottom: 20px; }
                    img { max-width: 100%; border-radius: 8px; }
                    table, div, p { font-size: 14px; color: #333; }
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

            {/* --- Modal Content (Application Info, Documents, Tracking) --- */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-blue-700">
                Application Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Scholarship",
                    value: selectedApp.scholarshipId?.title || "N/A",
                  },
                  { label: "Status", value: selectedApp.status },
                  {
                    label: "Eligibility Reason",
                    value: selectedApp.eligibilityReason || "N/A",
                  },
                  {
                    label: "Evaluation Score",
                    value: selectedApp.evaluationScore || "N/A",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white p-4 rounded-md shadow-sm"
                  >
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="section">
              <h3 className="text-lg font-extrabold text-blue-700 mb-4">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(selectedApp.documents || {}).map(
                  ([key, url]) => (
                    <div
                      key={key}
                      className="p-3 rounded-md border border-dashed border-yellow-300 bg-white shadow-sm"
                    >
                      <p className="capitalize text-sm font-semibold mb-2">
                        {key}
                      </p>
                      {url ? (
                        <img
                          src={url}
                          alt={key}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                      ) : (
                        <p className="text-gray-400 text-sm">Not Uploaded</p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Tracking Progress */}
            {!!selectedApp.tracking?.length && (
              <div className="section">
                <h3 className="text-lg font-extrabold text-blue-700 mb-4">
                  Application Tracking
                </h3>
                <div className="relative border-l-2 border-blue-200 pl-6 space-y-6">
                  {selectedApp.tracking.map((track, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full shadow-md">
                        {index + 1}
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-gray-800 capitalize">
                            {track.stage}
                          </p>
                          <span className="text-xs text-gray-500">
                            {new Date(track.updatedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {track.remarks && (
                          <p className="text-sm text-gray-600 italic pl-2">
                            “{track.remarks}”
                          </p>
                        )}
                        {track.updatedBy?.name && (
                          <p className="text-xs text-gray-500 mt-2">
                            Updated by:{" "}
                            <span className="font-medium text-gray-700">
                              {track.updatedBy.name}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this application?"
      />
    </div>
  );
};
