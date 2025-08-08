import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure";
import useUserData from "../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userData } = useUserData();

  const { data: postCount = 0, isLoading: isPostLoading } = useQuery({
    queryKey: ["postCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://threadify-server.vercel.app/usersPost?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: tags = [], isLoading: isTagLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const postInfo = {
      ...data,
      create_at: new Date().toISOString(),
    };

    axiosSecure
      .post("/posts", postInfo)
      .then(() => {
        reset();
        toast.success("Posted 🥳");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to post");
      });
  };

  // Wait for all required data before rendering
  if (isPostLoading || isTagLoading || !userData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  const hasReachedLimit = userData !== "Gold" && postCount >= 5;

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Add New Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Author Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Author Image URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("authorImage")}
            defaultValue={user?.photoURL}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            {...register("authorName", { required: "Name is required" })}
            className="w-full rounded-lg border px-4 py-3"
          />
          {errors.authorName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.authorName.message}
            </p>
          )}
        </div>

        {/* Author Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Author Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            {...register("authorEmail")}
            readOnly
            className="w-full rounded-lg border px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            {...register("postTitle", { required: "Post title is required" })}
            className="w-full rounded-lg border px-4 py-3"
          />
          {errors.postTitle && (
            <p className="text-red-600 text-sm mt-1">
              {errors.postTitle.message}
            </p>
          )}
        </div>

        {/* Post Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Post Description
          </label>
          <textarea
            rows={5}
            {...register("postDescription", {
              required: "Post description is required",
            })}
            className="w-full rounded-lg border px-4 py-3 resize-none"
          />
          {errors.postDescription && (
            <p className="text-red-600 text-sm mt-1">
              {errors.postDescription.message}
            </p>
          )}
        </div>

        {/* Tag Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tag
          </label>
          <select
            {...register("tag", { required: "Tag is required" })}
            defaultValue=""
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="" disabled>
              Select a tag
            </option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tag && (
            <p className="text-red-600 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        {/* Votes */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              UpVote (Default 0)
            </label>
            <input
              type="number"
              {...register("upVote")}
              value={0}
              readOnly
              className="w-full rounded-lg border px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              DownVote (Default 0)
            </label>
            <input
              type="number"
              {...register("downVote")}
              value={0}
              readOnly
              className="w-full rounded-lg border px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit or Membership */}
        {hasReachedLimit ? (
          <Link
            to={"/membership"}
            className="w-full block text-center bg-[#6ca2ff] hover:bg-[#8fb8ff] text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Please buy Membership for more posts
          </Link>
        ) : (
          <button
            type="submit"
            className="w-full bg-[#6ca2ff] hover:bg-[#8fb8ff] text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Submit Post
          </button>
        )}
      </form>
    </div>
  );
};

export default AddPost;
