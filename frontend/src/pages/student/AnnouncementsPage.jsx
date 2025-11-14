import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";

export const AnnouncementsPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.resources);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchResources({ resource: "announcement" }));
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  const announcements = data?.announcement || [];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const typeStyles = {
    general: "bg-gray-100 text-gray-700 border-gray-300",
    scholarship: "bg-blue-100 text-blue-700 border-blue-300",
    deadline: "bg-red-100 text-red-700 border-red-300",
    result: "bg-green-100 text-green-700 border-green-300",
  };

  const stripColors = {
    general: "bg-gray-500",
    scholarship: "bg-blue-500",
    deadline: "bg-red-500",
    result: "bg-green-500",
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center py-10 items-center gap-3 text-gray-600">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        Loading announcements...
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
        Latest Announcements
      </h1>

      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements available.</p>
      ) : (
        <div className="space-y-5">
          {announcements.map((ann) => {
            const isExpanded = expandedId === ann._id;

            return (
              <div
                key={ann._id}
                onClick={() => toggleExpand(ann._id)}
                className="
                  bg-white rounded-2xl shadow-sm hover:shadow-lg 
                  border border-gray-200 
                  transition-all cursor-pointer overflow-hidden relative
                "
              >
                {/* Color Strip */}
                <div
                  className={`absolute left-0 top-0 h-full w-1 ${
                    stripColors[ann.type] || stripColors.general
                  }`}
                ></div>

                {/* Header */}
                <div className="flex justify-between items-center p-6 pl-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {ann.title}
                    </h2>

                    {/* Type Label */}
                    <span
                      className={`
                        inline-block mt-2 px-3 py-1 text-xs font-semibold 
                        rounded-full border 
                        ${typeStyles[ann.type] || typeStyles.general}
                      `}
                    >
                      {ann.type.charAt(0).toUpperCase() + ann.type.slice(1)}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`
                      text-gray-500 text-xl transition-transform duration-300 
                      ${isExpanded ? "rotate-180" : ""}
                    `}
                  >
                    ▼
                  </div>
                </div>

                {/* Expandable Content */}
                <div
                  className={`px-8 transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-[300px] pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {ann.message}
                  </p>

                  {ann.scholarshipId && (
                    <p className="mt-3 text-sm text-blue-600 font-medium">
                      Related Scholarship:{" "}
                      <a
                        href={`/scholarship/details/${ann.scholarshipId._id}`}
                        className="underline hover:text-blue-800"
                      >
                        {ann.scholarshipId.title}
                      </a>
                    </p>
                  )}

                  <p className="mt-3 text-xs text-gray-500">
                    Published: {formatDate(ann.publishedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
