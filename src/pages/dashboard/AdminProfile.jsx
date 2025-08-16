import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`Count: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");

  // ⚡ Call all hooks unconditionally, always
  const { data: userProfile = {}, isLoading: loadingProfile } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: userCounts = {}, isLoading: loadingCounts } = useQuery({
    queryKey: ["userCounts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userCounts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: siteStats = {}, isLoading: loadingStats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });

  const {
    data: tags = [],
    isLoading: tagsLoading,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const addTagMutation = useMutation({
    mutationFn: async (tag) => {
      await axiosSecure.post("/tags", { name: tag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      setNewTag("");
      refetch();
    },
  });

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      addTagMutation.mutate(newTag.trim());
    }
  };

  // ⏳ Global loading state
  if (!user || loadingProfile || loadingCounts || loadingStats || tagsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  const pieData = [
    { name: "Posts", value: siteStats.totalPosts ?? 0 },
    { name: "Comments", value: siteStats.totalComments ?? 0 },
    { name: "Users", value: siteStats.totalUsers ?? 0 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Profile */}
      <div className="rounded-lg p-6 flex items-center space-x-4 shadow">
        <img
          src={userProfile?.photo || "https://via.placeholder.com/150"}
          alt={userProfile?.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold ">{userProfile?.name}</h2>
          <p className="text-gray-500">{userProfile?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 text-gray-700">
        <div className="p-10 bg-orange-400 rounded-2xl text-xl text-white">
          Posts: {siteStats.totalPosts ?? 0}
        </div>
        <div className="p-10 bg-purple-400 rounded-2xl text-xl text-white">
          Comments: {siteStats.totalComments ?? 0}
        </div>
        <div className="p-10 bg-blue-400 rounded-2xl text-xl text-white">
          Total Users: {siteStats.totalUsers ?? 0}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Site-Wide Stats</h3>
        <div className="w-full h-[700px] lg:h-[400px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  activeShape={renderActiveShape}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Site Stats",
                    Posts: siteStats.totalPosts ?? 0,
                    Comments: siteStats.totalComments ?? 0,
                    Users: siteStats.totalUsers ?? 0,
                  },
                ]}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Posts" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Comments" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Users" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Tag */}
      <div className=" rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Add New Tag</h3>
        <form onSubmit={handleAddTag} className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Add Tag
          </button>
        </form>
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Existing Tags:</h4>
          {tags.length === 0 ? (
            <p className="text-gray-500">No tags yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
