import React, { useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsById } from "@/redux/slices/resourcesSLice";

export const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { data} = useSelector((state) => state.resources);

  
  const storedUser = localStorage.getItem("user");
  const student = storedUser ? JSON.parse(storedUser) : null;
  const studentId = student?._id || student?.id;

  
  useEffect(() => {
    if (studentId) {
      dispatch(fetchApplicationsById(studentId));
    }
  }, [dispatch, studentId]);

  const stats = useMemo(() => {
    const applications = data?.applicationsById || [];
    const total = applications.length || 0;
    const submitted = applications.filter((a) => a.status === "submitted").length;
    const approved = applications.filter((a) => a.status === "approved").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    const pending = applications.filter(
      (a) => a.status === "under_review" || a.status === "evaluated"
    ).length;

    return { total, submitted, approved, rejected, pending,applications };
  }, [data]);

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Under Review", value: stats.pending },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Student Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          {
            title: "Total Applications",
            value: stats.total,
            color: "from-blue-400 to-blue-600",
            icon: <BookOpen size={26} />,
          },
          {
            title: "Approved",
            value: stats.approved,
            color: "from-green-400 to-green-600",
            icon: <CheckCircle size={26} />,
          },
          {
            title: "Rejected",
            value: stats.rejected,
            color: "from-red-400 to-red-600",
            icon: <XCircle size={26} />,
          },
          {
            title: "Under Review",
            value: stats.pending,
            color: "from-yellow-400 to-yellow-600",
            icon: <Clock size={26} />,
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`w-64 h-56 rounded-2xl bg-gradient-to-br ${item.color} shadow-md text-white p-6 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <h2 className="uppercase tracking-wide opacity-90 font-semibold">
                {item.title}
              </h2>
              <div className="bg-white/20 p-3 rounded-xl">{item.icon}</div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1">
              <p className="text-5xl font-extrabold drop-shadow-lg">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Application Status Overview
        </h2>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
