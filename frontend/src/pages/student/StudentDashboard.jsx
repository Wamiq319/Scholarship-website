import React, { useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsById } from "@/redux/slices/resourcesSLice";
import dayjs from "dayjs";

export const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.resources);

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
    const submitted = applications.filter(
      (a) => a.status === "submitted"
    ).length;
    const approved = applications.filter((a) => a.status === "approved").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    const pending = applications.filter(
      (a) => a.status === "under_review" || a.status === "evaluated"
    ).length;

    return { total, submitted, approved, rejected, pending, applications };
  }, [data]);

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Under Review", value: stats.pending },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  const dailyActivityData = useMemo(() => {
    const applications = data?.applicationsById || [];
    const allTracking = applications.flatMap((a) => a.tracking || []);

    // Create last 7 days range (Mon–Sun type format)
    const today = dayjs();
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      today.subtract(6 - i, "day")
    );

    // Count activities for each day
    const activityMap = last7Days.map((day) => {
      const dateStr = day.format("YYYY-MM-DD");
      const count = allTracking.filter((t) =>
        dayjs(t.updatedAt).isSame(dateStr, "day")
      ).length;

      return {
        date: day.format("ddd"), // e.g. Mon, Tue
        activityCount: count,
      };
    });

    return activityMap;
  }, [data]);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 xl:px-24 py-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-800">
    Student Dashboard
  </h1>

  {/* Stat Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1600px] mb-14">
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
        className={`w-full h-56 md:h-60 rounded-2xl bg-gradient-to-br ${item.color}
          shadow-md text-white p-5 flex flex-col justify-between
          transition-transform duration-300 hover:scale-[1.04] hover:shadow-2xl`}
      >
        <div className="flex items-center justify-between">
          <h2 className="uppercase tracking-wide opacity-90 font-semibold">
            {item.title}
          </h2>
          <div className="bg-white/20 p-3 rounded-xl">{item.icon}</div>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Charts Section */}
  <div className="w-full max-w-[1600px] grid grid-cols-1 xl:grid-cols-2 gap-10">
    {/* Pie Chart */}
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-700 text-center">
        Application Status Overview
      </h2>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[420px] flex justify-center">
        <ResponsiveContainer width="95%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Activity Line Chart */}
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-700 text-center">
        System Activity for Your Applications (Last 7 Days)
      </h2>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyActivityData}
            margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#4f46e5", fontSize: 12 }}
              axisLine={{ stroke: "#6366f1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#4f46e5", fontSize: 12 }}
              axisLine={{ stroke: "#6366f1" }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
                border: "1px solid #c7d2fe",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#4338ca", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Line
              type="monotone"
              dataKey="activityCount"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{
                fill: "#3b82f6",
                r: 5,
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 8,
                fill: "#2563eb",
                strokeWidth: 3,
                stroke: "#fff",
              }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</div>

  );
};
