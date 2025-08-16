import React, { useEffect, useState } from "react";
import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/axiosSecure";
import useTheme from "../../hooks/useTheme";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { user, logout, setUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const { userRole } = useUserRole();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    const isDark = saved === "dark";
    setDarkMode(isDark);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    // This event makes all components update theme state!
    window.dispatchEvent(new Event("themeChange"));
  };

  const handleLogout = async () => {
    await logout();
    toast.error("logout successfully 🥲");
    setUser(null);
  };

  const { data: countData = {} } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements/count");
      return res.data;
    },
  });

  const theme = useTheme();
  //  console.log("API Response:", countData);

  return (
    <div className="navbar bg-[#bad4ff] text-black  px-4">
      {/* Start */}
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className=" cursor-pointer md:hidden">
            <Menu size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "border-b-2 border-yellow-400 animate-pulse"
                    : isActive
                    ? "border-b-2 border-blue-400"
                    : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "border-b-2 border-yellow-400 animate-pulse"
                    : isActive
                    ? "border-b-2 border-blue-400"
                    : ""
                }
                to="/membership"
              >
                Membership
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo + Name */}
        <Link
          to="/"
          className="flex items-center  text-xl font-bold hover:text-primary transition-colors ml-2 md:ml-0"
        >
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span>Threadify</span>
        </Link>
      </div>

      {/* Center (Desktop Links) */}
      <div className="navbar-center hidden md:flex gap-8">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "border-b-2 border-yellow-400 animate-pulse"
              : isActive
              ? "border-b-2 border-blue-400"
              : ""
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "border-b-2 border-yellow-400 animate-pulse"
              : isActive
              ? "border-b-2 border-blue-400"
              : ""
          }
          to="/membership"
        >
          Membership
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "border-b-2 border-yellow-400 animate-pulse"
              : isActive
              ? "border-b-2 border-blue-400"
              : ""
          }
          to="/about"
        >
          About
        </NavLink>
      </div>

      {/* End */}
      <div className="navbar-end gap-2">
        <button className="cursor-pointer transition-all" onClick={toggleTheme}>
          {darkMode ? <Sun size={25} /> : <Moon size={25} />}
        </button>

        <div className="btn btn-ghost btn-circle relative">
          <Bell size={22} />

          <span className="badge  badge-xs absolute -top-1 -right-1">
            {countData?.count}
          </span>
        </div>

        {!user ? (
          <Link to="/login" className="btn bg-[#8fb8ff] border-0 rounded-md">
            Join Us
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-2 hover:ring-offset-4 transition"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/2FsfXqM/default-user.png"
                  }
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm space-y-2 mt-3 dropdown-content  z-[1] p-2 shadow-lg  rounded-box w-52 ${
                theme == "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <li className="text-gray-500 font-semibold cursor-default">
                {user.displayName || user.email}
              </li>
              <li className={` ${theme == "dark" ? "text-white" : ""}`}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {userRole == "admin" && (
                <li className={` ${theme == "dark" ? "text-white" : ""}`}>
                  <Link to={"/dashboard/add-announcement"}>
                    Add Announcement
                  </Link>
                </li>
              )}
              {userRole == "user" && (
                <li className={` ${theme == "dark" ? "text-white" : ""}`}>
                  <Link to={"/dashboard/add-post"}>Add Post</Link>
                </li>
              )}
              <li>
                <button
                  className="flex bg-red-500 rounded-3xl text-white items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
