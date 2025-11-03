import React, { useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  FileText,
  Award,
  UserCheck,
  Send,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);

  useEffect(() => {
    const resources = ["applications", "scholarships", "users", "evaluations"];
    resources.forEach((r) => dispatch(fetchResources({ resource: r })));
  }, [dispatch]);

  const { allStudents, committees, applications, evaluations } = useMemo(() => {
    const users = data?.users || [];
    const apps = data?.applications || [];
    const evaluations = data?.evaluations || [];

    return {
      allStudents: users.filter((u) => u.role === "STUDENT"),
      committees: users.filter((u) => u.role === "COMMITTEE"),
      applications: apps,
      evaluations: evaluations,
    };
  }, [data]);

  const approvedApplications = useMemo(
    () => applications.filter((a) => a?.status === "approved"),
    [applications]
  );

  const submittedApplications = useMemo(
    () => applications.filter((a) => a?.status === "submitted"),
    [applications]
  );

  const rejectedApplications = useMemo(
    () => applications.filter((a) => a?.status === "rejected"),
    [applications]
  );

  const pendingApplications = useMemo(
    () =>
      applications.filter(
        (a) => a?.status === "evaluated" || a?.status === "under_review"
      ),
    [applications]
  );

  const committeeData = useMemo(() => {
    return committees.map((member) => {
      const count = evaluations.filter(
        (ev) => ev.committeeMemberId === member._id
      ).length;

      return { name: member.name, evaluated: count };
    });
  }, [committees, evaluations]);

  const monthlyData = useMemo(() => {
    // helper: month name array
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // base object for all months (0–11)
    const data = months.map((m) => ({
      month: m,
      applications: 0,
      newStudents: 0,
    }));

    // count applications per month
    applications.forEach((app) => {
      const monthIndex = new Date(app.createdAt).getMonth();
      data[monthIndex].applications += 1;
    });

    // count new students per month
    allStudents.forEach((std) => {
      const monthIndex = new Date(std.createdAt).getMonth();
      data[monthIndex].newStudents += 1;
    });

    return data;
  }, [applications, allStudents]);

  if (status === "loading")
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading applications...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load data. Please try again.
      </div>
    );

  const stats = [
    {
      title: "Total Students",
      value: allStudents.length,
      color: "from-blue-500 to-indigo-500",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Total Applications",
      value: applications.length,
      color: "from-purple-500 to-pink-500",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: "Total Scholarships",
      value: data?.scholarships?.length,
      color: "from-green-400 to-emerald-500",
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: "Committee Members",
      value: committees.length,
      color: "from-yellow-400 to-orange-500",
      icon: <UserCheck className="w-8 h-8" />,
    },
    {
      title: "Submitted",
      value: submittedApplications.length,
      color: "from-sky-500 to-blue-600",
      icon: <Send className="w-8 h-8" />,
    },
    {
      title: "Approved",
      value: approvedApplications.length,
      color: "from-emerald-500 to-green-600",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      title: "Rejected",
      value: rejectedApplications.length,
      color: "from-rose-500 to-red-500",
      icon: <XCircle className="w-8 h-8" />,
    },
    {
      title: "Pending",
      value: pendingApplications.length,
      color: "from-amber-400 to-yellow-500",
      icon: <Clock className="w-8 h-8" />,
    },
  ];

  const ratioData = [
    { name: "Approved", value: approvedApplications.length },
    { name: "Rejected", value: rejectedApplications.length },
    { name: "Pending", value: pendingApplications.length },
  ];

  const COLORS = ["#10B981", "#EF4444", "#FBBF24"];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="overflow-x-auto p-2 hide-scrollbar mb-10">
        <div className="flex gap-5 px-3 min-w-max">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`flex-shrink-0 w-64 h-64 relative rounded-2xl bg-gradient-to-br ${item.color} shadow-md text-white p-6
        flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className=" uppercase tracking-wide opacity-90 font-semibold">
                  {item.title}
                </h2>
                <div className="bg-white/20 p-3 rounded-xl">{item.icon}</div>
              </div>

              {/* Value */}
              <div className="flex flex-col justify-center items-center flex-1">
                <p className="text-5xl font-extrabold drop-shadow-lg">
                  {item.value?.toLocaleString()}
                </p>
              </div>

              {/* Footer Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Committee Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Committee Member Activity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={committeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Bar dataKey="evaluated" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow ">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Approval vs Rejection Ratio
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={ratioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {ratioData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Monthly Application & New Student Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="newStudents"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
