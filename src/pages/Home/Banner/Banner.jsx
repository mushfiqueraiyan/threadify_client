import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/axiosSecure";
import { Link } from "react-router";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: search = [],
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchResult", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
      return res.data ?? [];
    },
    keepPreviousData: true,
  });

  return (
    <div className="relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/hand-drawn-abstract-doodle-background_23-2149337428.jpg?semt=ais_hybrid&w=740')",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-1 flex flex-col items-center justify-center text-center py-16 md:py-24 px-4 backdrop-blur-sm bg-white/60">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
          Your Forum Community
        </h1>
        <p className="text-gray-600 md:text-lg max-w-2xl mb-8">
          Connect. Share. Grow. Collaborate with developers and teams worldwide.
        </p>

        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search topics, tags, or posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-lg pl-12 py-4 text-black rounded-full border border-gray-200 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 bg-white/80 backdrop-blur-md"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={24}
          />

          {/* Suggestion Dropdown */}
          {(isFetching || isError || search.length > 0 || searchTerm) && (
            <div className="absolute w-full mt-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {isFetching && (
                <div className="p-4 text-blue-500 text-center animate-pulse">
                  Searching...
                </div>
              )}
              {isError && (
                <div className="p-4 text-red-500 text-center">
                  Error: {error.message}
                </div>
              )}

              {search.length > 0 && (
                <ul className="max-h-72 overflow-x-auto text-left">
                  {search.map((post) => (
                    <Link key={post._id} to={`/posts/${post._id}`}>
                      <li className="flex items-center gap-4 p-4 hover:bg-blue-50 transition cursor-pointer border-b last:border-b-0">
                        <img
                          src={
                            post.authorImage ||
                            "https://i.ibb.co/2FsfXqM/default-user.png"
                          }
                          alt="author"
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 truncate">
                            {post.postTitle}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {post.postDescription.slice(0, 60)}...
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}

              {!isFetching && !isError && search.length === 0 && searchTerm && (
                <div className="p-4 text-gray-500 text-center">
                  No results found for &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
