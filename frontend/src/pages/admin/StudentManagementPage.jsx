import { ConfirmationModal, DataTable } from "@/components";
import { deleteResource, fetchResources } from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const StudentsManagementPage = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data, status, error } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources({ resource: "users" }));
  }, [dispatch]);

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

  return (
    <div>
      {/* Loading/Error UI */}
      {status === "loading" && !data.users?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading students...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable
          heading="All Students"
          tableHeader={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Role", key: "role" },
            { label: "Department", key: "department" },
            { label: "Roll No", key: "rollNo" },
            { label: "Phone", key: "profile.phone" },
            { label: "GPA", key: "profile.gpa" },
            { label: "Family Income", key: "profile.familyIncome" },
            { label: "Active", key: "isActive" },
          ]}
          tableData={data.users || []}
          buttons={[
            {
              icon: <FaTrash />,
              className: "bg-red-500 hover:bg-red-600 text-white",
              onClick: (row) => handleDelete(row._id),
            },
          ]}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};
