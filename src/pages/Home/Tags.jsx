import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/axiosSecure";
import useTheme from "../../hooks/useTheme";

const TagsSection = () => {
  const axiosSecure = useAxiosSecure();
  const theme = useTheme();
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  return (
    <section
      className={`relative py-12 px-4 md:px-8 lg:px-16 ${
        theme == "light" ? "bg-gradient-to-b from-[#f0f6ff] to-white" : ""
      } overflow-hidden`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold  mb-4">Available Tags</h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Explore and discover popular technologies and topics to boost your
          posts!
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tags.map((tag) => (
            <button
              key={tag._id}
              className="px-4 py-2 md:px-5 md:py-2.5 bg-[#8fb8ff] text-white rounded-full shadow-sm border border-[#8fb8ff]
                hover:bg-white hover:text-[#8fb8ff] hover:border-[#8fb8ff]
                transition-all duration-200 ease-in-out
                hover:shadow-md active:scale-95"
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 h-32 ${
          theme == "light" ? "bg-gradient-to-t from-white to-transparent" : ""
        } pointer-events-none`}
      ></div>
    </section>
  );
};

export default TagsSection;
