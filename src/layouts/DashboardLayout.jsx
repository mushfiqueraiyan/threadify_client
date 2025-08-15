import {
  AlertCircle,
  BellDot,
  Crown,
  Paperclip,
  Pen,
  Undo2,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import useTheme from "../hooks/useTheme";

const DashboardLayout = () => {
  const { userRole } = useUserRole();
  const theme = useTheme();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className={`navbar bg-[#c4daff] text-black w-full lg:hidden`}>
            <div className="flex-none ">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden text-black">
              Dashboard
            </div>
          </div>
          {/* Page content here */}
          <Outlet />
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className={`menu ${
              theme == "dark"
                ? "text-white bg-[#121212] border-r-1 border-gray-700"
                : "bg-[#c4daff] "
            } text-black min-h-full w-80 p-4`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 hover:text-blue-600 transition ${
                    isActive ? "bg-gray-100 text-blue-600" : ""
                  }`
                }
              >
                <Undo2 size={18} />
                Back to Home
              </NavLink>
            </li>

            {userRole === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition `
                    }
                  >
                    <User size={18} />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-post"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition ${
                        isActive ? "bg-gray-100 text-blue-600" : ""
                      }`
                    }
                  >
                    <Pen size={18} />
                    Add Post
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-posts"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition ${
                        isActive ? "bg-gray-100 text-blue-600" : ""
                      }`
                    }
                  >
                    <Paperclip size={18} />
                    My Posts
                  </NavLink>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition `
                    }
                  >
                    <Crown size={18} />
                    Admin Profile
                  </NavLink>
                </li>
              </>
            )}

            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-announcement"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition ${
                        isActive ? "bg-gray-100 text-blue-600" : ""
                      }`
                    }
                  >
                    <BellDot size={18} />
                    Add Announcement
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition ${
                        isActive ? "bg-gray-100 text-blue-600" : ""
                      }`
                    }
                  >
                    <Users size={18} />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/reported-comments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-blue-600 transition ${
                        isActive ? "bg-gray-100 text-blue-600" : ""
                      }`
                    }
                  >
                    <AlertCircle size={18} />
                    Reported Comments
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
