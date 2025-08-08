import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axiosSecure";
import { Medal } from "lucide-react";
import { Link } from "react-router";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userProfile = [], isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: userPosts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recentPosts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || isPostsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
        <span className="loading loading-bars loading-xl text-blue-300"></span>
      </div>
    );
  }

  const badge = userProfile.badge === "Gold" ? "Gold" : "Bronze";
  const badgeColor = badge === "Gold" ? "text-yellow-500" : "text-orange-400";

  return (
    <div className=" bg-white   overflow-hidden">
      {/* Cover / Banner */}
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=1500&q=80"
          alt="Cover"
          className="object-cover w-full h-full opacity-80"
        />
      </div>

      {/* Profile Picture and Info */}
      <div className="relative flex flex-col items-center p-6 -mt-16">
        <img
          src={
            userProfile.photo ||
            "https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
          }
          alt={userProfile.name}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        />

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {userProfile.name}
        </h2>
        <p className="text-gray-500">{userProfile.email}</p>

        <div className="flex items-center mt-2 space-x-2">
          <Medal className={`w-5 h-5 ${badgeColor}`} />
          <span className={`text-sm font-medium ${badgeColor}`}>
            {badge} Badge
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Recent Posts */}
      <div className="p-6 max-w-7xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>

        {userPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
            {userPosts.slice(0, 3).map((post) => (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                  {/* Top section: User Info */}
                  <div className="flex items-center mb-4">
                    <img
                      src={post.authorImage || "https://via.placeholder.com/50"}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {post.authorName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(
                          post.created_at || post.create_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    {post.postTitle}
                  </h4>
                  <p className="text-gray-600 mb-3">{post.postDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
