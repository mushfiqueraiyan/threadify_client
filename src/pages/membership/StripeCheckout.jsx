import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/axiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const email = user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        email,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/users/${email}/membership`, {
          badge: "Gold",
        });

        await axiosSecure.post("/payments", {
          email: user?.email,
          name: user?.displayName || "Unknown",
          photo: user?.photoURL || "",
          amount: 99,
          currency: "bdt",
          transactionId: result.paymentIntent.id,
          paymentDate: new Date().toISOString(),
          status: result.paymentIntent.status,
        });

        toast.success("Membership Activated 🎉");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 px-4 cursor-pointer text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          {loading ? "Processing..." : "Pay ৳99 & Become Member"}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckout;
