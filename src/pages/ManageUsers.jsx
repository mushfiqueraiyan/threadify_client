import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/axiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const USER_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], isFetching } = useQuery({
    queryKey: ["usersManage", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersManage?search=${searchTerm}`);
      return res.data;
    },
    // optional: keepPreviousData: true,
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.patch(`/users/admin/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersManage", searchTerm]);
    },
  });

  const removeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.patch(`/users/remove-admin/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersManage", searchTerm]);
    },
  });

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will get admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId, {
          onSuccess: () => {
            Swal.fire("Success!", "User has been made an admin.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Something went wrong.", "error");
          },
        });
      }
    });
  };

  const handleRemoveAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the user's admin role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAdminMutation.mutate(userId, {
          onSuccess: () => {
            Swal.fire("Success!", "Admin role removed.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Something went wrong.", "error");
          },
        });
      }
    });
  };

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / USER_PER_PAGE);
  const startIdx = (currentPage - 1) * USER_PER_PAGE;
  const endIdx = startIdx + USER_PER_PAGE;
  const visibleUsers = users.slice(startIdx, endIdx);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />

      {isFetching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <span className="loading loading-spinner loading-lg text-blue-400"></span>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Subscription
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleUsers.length === 0 && searchTerm && !isFetching && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-red-500">
                  No users found
                </td>
              </tr>
            )}
            {visibleUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <img
                    src={
                      user.photo ||
                      "https://ui-avatars.com/api/?name=" + user.name
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.badge === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.badge}
                  </span>
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          {/* Summary */}
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {startIdx + 1}-{Math.min(endIdx, totalUsers)}
            </span>{" "}
            of <span className="font-medium">{totalUsers}</span>
          </div>

          {/* Simple Page Links */}
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 cursor-pointer rounded bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1  rounded ${
                  currentPage === i + 1
                    ? "bg-blue-300 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 cursor-pointer rounded bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
