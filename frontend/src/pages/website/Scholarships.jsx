import React, { useEffect } from "react";

import { Card, Footer, Navbar } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";
import { useNavigate } from "react-router-dom";
const Scholarships = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, status } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

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


        if (!storedUser || storedUser.role.toLowerCase() !== "student") {
          navigate("/login");
          return;
        }

        navigate(`/scholarships/apply/${scholarship._id}`);
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
    <div>
      <Navbar />
      <div className="min-h-screen container mx-auto p-8">
        <h1 className="text-3xl font-bold">Scholarships</h1>
        <div className="grid 2xl:grid-cols-2 gap-6 justify-center mt-10">
          {status === "loading" && !data.scholarships?.length ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">
                Loading scholarships...
              </span>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scholarships;
