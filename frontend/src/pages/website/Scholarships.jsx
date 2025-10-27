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

  const handleApplyFilters = () => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setAppliedFilters(filters);
      setLoading(false);
    }, 3000);
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
    { value: "Special", label: "Special" },
    { value: "Other", label: "Other" },
  ];

  const filteredScholarships = data?.scholarships?.filter((scholarship) => {
    const { category, minGPA, maxGPA, maxIncome } = appliedFilters;
    let isMatch = true;

    if (category && scholarship.category !== category) {
      isMatch = false;
    }
    if (
      minGPA &&
      (typeof scholarship.eligibilityCriteria?.minGPA !== "number" ||
        scholarship.eligibilityCriteria.minGPA < parseFloat(minGPA))
    ) {
      isMatch = false;
    }
    if (
      maxGPA &&
      (typeof scholarship.eligibilityCriteria?.minGPA !== "number" ||
        scholarship.eligibilityCriteria.minGPA > parseFloat(maxGPA))
    ) {
      isMatch = false;
    }
    if (
      maxIncome &&
      (typeof scholarship.eligibilityCriteria?.maxIncome !== "number" ||
        scholarship.eligibilityCriteria.maxIncome > parseFloat(maxIncome))
    ) {
      isMatch = false;
    }

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

  const successStories = [
    {
      quote:
        "اس پلیٹ فارم کی بدولت میں اپنی ٹیوشن فیس ادا کرنے میں کامیاب ہوا۔ آپ کا بہت شکریہ!",
      author: "فاطمہ احمد",
      field: "کمپیوٹر سائنس",
    },
    {
      quote: "درخواست کا عمل بہت آسان اور سیدھا تھا۔ میں سب کو اس کی سفارش کروں گا۔",
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
      quote: "یہاں موجود اسکالرشپس کی اقسام حیرت انگیز ہیں۔ ہر کسی کے لیے کچھ نہ کچھ ہے۔",
      author: "بلال حسین",
      field: "بزنس ایڈمنسٹریشن",
    },
    {
      quote: "سپورٹ ٹیم بہت مددگار تھی۔ انہوں نے میرے تمام سوالات کے جوابات دیئے۔",
      author: "زینب ملک",
      field: "آرٹس اینڈ ہیومینٹیز",
    },
  ];

  const [currentStory, setCurrentStory] = useState(0);

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
            <div className="my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DropDown
                  label="Category"
                  options={categoryOptions}
                  selectedValue={filters.category}
                  onChange={handleDropdownChange}
                  required={false}
                />
                <InputField
                  label="Min GPA"
                  name="minGPA"
                  type="number"
                  placeholder="e.g., 3.0"
                  value={filters.minGPA}
                  onChange={handleFilterChange}
                  required={false}
                />
                <InputField
                  label="Max GPA"
                  name="maxGPA"
                  type="number"
                  placeholder="e.g., 4.0"
                  value={filters.maxGPA}
                  onChange={handleFilterChange}
                  required={false}
                />
                <InputField
                  label="Max Income"
                  name="maxIncome"
                  type="number"
                  placeholder="e.g., 50000"
                  value={filters.maxIncome}
                  onChange={handleFilterChange}
                  required={false}
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  color="blue"
                  className="flex items-center gap-2"
                >
                  <FaTimes /> Clear Filters
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  color="blue"
                  className="flex items-center gap-2"
                >
                  <FaSearch /> Apply Filters
                </Button>
              </div>
            </div>

            <div className="grid 2xl:grid-cols-2 gap-6 justify-center mt-10">
              {status === "loading" && !data.scholarships?.length ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">
                    Loading scholarships...
                  </span>
                </div>
              ) : loading ? (
                <div className="col-span-full flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">
                    Applying filters...
                  </span>
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
                <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-md">
                  <p className="text-gray-600 text-lg">
                    No scholarships found.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
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
                      <p className="text-xs text-yellow-700">
                        {story.field}
                      </p>
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
