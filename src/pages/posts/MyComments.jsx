import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/axiosSecure";
import toast from "react-hot-toast";

const MyComments = () => {
  const { id } = useParams();
  const [commentReports, setCommentReports] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 10;

  const axiosSecure = useAxiosSecure();

  const comments = useLoaderData();

  const handleFeedbackChange = (commentId, feedback) => {
    setCommentReports((prevReports) => ({
      ...prevReports,
      [commentId]: { ...prevReports[commentId], feedback, reported: false },
    }));
  };

  const handleReportComment = async (comment) => {
    const commentId = comment._id;
    const feedback = commentReports[commentId]?.feedback;

    const commentReport = {
      commentId: comment._id,
      title: comment.postTitle,
      comment: comment.commentText,
      commenterEmail: comment.authorEmail,
      feedback: feedback,
      reportStatus: "pending",
    };

    const res = await axiosSecure.post("/comments/report", commentReport);

    if (res.data.insertedId) {
      toast.success("Reported sent!");
      setCommentReports((prevReports) => ({
        ...prevReports,
        [commentId]: { ...prevReports[commentId], reported: true }, // Set reported to true
      }));
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-500">
        No comments found for this post.
      </div>
    );
  }

  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);
  const startIdx = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIdx = startIdx + COMMENTS_PER_PAGE;
  const visibleComments = comments.slice(startIdx, endIdx);

  return (
    <div>
      <div>
        <div className="  px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            My Comments
          </h1>

          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commenter Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment Text
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleComments.map((comment) => {
                  const rep = commentReports[comment._id] || {};
                  return (
                    <tr
                      key={comment._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {comment.authorEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-700">
                        {comment.commentText.trim()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          className="mt-1 block w-full py-1 px-2 border border-gray-300 rounded text-sm"
                          value={rep.feedback || ""}
                          onChange={(e) =>
                            handleFeedbackChange(comment._id, e.target.value)
                          }
                          disabled={rep.reported}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="Inappropriate Content">
                            Inappropriate Content
                          </option>
                          <option value="Spam/Promotional">
                            Spam/Promotional
                          </option>
                          <option value="Misleading Information">
                            Misleading Information
                          </option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleReportComment(comment)}
                          disabled={!rep.feedback || rep.reported}
                          className={`px-3 py-1 rounded text-sm font-medium transition ${
                            !rep.feedback || rep.reported
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {rep.reported ? "Reported" : "Report"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {format(new Date(comment.createdAt), "PPp")}
                      </td>
                    </tr>
                  );
                })}
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
                  {startIdx + 1}-{Math.min(endIdx, totalComments)}
                </span>{" "}
                of <span className="font-medium">{totalComments}</span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComments;
