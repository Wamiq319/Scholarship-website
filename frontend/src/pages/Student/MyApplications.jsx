import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteResource, fetchResources } from "@/redux/slices/resourcesSLice";
import { ConfirmationModal, DataTable, Modal } from "@/components";
import { FaEye, FaTrash } from "react-icons/fa";

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchResources({ resource: "applications" }));
  }, [dispatch]);

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
  return (
    <div>
      {/* Loading State  */}
      {status === "loading" && !data.applications?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading applications...</span>
        </div>
      ) : error ? (
        //  Error State
        <p className="text-red-500 text-center mt-5">{error}</p>
      ) : !data.applications?.length ? (
        //  Empty State
        <p className="text-gray-500 text-center mt-5">
          No applications found yet.
        </p>
      ) : (
        //  Data Table
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
          ]}
          tableData={data.applications}
        />
      )}

      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        headerTitle="Application Details"
        size="lg"
      >
        {selectedApp && (
          <div className="space-y-6">
            {/* Basic Info */}
            <DataTable
              heading="Application Info"
              tableHeader={[
                { label: "Field", key: "field" },
                { label: "Value", key: "value" },
              ]}
              tableData={[
                {
                  field: "Scholarship",
                  value: selectedApp.scholarshipId?.title,
                },
                { field: "Status", value: selectedApp.status },
                {
                  field: "Eligibility Reason",
                  value: selectedApp.eligibilityReason || "N/A",
                },
                {
                  field: "Review Notes",
                  value: selectedApp.reviewNotes || "N/A",
                },
                {
                  field: "Evaluation Score",
                  value: selectedApp.evaluationScore || "N/A",
                },
              ]}
            />

            {/* Documents */}
            <div>
              <h3 className="text-lg font-extrabold text-blue-700 mb-6 mt-10">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(selectedApp.documents || {}).map(
                  ([key, url]) => (
                    <div
                      key={key}
                      className="p-3 rounded-md outline-dashed outline-2 outline-yellow-300 bg-white text-[#12254D] "
                    >
                      <p className="capitalize text-sm font-medium mb-2">
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
            {selectedApp.tracking?.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-extrabold text-blue-700 mb-6">
                  Application Tracking
                </h3>

                <div className="relative border-l-2 border-blue-200 pl-6">
                  {selectedApp.tracking.map((track, index) => (
                    <div key={index} className="mb-8 relative">
                      {/* Dot Icon */}
                      <div className="absolute -left-3.5 top-1 w-6 h-6 bg-blue-700 text-white flex items-center justify-center rounded-full shadow-md">
                        {index + 1}
                      </div>

                      {/* Card */}
                      <div className="bg-white p-4 rounded-lg shadow-sm outline-dashed outline-2 outline-yellow-300 ">
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
                          <p className="text-sm text-gray-600 italic  pl-3">
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
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this Application?"
      />
    </div>
  );
};
