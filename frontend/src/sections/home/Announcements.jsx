
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";

const TAILWIND_COLOR_CLASSES =
  "bg-indigo-500 bg-teal-500 bg-rose-500 bg-green-500 focus-within:ring-indigo-500 focus-within:ring-teal-500 focus-within:ring-rose-500 focus-within:ring-green-500";

const Announcements = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.resources);

  const [visibleCount, setVisibleCount] = useState(6); 
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!data.announcement) {
      dispatch(fetchResources({ resource: "announcement" }));
    }
  }, [dispatch, data.announcement]);

  const allAnnouncements = data?.announcement || [];
  const announcementsToShow = allAnnouncements.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

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

  const typeConfigs = {
    general: {
      colorClass: "bg-indigo-500",
      ringClass: "focus-within:ring-indigo-500", 
      labelBg: "bg-indigo-50",
      labelText: "text-indigo-700",
    },
    scholarship: {
      colorClass: "bg-teal-500",
      ringClass: "focus-within:ring-teal-500",
      labelBg: "bg-teal-50",
      labelText: "text-teal-700",
    },
    deadline: {
      colorClass: "bg-rose-500",
      ringClass: "focus-within:ring-rose-500",
      labelBg: "bg-rose-50",
      labelText: "text-rose-700",
    },
    result: {
      colorClass: "bg-green-500",
      ringClass: "focus-within:ring-green-500",
      labelBg: "bg-green-50",
      labelText: "text-green-700",
    },
  };

  if (status === "loading" && !data.announcement) {
    return (
      <div className="flex justify-center py-10 items-center gap-3 text-gray-600">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        Loading announcements...
      </div>
    );
  }

  if (allAnnouncements.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No recent announcements at this time.
      </p>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className={`hidden ${TAILWIND_COLOR_CLASSES}`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              Announcements
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the newest updates, deadlines, and results.
          </p>
        </div>

        {/* --- Responsive Grid Layout --- */}
        <div className="
          space-y-4             
          md:grid md:grid-cols-2 md:gap-6 md:space-y-0                     
          mx-auto max-w-6xl                             
        ">
          {announcementsToShow.map((ann) => {
            const config = typeConfigs[ann.type] || typeConfigs.general;
            const isExpanded = expandedId === ann._id;

            return (
              <div
                key={ann._id}
                className={`bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg
                            focus-within:ring-2 focus-within:ring-offset-2 ${config.ringClass} focus-within:ring-opacity-50 
                            ${isExpanded ? `shadow-lg` : ""} 
                            overflow-hidden`}
              >
                <div
                  onClick={() => toggleExpand(ann._id)}
                  className="flex justify-between items-center p-4 cursor-pointer"
                  role="button"
                  tabIndex="0"
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(ann._id);
                    }
                  }}
                >
                  <div className="flex items-start space-x-4 flex-1 min-w-0">
                    {/* Color bar indicator */}
                    <div
                      className={`w-1.5 h-auto self-stretch ${config.colorClass} rounded-full flex-shrink-0 mt-1`}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug truncate">
                        {ann.title}
                      </h3>

                      <div className="flex flex-wrap items-center mt-1 space-x-3">
                        {/* Type Label */}
                        <span
                          className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${config.labelBg} ${config.labelText}`}
                        >
                          {ann.type.charAt(0).toUpperCase() + ann.type.slice(1)}
                        </span>
                        {/* Date */}
                        <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                          {formatDate(ann.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expansion Icon */}
                  <div className="ml-4 flex-shrink-0">
                    <div
                      className={`text-gray-400 text-lg transition-transform duration-300 ${
                        isExpanded
                          ? "rotate-180 text-blue-600"
                          : "hover:text-gray-600"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-3">
                    <p className="text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-4 whitespace-pre-wrap">
                      {ann.message}
                    </p>
                    {ann.scholarshipId && (
                      <p className="mt-4 text-sm text-blue-600 font-medium">
                        Related Scholarship:{" "}
                        <a
                          href={`/scholarship/details/${ann.scholarshipId._id}`}
                          className="underline hover:text-blue-700"
                        >
                          {ann.scholarshipId.title}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {visibleCount < allAnnouncements.length && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Load More ({allAnnouncements.length - announcementsToShow.length}{" "}
              left)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;