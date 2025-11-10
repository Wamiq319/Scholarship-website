import { Button, Footer, Navbar } from "@/components";
import { fetchResourceById } from "@/redux/slices/resourcesSLice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  DollarSign,
  CalendarDays,
  Users,
  CheckCircle,
  Target,
  Building2,
  GraduationCap,
  Info,
} from "lucide-react";

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading } = useSelector((state) => state.resources);
  const scholarship = data["scholarshipsById"];

  useEffect(() => {
    if (id) dispatch(fetchResourceById({ resource: "scholarships", id }));
  }, [id, dispatch]);

  if (loading || !scholarship)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg mt-4">
            Loading scholarship details...
          </p>
        </div>
      </div>
    );

  const {
    title,
    description,
    eligibilityCriteria,
    amount,
    deadline,
    category,
    applicantsCount,
    isActive,
  } = scholarship;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Hero/Header */}
            <div className="relative bg-white rounded-3xl shadow-xl p-10 overflow-hidden">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold mb-4 px-4 py-1 rounded-full">
                {category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 py-2">
                {title}
              </h1>
              <p className="text-gray-700 mt-5 leading-relaxed text-lg">
                {description}
              </p>
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full opacity-20 -translate-x-1/3 -translate-y-1/3"></div>
            </div>

            {/* Scholarship Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-lg border border-blue-200 p-8 space-y-6 hover:shadow-2xl transition">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" /> Scholarship Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl shadow-sm">
                  <DollarSign className="text-green-500" /> Amount:{" "}
                  <strong className="ml-auto text-green-600 text-lg">
                    Rs. {amount}
                  </strong>
                </div>
                <div className="flex items-center gap-2 bg-red-50 p-3 rounded-xl shadow-sm">
                  <CalendarDays className="text-red-500" /> Deadline:{" "}
                  <strong className="ml-auto">
                    {new Date(deadline).toLocaleDateString()}
                  </strong>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-xl shadow-sm">
                  <Users className="text-yellow-500" /> Applicants:{" "}
                  <strong className="ml-auto">{applicantsCount}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle /> Status:
                  <span
                    className={`ml-auto px-3 py-1 text-xs font-bold rounded-full border ${
                      isActive
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "bg-red-100 border-red-300 text-red-700"
                    }`}
                  >
                    {isActive ? "Active" : "Closed"}
                  </span>
                </div>
              </div>

              {eligibilityCriteria && (
                <div className="mt-6 pt-4 border-t border-blue-200 space-y-3">
                  <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <Target className="text-purple-500 w-5 h-5" /> Eligibility
                    Criteria
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {eligibilityCriteria.minGPA && (
                      <li className="flex items-start gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition">
                        <GraduationCap className="text-indigo-500 w-4 h-4 mt-1" />{" "}
                        Minimum GPA: {eligibilityCriteria.minGPA}
                      </li>
                    )}
                    {eligibilityCriteria.maxIncome && (
                      <li className="flex items-start gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition">
                        <DollarSign className="text-indigo-500 w-4 h-4 mt-1" />{" "}
                        Max Family Income: Rs. {eligibilityCriteria.maxIncome}
                      </li>
                    )}
                    {eligibilityCriteria.department?.length > 0 && (
                      <li className="flex items-start gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition">
                        <Building2 className="text-indigo-500 w-4 h-4 mt-1" />{" "}
                        Departments: {eligibilityCriteria.department.join(", ")}
                      </li>
                    )}
                    {eligibilityCriteria.semester?.length > 0 && (
                      <li className="flex items-start gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition">
                        <GraduationCap className="text-indigo-500 w-4 h-4 mt-1" />{" "}
                        Semesters: {eligibilityCriteria.semester.join(", ")}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 space-y-4 hover:shadow-2xl transition">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  How to Apply
                </h3>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2">
                  <li>Read the eligibility criteria carefully.</li>
                  <li>
                    Prepare necessary documents (ID, transcripts, statements).
                  </li>
                  <li>Click on the Apply button below.</li>
                  <li>Fill out the application form completely.</li>
                  <li>Submit before the deadline.</li>
                </ol>
              </div>

              {isActive ? (
                <Button
                  onClick={() => {
                    const storedUser = JSON.parse(localStorage.getItem("user"));

                    if (!storedUser) {
                      navigate("/login");
                      return;
                    }

                    if (
                      storedUser.role.toLowerCase() === "admin" ||
                      storedUser.role.toLowerCase() === "committee"
                    ) {
                      alert("Only students can apply for scholarships.");
                      return;
                    }
                    navigate(`/scholarships/apply/${scholarship._id}`);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg hover:shadow-2xl transition"
                >
                  Apply Now
                </Button>
              ) : (
                <div className="w-full py-3 rounded-xl bg-gray-200 text-red-600 font-semibold text-center shadow-inner">
                  This scholarship is closed
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipDetailPage;
