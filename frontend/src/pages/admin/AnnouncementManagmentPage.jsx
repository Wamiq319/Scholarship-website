import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaEye } from "react-icons/fa";
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
  createResource,
} from "@/redux/slices/resourcesSLice";

export const AnnouncementManagmentPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const formId = "announcement-form";

  useEffect(() => {
    dispatch(fetchResources({ resource: "announcement" }));
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  const announcementFields = [
    {
      label: "Title",
      name: "title",
      placeholder: "Enter title",
      required: true,
    },
    {
      label: "Message",
      name: "message",
      placeholder: "Enter full message",
      type: "textarea",
      rows: 3,
      required: true,
    },
    {
      label: "Type",
      name: "type",
      type: "dropdown",
      options: [
        { label: "General", value: "general" },
        { label: "Scholarship", value: "scholarship" },
        { label: "Deadline", value: "deadline" },
        { label: "Result", value: "result" },
      ],
      defaultValue: "general",
    },
    {
      label: "Related Scholarship (optional)",
      name: "scholarshipId",
      type: "dropdown",
      options:
        data.scholarships?.map((s) => ({
          label: s.title,
          value: s._id,
        })) || [],
    },
  ];

  // Delete Logic
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(
        deleteResource({ resource: "announcement", id: deleteId })
      );
      setDeleteId(null);
      setIsConfirmOpen(false);
      dispatch(fetchResources({ resource: "announcement" }));
    }
  };

  // Create Logic
  const handleCreateAnnouncement = (formData) => {
    const payload = {
      title: formData.title,
      message: formData.message,
      type: formData.type,
      scholarshipId: formData.scholarshipId || null,
    };
    dispatch(createResource({ resource: "announcement", body: payload })).then(
      () => {
        dispatch(fetchResources({ resource: "announcement" }));
        setIsFormOpen(false);
      }
    );
  };

  //  View Logic
  const handleView = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsViewOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mt-10 md:mt-0">
        <h1 className="text-xl font-bold">Announcement Management</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add Announcement
        </Button>
      </div>

      {/* Loader / Error */}
      {status === "loading" && !data.announcement?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading announcements...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Announcements"
          tableHeader={[
            { label: "Title", key: "title" },
            { label: "Type", key: "type" },
            { label: "Active", key: "isActive" },
            { label: "Published At", key: "publishedAt" },
          ]}
          tableData={data.announcement || []}
          buttons={[
            {
              icon: <FaEye />,
              className: "bg-green-500 hover:bg-green-600 text-white",
              onClick: (row) => handleView(row),
            },
            {
              icon: <FaTrash />,
              className: "bg-red-500 hover:bg-red-600 text-white",
              onClick: (row) => handleDelete(row._id),
            },
          ]}
        />
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        headerTitle="Create Announcement"
        size="lg"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText="Create"
        showPrimaryActionButton
        showSecondaryActionButton
      >
        <FormModal
          formId={formId}
          fields={announcementFields}
          onSubmit={handleCreateAnnouncement}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        headerTitle="Announcement Details"
        size="md"
        showSecondaryActionButton
        secondaryActionText="Close"
      >
        {selectedAnnouncement ? (
          <div className="space-y-5 text-gray-800">
            {/* Title & Type */}
            <div className="border-b pb-3">
              <h2 className="text-2xl font-bold text-blue-700">
                {selectedAnnouncement.title}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
                {selectedAnnouncement.type}
              </span>
            </div>

            {/* Message */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Message:</h3>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                {selectedAnnouncement.message}
              </p>
            </div>

            {/* Scholarship Info (if applicable) */}
            {selectedAnnouncement.scholarshipId && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-700 mb-1">
                  Related Scholarship
                </h3>
                <p className="text-indigo-600 font-medium">
                  {selectedAnnouncement.scholarshipId.title}
                </p>
                <p className="text-sm text-indigo-400 mt-1">
                  ID: {selectedAnnouncement.scholarshipId._id}
                </p>
              </div>
            )}

            {/* Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 border-t pt-3">
              <p>
                <span className="font-semibold text-gray-700">
                  Published At:
                </span>{" "}
                {new Date(selectedAnnouncement.publishedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No announcement selected.
          </p>
        )}
      </Modal>

      {/*  Delete Confirmation */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this announcement?"
      />
    </div>
  );
};
