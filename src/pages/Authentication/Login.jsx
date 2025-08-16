import React, { useState } from "react";
import { useForm } from "react-hook-form";
import registerAnimation from "../../assets/registerAnimation.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");

  const { socialLogin, login, setUser } = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const email = data.email;
    const password = data.password;

    try {
      const res = await login(email, password);
      setUser(res.user);
      toast.success("Login successfully 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      const res = await socialLogin();
      const user = res.user;
      setUser(user);
      toast.success("Login successfully 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex    ">
        <div className="w-full  bg-white flex flex-col md:flex-col lg:flex-row overflow-hidden">
          {/* Left: Animation */}
          <div className="w-full lg:w-1/2 bg-blue-50 p-8 lg:min-h-screen flex items-center justify-center">
            <Lottie
              animationData={registerAnimation}
              loop={true}
              className="w-80 h-80"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-10 flex flex-col  justify-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Join us</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <label className="label">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                type="email"
                defaultValue={"admin@admin.com"}
                className="w-full px-4 py-2 border border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Password"
                type="password"
                defaultValue={"Admin123456**"}
                className="w-full px-4 py-2 border border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#aecbff] text-black py-2 rounded-lg hover:bg-[#abc7fc] transition duration-300"
              >
                Login
              </button>
              <p className="text-red-600 my-2">{error}</p>
            </form>
            <p className="text-gray-600 py-2">
              Create new account?{" "}
              <Link
                state={{ from }}
                className="underline text-[#8fb8ff]"
                to={"/register"}
              >
                Register
              </Link>
            </p>
            <div className="text-center">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 font-medium">Or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <button
                type="button"
                onClick={googleLogin}
                className=" cursor-pointer btn bg-none w-full flex items-center justify-center gap-2  hover:border-gray-300 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
