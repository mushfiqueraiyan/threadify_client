import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
