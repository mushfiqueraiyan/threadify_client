import React, { useState } from "react";

import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FacebookIcon, FacebookShareButton } from "react-share";
import useAxiosSecure from "../../hooks/axiosSecure";

const SinglePost = () => {
  const post = useLoaderData();
  const { user, loader } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [commentText, setCommentText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  if (loader) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        <p>Post not found.</p>
      </div>
    );
  }

  const {
    _id,
    authorImage,
    authorName,
    postTitle,
    postDescription,
    tag,
    create_at,
    upVote,
    downVote,
  } = post;

  const [localUpVote, setLocalUpVote] = useState(Number(upVote) || 0);
  const [localDownVote, setLocalDownVote] = useState(Number(downVote) || 0);

  const formattedDate = create_at
    ? new Date(create_at).toLocaleString()
    : "Unknown time";

  const shareUrl = `http://localhost:5173/posts/${_id}`;

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${_id}/comments`);
      return res.data;
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post(`/posts/${_id}/comments`, {
        commentText,
        authorEmail: user.email,
        createdAt: new Date(),
        name: user.displayName,
        photo: user.photoURL,
        postTitle: postTitle,
      });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries(["comments", _id]);
      refetch();
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (type) => {
      await axiosSecure.patch(`/posts/${_id}/vote`, { type });
    },
    onMutate: async (type) => {
      if (type === "upvote") {
        setLocalUpVote((prev) => prev + 1);
      } else {
        setLocalDownVote((prev) => prev + 1);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      refetch(); // Refresh everything
    },
  });

  const WORD_LIMIT = 150;
  const words = (postDescription || "").split(/\s+/);

  const isLong = words.length > WORD_LIMIT;

  const displayedText = isExpanded
    ? postDescription
    : words.slice(0, WORD_LIMIT).join(" ") + (isLong ? "..." : "");

  const navigate = useNavigate();

  const likeForLogin = () => {
    if (!user) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?returnTo=${encodeURIComponent(currentPath)}`);
      return;
    }
  };

  return (
    <div className="p-8">
      <section className="max-w-7xl mx-auto p-4 md:p-8   rounded-lg shadow ">
        {/* Author Header */}
        <header className="flex items-center gap-3 border-b border-b-[#c4daff] pb-4 mb-4">
          <img
            src={authorImage || "https://i.ibb.co/2FsfXqM/default-user.png"}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium ">{authorName}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </header>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold  mb-3">{postTitle}</h1>

        {/* Description */}
        <p className="text-gray-400 whitespace-pre-line mb-4 leading-relaxed">
          {displayedText}

          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 cursor-pointer hover:underline text-sm mt-2"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          )}
        </p>

        {/* Tag */}
        <div className="mb-4">
          <span className="inline-block bg-blue-50 text-[#83b0ff] px-3 py-1 rounded-full text-xs font-medium">
            #{tag}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-t-[#c4daff] pt-4 mt-6  text-sm">
          {user ? (
            <>
              <div className="flex gap-4">
                <button
                  onClick={() => voteMutation.mutate("upvote")}
                  className="flex cursor-pointer items-center gap-1 hover:text-green-600 transition"
                >
                  <ThumbsUp size={18} />{" "}
                  <span className="font-medium">{localUpVote}</span>
                </button>
                <button
                  onClick={() => voteMutation.mutate("downvote")}
                  className="flex cursor-pointer items-center gap-1 hover:text-red-600 transition"
                >
                  <ThumbsDown size={18} />{" "}
                  <span className="font-medium">{localDownVote}</span>
                </button>
              </div>

              <FacebookShareButton url={shareUrl}>
                <div className="flex cursor-pointer items-center gap-1 hover:text-blue-600 transition">
                  <FacebookIcon size={20} round /> <span>Share</span>
                </div>
              </FacebookShareButton>
            </>
          ) : (
            <>
              <div className="flex gap-4">
                <button
                  onClick={likeForLogin}
                  className="flex cursor-pointer items-center gap-1 hover:text-green-600 transition"
                >
                  <ThumbsUp size={18} />{" "}
                  <span className="font-medium">{localUpVote}</span>
                </button>
                <button
                  onClick={likeForLogin}
                  className="flex cursor-pointer items-center gap-1 hover:text-red-600 transition"
                >
                  <ThumbsDown size={18} />{" "}
                  <span className="font-medium">{localDownVote}</span>
                </button>
              </div>

              <div
                onClick={likeForLogin}
                className="flex cursor-pointer items-center gap-1 hover:text-blue-600 transition"
              >
                <FacebookIcon size={20} round /> <span>Share</span>
              </div>
            </>
          )}
        </div>

        {/* Comments Section */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>

          {user?.email ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (commentText.trim()) {
                  addCommentMutation.mutate();
                }
              }}
              className="flex flex-col gap-2 mb-6"
            >
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="border border-[#c4daff] rounded-lg p-3 w-full focus:outline-none focus:ring focus:border-blue-300 resize-none"
                rows={3}
              />
              <button
                type="submit"
                className="self-end px-4 py-2 bg-[#5c97ff] cursor-pointer text-white rounded hover:bg-[#8fb8ff] transition"
              >
                Comment
              </button>
            </form>
          ) : (
            <p className="text-gray-500">Login to add a comment.</p>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              <h1 className="font-bold text-4xl my-4">Comments</h1>
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="flex mt-3 items-center gap-2 bg-blue-100 p-2 rounded-2xl"
                >
                  <div>
                    <img src={c.photo} className="w-10 h-10 rounded-full" />
                  </div>
                  <div>
                    <li className="py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-black">{c.name}</p>{" "}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(c.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-gray-800 whitespace-pre-line">
                        {c.commentText}
                      </p>
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
};

export default SinglePost;
