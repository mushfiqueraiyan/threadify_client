import React, { useState } from "react";
import useAxiosSecure from "../../hooks/axiosSecure";
import { Loader2, ThumbsUp, MessageCircle, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const POSTS_PER_PAGE = 5;

const AllPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["posts", sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllPosts?sort=${sort}&page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const posts = data?.posts ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <section className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Forum Posts
      </h1>

      <div className="flex px-2 md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => {
            setSort(sort === "newest" ? "popularity" : "newest");
            setPage(1);
          }}
          className="px-4 flex items-center cursor-pointer py-2 bg-[#679eff] text-white rounded-full hover:bg-[#8fb8ff] transition"
        >
          <ChevronsUpDown /> Sort by:{" "}
          {sort === "newest" ? "Newest" : "Popularity"}
        </button>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 cursor-pointer border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="text-center flex justify-center items-center h-100">
          <span className="loading text-center loading-spinner loading-lg text-blue-400"></span>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center">Error: {error.message}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-3 ">
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className="w-100 border border-[#8fb8ffb4] rounded-lg shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        post.authorImage ||
                        "https://i.ibb.co/2FsfXqM/default-user.png"
                      }
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{post.authorName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.create_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-bold ">{post.postTitle}</h2>
                <p className="text-gray-500 line-clamp-3">
                  {post.postDescription}
                </p>

                <div className="flex justify-between items-center mt-3  text-sm">
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} /> {post.commentsCount ?? 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={16} /> {post.upVote - post.downVote}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPosts;
