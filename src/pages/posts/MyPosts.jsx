import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure";
import Swal from "sweetalert2";

import toast from "react-hot-toast";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  const {
    data: myPosts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading posts. Please try again later.
      </div>
    );
  }

  //console.log(myPosts);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will lose your post and it can't be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8fb8ff",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.delete(`/posts/${id}`);
    console.log(res);

    toast.error(res.data.message);
  };

  const totalPosts = myPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const visiblePosts = myPosts.slice(startIdx, endIdx);

  return (
    <div>
      <div className=" px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Posts</h1>

        {myPosts.length === 0 ? (
          <div className="text-center text-gray-500">
            You have not posted anything yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Post Title
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Up Votes
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Down Votes
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visiblePosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {post.postTitle}
                      </div>
                      <div className="text-sm text-gray-500">{post.tag}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center space-x-2">
                        <span className="text-green-600 font-semibold">
                          {post.upVote}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center space-x-2">
                        <span className="text-red-600 font-semibold">
                          {post.downVote}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                      <Link
                        to={`/dashboard/my-comments/${post._id}`}
                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Comment
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {myPosts.length === 0 ? (
          ""
        ) : (
          <>
            {/* Pagination */}

            <div className="flex items-center justify-between px-4 py-3 mt-5 bg-white  border-gray-200">
              {/* Summary */}
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {startIdx + 1}-{Math.min(endIdx, totalPosts)}
                </span>{" "}
                of <span className="font-medium">{totalPosts}</span>
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 cursor-pointer rounded bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
