import React from "react";
import { Link } from "react-router";
import useUserData from "../../hooks/useUser";
import { CircleCheck } from "lucide-react";

const Pricing = () => {
  const { userData, isLoading } = useUserData();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  console.log(userData);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
          Become a Gold Member
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Unlock premium benefits to grow your presence and stand out.
        </p>

        <div className=" rounded-2xl p-6 md:p-10  mb-8 bg-gradient-to-br from-yellow-50 to-white">
          <div className="text-3xl font-extrabold text-yellow-500 mb-4">
            $40 / One-Time
          </div>
          <ul className="text-left text-gray-700 mb-6 space-y-3">
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-2">✓</span> Unlimited
              posts
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-2">✓</span> Gold
              Badge on profile
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-2">✓</span> Priority
              support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-2">✓</span> Access to
              exclusive content
            </li>
          </ul>
          {userData === "Gold" ? (
            <Link className="gap-2 text-center flex bg-green-600 hover:bg-green-700 items-center justify-center text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
              Already paid <CircleCheck />
            </Link>
          ) : (
            <Link
              to="/membership/checkout"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              <p>Go to Checkout</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
