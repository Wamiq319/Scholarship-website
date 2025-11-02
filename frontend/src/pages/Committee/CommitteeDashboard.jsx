import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "@/redux/slices/resourcesSLice";

export const CommitteeDashboard = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.resources);
  const [committeeMember, setCommitteeMember] = useState(null);

  useEffect(() => {
    // get logged in committee member
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCommitteeMember(JSON.parse(storedUser));

    // fetch needed resources
    dispatch(fetchResources({ resource: "applications" }));
    dispatch(fetchResources({ resource: "evaluations" }));
  }, [dispatch]);

  const { applications, evaluations } = useMemo(() => {
    return {
      applications: data?.applications || [],
      evaluations: data?.evaluations || [],
    };
  }, [data]);

  const myEvaluations = useMemo(() => {
    if (!committeeMember) return [];
    return evaluations.filter(
      (ev) => ev.committeeMemberId === committeeMember._id
    );
  }, [evaluations, committeeMember]);

  const evaluatedApps = myEvaluations.map((e) => e.applicationId);
  const totalAssigned = applications.length;
  const totalEvaluated = evaluatedApps.length;
  const totalPending = totalAssigned - totalEvaluated;

  const monthlyTrend = useMemo(() => {
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
    const data = months.map((m) => ({ month: m, evaluations: 0 }));
    myEvaluations.forEach((ev) => {
      const month = new Date(ev.createdAt).getMonth();
      data[month].evaluations += 1;
    });
    return data;
  }, [myEvaluations]);

  if (status === "loading")
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
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
      title: "Assigned Applications",
      value: totalAssigned,
      color: "from-blue-500 to-indigo-500",
      icon: <ClipboardList className="w-8 h-8" />,
    },
    {
      title: "Evaluated Applications",
      value: totalEvaluated,
      color: "from-green-400 to-emerald-500",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      title: "Pending Evaluations",
      value: totalPending < 0 ? 0 : totalPending,
      color: "from-amber-400 to-yellow-500",
      icon: <Clock className="w-8 h-8" />,
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Committee Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="flex justify-center flex-wrap gap-6 lg:gap-14 mb-10">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`w-64 h-64 rounded-2xl bg-gradient-to-br ${item.color} shadow-md text-white p-6 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl`}
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
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Monthly Evaluation Activity
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ borderRadius: "10px" }} />
            <Legend />
            <Bar dataKey="evaluations" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
