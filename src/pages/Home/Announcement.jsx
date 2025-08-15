import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, PartyPopper } from "lucide-react";
import useAxiosSecure from "../../hooks/axiosSecure";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading announcements...
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return null; // Section hidden if no announcements
  }

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8">
      <header className="flex items-center justify-between mb-6 border-b pb-4 border-[#c4daff]">
        <h1 className="text-2xl md:text-3xl font-bold ">Announcements</h1>
      </header>

      <ul
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#8fb8ff #f0f4ff",
          overflowY: "auto",
        }}
        className="announcement-scrollbar space-y-6 h-145 p-5 overflow-auto grid grid-cols-1 md:grid-cols-1 gap-3"
      >
        {announcements.map((a) => (
          <li
            key={a._id}
            className=" border border-[#c4daff] rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    a.authorImage || "https://i.ibb.co/2FsfXqM/default-user.png"
                  }
                  alt={a.authorName}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium ">{a.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* icon */}

              <div>
                <span className="text-xs flex items-center gap-3 bg-[#C084FC]/20 text-[#C084FC] px-3 py-1 rounded-full font-medium">
                  <PartyPopper /> Announcement
                </span>
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#69a0ff] mb-2">
              {a.title}
            </h2>
            <p className="text-gray-500 whitespace-pre-line leading-relaxed">
              {a.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Announcement;
