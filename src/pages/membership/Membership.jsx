import React from "react";
import useAuth from "../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { loadStripe } from "@stripe/stripe-js";

const Membership = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  //const { user } = useAuth();

  return (
    <div>
      <div className=" max-w-7xl h-screen mx-auto mt-10 p-6">
        <div className=" rounded shadow-xl py-5 px-5">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
            Become a Gold Member
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enjoy unlimited posting and earn the{" "}
            <span className="text-yellow-500 font-semibold">Gold Badge</span>.
          </p>

          <Elements stripe={stripePromise}>
            <StripeCheckout />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Membership;
