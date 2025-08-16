import Lottie from "lottie-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import loginAnimation from "../../assets/loginAnimation.json";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { Upload, UploadCloud, User } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/axiosSecure";

const Register = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef();

  const { createWithEmail, socialLogin, setUser } = useAuth();

  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setProfile(image);
    setProfilePreview(URL.createObjectURL(image));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");

    const name = data.name;
    const email = data.email;
    const password = data.password;

    createWithEmail(email, password)
      .then(async (res) => {
        setUser(res.user);
        console.log(res.user);

        let photoURL = "";

        // Error fixed-------------------------
        if (profile) {
          const formData = new FormData();
          formData.append("image", profile);

          const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_imgBB_key
            }`,
            formData
          );

          photoURL = res.data.data.url || "";
        }

        const userData = {
          displayName: name,
          photoURL,
        };

        updateProfile(res.user, userData)
          .then(async () => {
            const userInfo = {
              email: data.email,
              role: "user",
              name: data.name,
              username: data.username,
              photo: photoURL || "",
              created_at: new Date().toISOString(),
              badge: "Bronze",
            };

            const userRes = await axios.post(
              "https://threadify-server.vercel.app/users",
              userInfo
            );

            toast.success("Account has been created 🎉");
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };
  // Social Media Login/Register

  const googleLogin = async () => {
    try {
      const res = await socialLogin();
      const user = res.user;
      setUser(user);

      const userInfo = {
        email: user.email,
        role: "user",
        name: user.displayName || "",
        username: user.email?.split("@")[0] || "",
        photo: user.photoURL || "",
        created_at: new Date().toISOString(),
        badge: "Bronze",
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Account has been created 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex    ">
      <div className="w-full  bg-white flex flex-col md:flex-col lg:flex-row overflow-hidden">
        {/* Left: Animation */}
        <div className="w-full lg:w-1/2 bg-blue-50 p-8 lg:min-h-screen flex items-center justify-center">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-80 h-80"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col  justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Profile image upload by cloudinary */}

            <div className="">
              <p className="my-2 flex gap-2 text-gray-500">
                Upload Profile <UploadCloud />
              </p>
              <div className="relative ">
                <div
                  onClick={handleClick}
                  className=" w-15 h-15 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 cursor-pointer group flex items-center justify-center"
                >
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}

                  {/* Upload icon overlay */}
                  <div className="absolute inset-0 w-15 h-15 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Upload size={24} className="text-white" />
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden "
                  onChange={handleProfileImage}
                />
              </div>
            </div>

            <label className="label text-black">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Full Name"
              className="w-full px-4 py-2 border text-black border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <label className="label text-black">Username</label>
            <input
              {...register("username", { required: "username is required" })}
              placeholder="username"
              className="w-full px-4 py-2 border text-black border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <label className="label text-black">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-2 border text-black border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <label className="label text-black">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (value.length < 6) {
                    return "Password must be at least 8 characters.";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must include at least one uppercase letter.";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "Password must include at least one lowercase letter.";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must include at least one number.";
                  }

                  return true;
                },
              })}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 border text-black border-[#E0EAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#aecbff] text-black py-2 rounded-lg hover:bg-[#abc7fc] transition duration-300"
            >
              Register
            </button>
            <p className="text-red-600 my-2">{error}</p>
          </form>
          <p className="text-gray-600 py-2">
            Have existing account?{" "}
            <Link className="underline text-[#8fb8ff]" to={"/login"}>
              Login
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
  );
};

export default Register;
