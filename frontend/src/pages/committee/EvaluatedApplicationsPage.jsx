import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvaluationsByCommitteeMember } from "@/redux/slices/resourcesSLice";
import { Eye } from "lucide-react";
import { DataTable, Modal } from "@/components";

export const EvaluatedApplicationsPage = () => {
  const dispatch = useDispatch();
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const id = storedUser ? storedUser._id : null;

  const { data, status, error } = useSelector((state) => state.resources);

  useEffect(() => {
    if (id) dispatch(fetchEvaluationsByCommitteeMember(id));
  }, [id, dispatch]);

  const evaluations = data?.evaluationsById || [];

  const handleView = (row) => {
    setSelectedEvaluation(row);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      {/* Loading */}
      {status === "loading" && !evaluations.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading evaluations...</span>
        </div>
      ) : error ? (
        /* Error */
        <p className="text-red-500 text-center mt-5">{error}</p>
      ) : !evaluations.length ? (
        /* Empty */
        <p className="text-gray-500 text-center mt-5">
          No evaluations found.
        </p>
      ) : (
        /* Data Table */
        <>
          <DataTable
            heading="Evaluated Applications"
            tableHeader={[
              { label: "Student Name", key: "applicationId.studentId.name" },
              { label: "Scholarship Title", key: "applicationId.scholarshipId.title" },
              { label: "Department", key: "applicationId.studentId.department" },
              { label: "Status", key: "applicationId.status" },
              { label: "Comment", key: "comments" },
              { label: "Created At", key: "createdAt" },
            ]}
            tableData={evaluations}
            dynamicButtons={(row) => [
              {
                icon: <Eye size={18} />,
                onClick: () => handleView(row),
                color: "blue",
                variant: "outline",
                title: "View Details",
              },
            ]}
          />

          {/* Modal */}
          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            headerTitle="Evaluation Details"
            size="md"
            showSecondaryActionButton
            secondaryActionText="Close"
          >
            {selectedEvaluation ? (
              <div className="space-y-6 text-gray-800">
                {/* Student Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-3 text-blue-700">
                    Student Information
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedEvaluation.applicationId?.studentId?.name || "-"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedEvaluation.applicationId?.studentId?.email || "-"}
                    </p>
                    <p>
                      <strong>Department:</strong>{" "}
                      {selectedEvaluation.applicationId?.studentId?.department ||
                        "-"}
                    </p>
                  </div>
                </div>

                {/* Scholarship Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-3 text-blue-700">
                    Scholarship Information
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <p>
                      <strong>Title:</strong>{" "}
                      {selectedEvaluation.applicationId?.scholarshipId?.title ||
                        "-"}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {new Date(
                        selectedEvaluation.applicationId?.scholarshipId
                          ?.deadline
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Scores */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-3 text-blue-700">
                    Evaluation Scores
                  </h4>
                  <div className="grid grid-cols-3 text-sm">
                    <p>
                      <strong>Merit:</strong>{" "}
                      {selectedEvaluation.scores?.merit ?? "-"}
                    </p>
                    <p>
                      <strong>Need:</strong>{" "}
                      {selectedEvaluation.scores?.need ?? "-"}
                    </p>
                    <p>
                      <strong>Extracurricular:</strong>{" "}
                      {selectedEvaluation.scores?.extracurricular ?? "-"}
                    </p>
                  </div>
                </div>

                {/* Comment */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-2 text-blue-700">
                    Committee Comment
                  </h4>
                  <p className="text-sm bg-white outline-dashed outline-2 outline-yellow-300 rounded-md p-3 italic">
                    {selectedEvaluation.comments || "No comment provided."}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-2 text-blue-700">
                    Application Status
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="font-medium text-yellow-500">
                        {selectedEvaluation.applicationId?.status}
                      </span>
                    </p>
                    <p>
                      <strong>Evaluated At:</strong>{" "}
                      {new Date(selectedEvaluation.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading details...</p>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};
