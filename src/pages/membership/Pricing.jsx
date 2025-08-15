import React, { useState } from "react";
import { Link } from "react-router";
import useUserData from "../../hooks/useUser";
import { CircleCheck, Crown, Check, Sparkles } from "lucide-react";

const Pricing = () => {
  const { userData, isLoading } = useUserData();
  const [isHovered, setIsHovered] = useState(false);
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  const features = [
    "Unlimited posts",
    "Gold Badge on profile",
    "Priority support",
    "Access to exclusive content",
  ];

  //console.log(userData);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div
        className={`backdrop-blur-xl rounded-3xl p-10 shadow-2xl max-w-xl w-full text-center relative overflow-hidden transform transition-all duration-300 ${
          isHovered ? "scale-105 shadow-3xl" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-pulse"></div>

        {/* Floating particles */}
        <div className="absolute top-6 right-6 text-yellow-400 opacity-20">
          <Sparkles size={16} />
        </div>
        <div className="absolute top-12 left-8 text-yellow-400 opacity-30">
          <Sparkles size={12} />
        </div>
        <div className="absolute bottom-20 right-10 text-yellow-400 opacity-25">
          <Sparkles size={14} />
        </div>

        {/* Crown Icon */}
        <div className="mb-6 animate-bounce">
          <Crown size={64} className="mx-auto text-yellow-500 drop-shadow-lg" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Become a Gold Member
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Unlock premium features and elevate your experience with our exclusive
          gold membership plan.
        </p>

        {/* Price */}
        <div className="mb-10">
          <div className="text-6xl font-black  mb-2">
            <span className="text-2xl align-top">৳</span>99
          </div>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold">
            One-time payment
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-start space-x-3 group"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Check size={14} className="text-white font-bold" />
              </div>
              <span className="text-gray-500 font-medium text-left group-hover:text-gray-900 transition-colors duration-200">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
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

        {/* Trust badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <Crown size={16} className="text-yellow-500" />
          <span>Premium membership • Trusted by thousands</span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
