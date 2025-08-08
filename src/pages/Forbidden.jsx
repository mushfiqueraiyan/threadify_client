import React from "react";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" w-full bg-white  rounded-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Forbidden</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you don't have permission to access this page.
        </p>
        <button
          onClick={handleBackHome}
          className="px-5 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
