import { Card, FormModal, Modal } from "@/components";
import {
  createApplication,
  fetchResources,
} from "@/redux/slices/resourcesSLice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const applicationFields = [
  // TODO: Replace this text input with file upload system (img etc.)
  {
    label: "Documents",
    name: "documents",
    placeholder: "TODO: Replace this...",
    type: "text",
  },
];

export const AvailableScholarshipsPage = () => {
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.resources);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const formId = "application-form";

  const user = localStorage.getItem("user");

  useEffect(() => {
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && isFormOpen) {
      setIsFormOpen(false);
    }
  }, [status]);

  const handleApplyScholarship = (formData) => {
    const documents = formData.documents?.split(",").map((d) => d.trim()) || [];

    const payload = {
      scholarshipId: selectedScholarship?._id,
      studentId: user ? JSON.parse(user)._id : null,
      documents,
      tracking: [
        {
          stage: "submitted",
          remarks: "Application submitted",
        },
      ],
    };

    dispatch(createApplication(payload));
    console.log("Application Payload:", payload);
    // dispatch(createApplication(payload));
  };

  const actions = [
    {
      label: "Expires in",
      type: "text",
      valueKey: "deadline",
      format: "daysLeft",
    },
    {
      label: "Apply Now",
      type: "button",
      onClick: (scholarship) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        const profile = storedUser?.profile || {};
        const profileIncomplete =
          !profile.gpa ||
          !profile.familyIncome ||
          !profile.address ||
          !storedUser.department;

        if (profileIncomplete) {
          alert("Please complete your profile before applying.");
          window.location.href = "/student/profile";
          return;
        }

        setSelectedScholarship(scholarship);
        setIsFormOpen(true);
      },
    },
  ];

  const fields = [
    { key: "amount", label: "Amount", icon: "DollarSign" },
    { key: "category", label: "Category", icon: "Tag" },
    { key: "eligibilityCriteria.minGPA", label: "Min GPA", icon: "Gauge" },
    {
      key: "eligibilityCriteria.maxIncome",
      label: "Max Income",
      icon: "CircleDollarSign",
    },
    {
      key: "eligibilityCriteria.department",
      label: "Departments",
      icon: "Building",
    },
    {
      key: "eligibilityCriteria.semester",
      label: "Semesters",
      icon: "GraduationCap",
    },
    { key: "deadline", label: "Deadline", icon: "CalendarDays" },
  ];

  return (
    <div className="grid 2xl:grid-cols-2 gap-6 justify-center">
      {status === "loading" && !data.scholarships?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading scholarships...</span>
        </div>
      ) : (
        data?.scholarships?.map((scholarship) => (
          <Card
            key={scholarship._id}
            scholarship={scholarship}
            fields={fields}
            actions={actions}
          />
        ))
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        headerTitle={`Apply for ${selectedScholarship?.title || "Scholarship"}`}
        size="lg"
        formId={formId}
        onSecondaryAction={() => setIsFormOpen(false)}
        isPrimaryActionLoading={status === "loading"}
        primaryActionText="Submit Application"
        showPrimaryActionButton={true}
        showSecondaryActionButton={true}
        error={error}
      >
        <FormModal
          formId={formId}
          fields={applicationFields}
          onSubmit={handleApplyScholarship}
        />
      </Modal>
    </div>
  );
};
