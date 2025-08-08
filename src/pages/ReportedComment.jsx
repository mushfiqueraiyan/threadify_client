import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/axiosSecure";

const ReportedComment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const REPORT_PER_PAGE = 10;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reportedComments = [], isLoading } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments/report");
      return res.data;
    },
  });

  const handleAction = (report) => {
    Swal.fire({
      title: "Take Action",
      text: "What do you want to do with this report?",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Delete Comment",
      denyButtonText: `No Issues`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/comments/${report.commentId}`);

        await axiosSecure.patch(`/comments/report/${report._id}`, {
          status: "reported",
        });
        Swal.fire("Deleted!", "Comment has been removed.", "success");
      } else if (result.isDenied) {
        await axiosSecure.patch(`/comments/report/${report._id}`, {
          status: "reported",
        });
        Swal.fire("Marked as No Issues", "", "info");
      }
      queryClient.invalidateQueries(["reportedComments"]);
    });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );

  const totalReport = reportedComments.length;
  const totalPages = Math.ceil(totalReport / REPORT_PER_PAGE);
  const startIdx = (currentPage - 1) * REPORT_PER_PAGE;
  const endIdx = startIdx + REPORT_PER_PAGE;
  const visibleReports = reportedComments.slice(startIdx, endIdx);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reported Comments</h1>
      {reportedComments.length === 0 ? (
        <p>No reported comments found.</p>
      ) : (
        <div className="space-y-4">
          {visibleReports.map((report) => (
            <div
              key={report._id}
              className="border border-gray-300 p-4 rounded drop-shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{report.title}</p>
                <p className="text-gray-600">Comment: {report.comment}</p>
                <p className="text-sm text-red-500">
                  Feedback: {report.feedback}
                </p>
                <p className="text-sm">Status: {report.reportStatus}</p>
              </div>
              <div>
                {report.reportStatus === "pending" ? (
                  <button
                    onClick={() => handleAction(report)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Take Action
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Reported</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        {/* Summary */}
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {startIdx + 1}-{Math.min(endIdx, totalReport)}
          </span>{" "}
          of <span className="font-medium">{totalReport}</span>
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
    </div>
  );
};

export default ReportedComment;
