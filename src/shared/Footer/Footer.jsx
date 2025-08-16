import { FacebookIcon, Linkedin, TwitterIcon, YoutubeIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white rounded-3xl mx-8 mt-15 mb-8  p-8">
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl font-bold">Threadify</span>
        </div>
        <p className="max-w-xl mx-auto text-sm text-gray-400 mb-4">
          Connect. Share. Grow. Collaborate with developers and teams worldwide
          to build meaningful solutions, exchange innovative ideas, and
          accelerate your journey from concept to production.
        </p>

        <div className="divider my-4"></div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm mb-4">
          <Link to={"/"} className="link link-hover">
            Home
          </Link>
          <Link to={"/about"} className="link link-hover">
            About
          </Link>
          <Link to={"/membership"} className="link link-hover">
            Membership
          </Link>
        </nav>

        <div className="divider my-4"></div>

        <div className="flex justify-center gap-6 text-2xl">
          <a className="text-blue-600 bg-white rounded-full p-2">
            <Linkedin />
          </a>
          <a className="text-black bg-white rounded-full p-2">
            <TwitterIcon />
          </a>
          <a className="text-blue-500 bg-white rounded-full p-2">
            <FacebookIcon />
          </a>
          <a className="text-red-500 bg-white rounded-full p-2">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
