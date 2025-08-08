import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/axiosSecure";
import { useNavigate } from "react-router";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const AddAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const announcement = {
        authorImage: user?.photoURL,
        authorName: user?.displayName,
        authorEmail: user?.email,
        title: data.title,
        description: data.description,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/announcements", announcement);
      // console.log(res);

      if (res.data.insertedId) {
        toast.success("Announcement published!");
      }

      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to make announcement. Try again.");
    }
  };

  return (
    <section className=" p-6 bg-white rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center">Make Announcement</h1>

      <div className="flex items-center gap-3 mb-6  pb-4 ">
        <img
          src={user?.photoURL || "https://i.ibb.co/2FsfXqM/default-user.png"}
          alt={user?.displayName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-medium text-gray-900">{user?.displayName}</p>
          <p className="text-xs text-gray-500">
            You're posting this announcement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring ${
              errors.title ? "border-red-500" : "border-[#c4daff]"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Description"
            rows={8}
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring resize-none ${
              errors.description ? "border-red-500" : "border-[#c4daff]"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className=" px-2 flex items-center justify-center gap-3 cursor-pointer bg-[#a1c4ff] text-gray-800 font-medium py-2 rounded-lg hover:bg-[#b0c7f7] transition"
        >
          Make Announcement <Send />
        </button>
      </form>
    </section>
  );
};

export default AddAnnouncement;
