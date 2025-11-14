import {
  Button,
  ConfirmationModal,
  DataTable,
  FormModal,
  Modal,
} from "@/components";
import {
  deleteResource,
  fetchResources,
  updateResource,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const StudentManagementPage = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Edit modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data, status } = useSelector((state) => state.resources);
  const users = data?.users;

  useEffect(() => {
    dispatch(fetchResources({ resource: "users" }));
  }, [dispatch]);

  // Filter only students
  const students = useMemo(() => {
    return users?.filter((u) => u.role === "STUDENT");
  }, [users]);

  // DELETE
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

  //  Handle Update Submit
  const handleUpdate = async (formData) => {
    const body = {
      department: formData.department,
      studentId: formData.studentId,
      profile: {
        phone: formData.phone,
        address: formData.address,
        cgpa: Number(formData.cgpa),
        familyIncome: Number(formData.familyIncome),
      },
    };

    await dispatch(
      updateResource({ resource: "users", id: selectedStudent._id, body })
    );
    setSelectedStudent(null);
    dispatch(fetchResources({ resource: "users" })); // refresh list
  };

  if (status === "loading") return;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mt-10 md:mt-0 items-center">
        <h1 className="text-xl font-bold ">Student Management</h1>
      </div>

      {/* Loading/Error UI */}
      {status === "loading" && !data.users?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading students...</span>
        </div>
      ) : (
        <DataTable
          heading="All Students"
          tableHeader={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Role", key: "role" },
            { label: "Department", key: "department" },
            { label: "StudentID", key: "studentId" },
            { label: "Phone", key: "profile.phone" },
            { label: "CGPA", key: "profile.cgpa" },
            { label: "Family Income", key: "profile.familyIncome" },
          ]}
          tableData={students || []}
          buttons={[
            {
              icon: <FaEdit />,
              className: "bg-yellow-500 hover:bg-yellow-600 text-white",
              onClick: (row) => setSelectedStudent(row),
            },
            {
              icon: <FaTrash />,
              className: "bg-red-500 hover:bg-red-600 text-white",
              onClick: (row) => handleDelete(row._id),
            },
          ]}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />

      {/*  Edit Modal */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        headerTitle="Edit Student Information"
        size="md"
        showSecondaryActionButton
        secondaryActionText="Close"
      >
        {selectedStudent && (
          <FormModal
            initialData={{
              department: selectedStudent.department || "",
              studentId: selectedStudent.studentId || "",
              phone: selectedStudent.profile?.phone || "",
              address: selectedStudent.profile?.address || "",
              cgpa: selectedStudent.profile?.cgpa || "",
              familyIncome: selectedStudent.profile?.familyIncome || "",
            }}
            fields={[
              {
                name: "department",
                label: "Department",
                type: "text",
                required: true,
              },
              {
                name: "studentId",
                label: "Student Id",
                type: "text",
                required: true,
              },
              {
                name: "phone",
                label: "Phone Number",
                type: "text",
                required: true,
              },
              {
                name: "address",
                label: "Address",
                type: "text",
                required: true,
              },
              { name: "cgpa", label: "CGPA", type: "number", required: true },
              {
                name: "familyIncome",
                label: "Family Income",
                type: "number",
                required: true,
              },
            ]}
            onSubmit={handleUpdate}
            formId="update-student-form"
          >
            <div className="flex justify-end mt-6">
              <Button type="submit" variant="filled" color="blue">
                Update
              </Button>
            </div>
          </FormModal>
        )}
      </Modal>
    </div>
  );
};
