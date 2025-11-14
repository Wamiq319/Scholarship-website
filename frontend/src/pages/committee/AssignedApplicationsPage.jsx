import { DataTable } from "@/components";
import { fetchResources } from "@/redux/slices/resourcesSLice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AssignedApplicationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources({ resource: "applications" }));
  }, [dispatch]);

  const handleView = (row) => {
    navigate(`/committee/application/${row._id}/evaluate`);
  };

  return (
    <div className="p-4">
      {status === "loading" && !data.applications?.length ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading applications...</span>
        </div>
      ) : !data.applications?.length ? (
        <p className="text-gray-500 text-center mt-5">
          No assigned applications found.
        </p>
      ) : (
        <DataTable
          heading="Assigned Scholarship Applications"
          tableHeader={[
            { label: "Student Name", key: "personalInfo.fullName" },
            { label: "Scholarship Title", key: "scholarshipId.title" },
            { label: "Status", key: "status" },
            { label: "Deadline", key: "scholarshipId.deadline" },
            { label: "Submitted On", key: "createdAt" },
          ]}
          buttons={[
            {
              icon: <FaArrowRight />,
              className: "bg-blue-500 hover:bg-blue-600 text-white",
              onClick: handleView,
              title: "View Details",
            },
          ]}
          tableData={data.applications?.filter(
            (app) => app.status !== "submitted"
          )}
        />
      )}
    </div>
  );
};
