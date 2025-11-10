import React, { useEffect, useState } from "react";
import {
  Card,
  Footer,
  Navbar,
  DropDown,
  InputField,
  Button,
  Pagination,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaLightbulb,
  FaCheckCircle,
  FaRocket,
  FaPen,
  FaDatabase,
  FaStream,
  FaUserGraduate,
  FaGift,
  FaQuoteLeft,
} from "react-icons/fa";

const Scholarships = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.resources);

  const initialFilters = {
    category: "",
    minGPA: "",
    maxGPA: "",
    maxIncome: "",
    search: "",
    scope: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 4;

  useEffect(() => {
    dispatch(fetchResources({ resource: "scholarships" }));
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };
  const handleScopeDropdownChange = (e) => {
    setFilters((prev) => ({ ...prev, scope: e.target.value }));
  };

  const handleApplyFilters = () => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setAppliedFilters(filters);
      setLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  const categoryOptions = [
    { value: "", label: "All" },
    { value: "Need-based", label: "Need-based" },
    { value: "Merit-based", label: "Merit-based" },
    { value: "PEEF", label: "PEEF" },
    { value: "Other", label: "Other" },
  ];

  const filteredScholarships = data?.scholarships?.filter((scholarship) => {
    const { category, minGPA, maxGPA, maxIncome, search, scope } =
      appliedFilters;
    let isMatch = true;

    if (category && scholarship.category !== category) isMatch = false;
    if (minGPA && scholarship.eligibilityCriteria?.minGPA < parseFloat(minGPA))
      isMatch = false;
    if (maxGPA && scholarship.eligibilityCriteria?.minGPA > parseFloat(maxGPA))
      isMatch = false;
    if (
      maxIncome &&
      scholarship.eligibilityCriteria?.maxIncome > parseFloat(maxIncome)
    )
      isMatch = false;
    if (
      search &&
      !scholarship.title?.toLowerCase().includes(search.toLowerCase())
    )
      isMatch = false;

    if (
      scope &&
      String(scholarship.scope || "").toLowerCase() !==
        String(scope).toLowerCase()
    )
      isMatch = false;

    return isMatch;
  });

  const totalPages = Math.ceil(
    (filteredScholarships?.length || 0) / scholarshipsPerPage
  );
  const currentScholarships = filteredScholarships?.slice(
    (currentPage - 1) * scholarshipsPerPage,
    currentPage * scholarshipsPerPage
  );

  const actions = [
    {
      label: "Expires in",
      type: "text",
      valueKey: "deadline",
      format: "daysLeft",
    },
    {
      label: "Explore",
      type: "button",
      onClick: (scholarship) => {
        navigate(`/scholarship/details/${scholarship._id}`);
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

  const successStories = [
    {
      quote:
        "اس پلیٹ فارم کی بدولت میں اپنی ٹیوشن فیس ادا کرنے میں کامیاب ہوا۔ آپ کا بہت شکریہ!",
      author: "فاطمہ احمد",
      field: "کمپیوٹر سائنس",
    },
    {
      quote:
        "درخواست کا عمل بہت آسان اور سیدھا تھا۔ میں سب کو اس کی سفارش کروں گا۔",
      author: "علی رضا",
      field: "انجینئرنگ",
    },
    {
      quote:
        "مجھے یقین نہیں تھا کہ مجھے اسکالرشپ مل سکتی ہے، لیکن اس ویب سائٹ نے اسے ممکن بنایا۔",
      author: "عائشہ خان",
      field: "میڈیکل سائنسز",
    },
    {
      quote:
        "یہاں موجود اسکالرشپس کی اقسام حیرت انگیز ہیں۔ ہر کسی کے لیے کچھ نہ کچھ ہے۔",
      author: "بلال حسین",
      field: "بزنس ایڈمنسٹریشن",
    },
    {
      quote:
        "سپورٹ ٹیم بہت مددگار تھی۔ انہوں نے میرے تمام سوالات کے جوابات دیئے۔",
      author: "زینب ملک",
      field: "آرٹس اینڈ ہیومینٹیز",
    },
  ];

  const [currentStory, setCurrentStory] = useState(0);
  // Check if any filter has a value
  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [successStories.length]);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              Scholarship
            </span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore{" "}
            <span className="font-bold text-yellow-500">
              thousands of scholarships
            </span>{" "}
            to fund your education. Use the filters below to narrow down your
            search.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Search + Filters Section */}
            <section className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 space-y-6">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:flex-1">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search scholarships by name..."
                    className="w-full border border-gray-200 rounded-xl px-10 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                    value={filters.search || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  onClick={handleApplyFilters}
                  color="blue"
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <FaSearch /> Search
                </Button>
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <DropDown
                  label="Category"
                  options={categoryOptions}
                  selectedValue={filters.category}
                  onChange={handleDropdownChange}
                />
                <DropDown
                  label="Scope"
                  options={[
                    { value: "", label: "All" },
                    { value: "national", label: "National" },
                    { value: "international", label: "International" },
                  ]}
                  selectedValue={filters.scope}
                  onChange={handleScopeDropdownChange}
                />

                <InputField
                  label="Min GPA"
                  name="minGPA"
                  type="number"
                  placeholder="e.g. 3.0"
                  value={filters.minGPA}
                  onChange={handleFilterChange}
                />
                <InputField
                  label="Max GPA"
                  name="maxGPA"
                  type="number"
                  placeholder="e.g. 4.0"
                  value={filters.maxGPA}
                  onChange={handleFilterChange}
                />
                <InputField
                  label="Max Income"
                  name="maxIncome"
                  type="number"
                  placeholder="e.g. 50000"
                  value={filters.maxIncome}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end flex-wrap gap-3 pt-2">
                {hasActiveFilters && (
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    color="blue"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition"
                  >
                    <FaTimes /> Clear
                  </Button>
                )}

                <Button
                  onClick={handleApplyFilters}
                  color="blue"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <FaSearch /> Apply Filters
                </Button>
              </div>
            </section>

            {/* Scholarships List */}
            <div className="grid xl:grid-cols-2 gap-6 mt-10">
              {status === "loading" && !data.scholarships?.length ? (
                <div className="flex justify-center items-center py-10 text-gray-600">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                  Loading scholarships...
                </div>
              ) : loading ? (
                <div className="flex justify-center items-center py-10 text-gray-600">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                  Applying filters...
                </div>
              ) : currentScholarships?.length > 0 ? (
                currentScholarships.map((scholarship) => (
                  <Card
                    key={scholarship._id}
                    scholarship={scholarship}
                    fields={fields}
                    actions={actions}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-gray-700 font-medium text-lg">
                    No scholarships found
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try adjusting your filters or check back later.
                  </p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg border border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" /> Application Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Read eligibility criteria carefully.</span>
                </li>
                <li className="flex items-start">
                  <FaPen className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Write a compelling personal statement.</span>
                </li>
                <li className="flex items-start">
                  <FaRocket className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Submit your application before the deadline.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRocket className="text-purple-600" /> Why Choose Us?
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <FaDatabase className="text-blue-500 flex-shrink-0" />
                  <span>Vast Database of Scholarships</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaStream className="text-blue-500 flex-shrink-0" />
                  <span>Easy Application Process</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaUserGraduate className="text-blue-500 flex-shrink-0" />
                  <span>Expert Guidance & Tips</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaGift className="text-blue-500 flex-shrink-0" />
                  <span>Completely Free Service</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg border border-yellow-200 relative overflow-hidden">
              <FaQuoteLeft className="absolute -top-2 -left-2 text-yellow-200 text-8xl opacity-50" />
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center relative z-10">
                کامیابی کی کہانیاں
              </h3>
              <div className="relative h-48">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className={`absolute w-full transition-opacity duration-1000 ${
                      index === currentStory ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ direction: "rtl" }}
                  >
                    <div className="pr-4 text-right">
                      <p className="text-md text-gray-700 italic mb-3">
                        "{story.quote}"
                      </p>
                      <p className="text-sm font-bold text-yellow-800">
                        - {story.author}
                      </p>
                      <p className="text-xs text-yellow-700">{story.field}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-tr from-purple-700 to-blue-600 text-white rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
              <p className="text-sm mb-4">
                Our team is here to assist you with any questions about the
                application process.
              </p>
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                color="white"
              >
                Contact Us
              </Button>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scholarships;
