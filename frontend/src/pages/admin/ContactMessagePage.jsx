import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";
import { DataTable, Modal } from "@/components";
import { FaEye } from "react-icons/fa";

export const ContactMessagePage = () => {
  const dispatch = useDispatch();
  const { data: messages, status, error } = useSelector(
    (state) => state.resources
  );

  const [selectedMessage, setSelectedMessage] = useState(null);

  const contactMessages = messages.contact || [];

  useEffect(() => {
    dispatch(fetchResources({ resource: "contact" }));
  }, [dispatch]);

  // Table header
  const tableHeader = [
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Subject", key: "subject" },
    { label: "Date", key: "createdAt" },
  ];

  // Optional: Action button for modal view
  const dynamicButtons = (row) => [
    {
      icon: <FaEye />,
      onClick: () => setSelectedMessage(row),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Contact Messages</h1>

      {status === "loading" && <p>Loading messages...</p>}
      {status === "failed" && (
        <p className="text-red-500">Error fetching messages: {error}</p>
      )}

      {status === "succeeded" && (
        <DataTable
          heading="Contact Messages"
          tableHeader={tableHeader}
          tableData={contactMessages}
          dynamicButtons={dynamicButtons}
        />
      )}

      {/* Modal to show full message */}
    <Modal
  isOpen={!!selectedMessage}
  onClose={() => setSelectedMessage(null)}
  headerTitle={selectedMessage?.fullName}
  size="md"
  showSecondaryActionButton
  secondaryActionText="Close"
>
  {selectedMessage && (
    <div className="space-y-6">
      {/* Email */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-indigo-50 p-4 rounded-lg shadow-sm">
        <span className="font-semibold text-indigo-700">Email:</span>
        <span className="text-gray-800 break-all">{selectedMessage.email}</span>
      </div>

      {/* Subject */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-green-50 p-4 rounded-lg shadow-sm">
        <span className="font-semibold text-green-700">Subject:</span>
        <span className="text-gray-800">{selectedMessage.subject}</span>
      </div>

      {/* Message */}
      <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-yellow-700 mb-2">Message:</h3>
        <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
      </div>

      {/* Created At */}
      <div className="flex justify-end text-gray-500 text-sm">
        {new Date(selectedMessage.createdAt).toLocaleString()}
      </div>
    </div>
  )}
</Modal>

    </div>
  );
};
