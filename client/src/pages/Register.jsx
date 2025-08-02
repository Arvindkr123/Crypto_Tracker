import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { registerUser } from "../api_service/user_apis";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);

  const validateForm = (userInfo) => {
    if (!userInfo.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!userInfo.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    // Basic email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!userInfo.password) {
      toast.error("Password is required");
      return false;
    }
    if (userInfo.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true; // ✅ all good
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(userInfo)) {
      try {
        const res = await registerUser(userInfo);
        if (res.message) {
          toast.success(res.message);
          localStorage.setItem("name", res.user.name);
          localStorage.setItem("email", res.user.email);
          navigate("/");
        }
      } catch (error) {
        // Handle axios error response safely
        const errorMsg =
          error.response?.data?.message || // backend error message
          error.message || // generic error
          "Something went wrong";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-700 to-purple-600 items-center justify-center">
        <img
          src="https://imgs.search.brave.com/QkgoXK4YEZVjAi7c_2SKfR5Y81tkd0-GOsSSfu8os3w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jcnlw/dG9jdXJyZW5jeS13/b21hbi1ob2xkaW5n/LXNwZWVjaC1idWJi/bGUteW91bmctMTA4/NDkzMjkwLmpwZw"
          alt="Crypto"
          className="w-full h-full"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Join the Crypto Tracker today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="John Doe"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="you@example.com"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none pr-10"
                placeholder="********"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              {/* Eye Icon */}
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm mb-2">Confirm Password</label>
              <input
                type={confirmPass ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none pr-10"
                placeholder="********"
                value={userInfo.confirmPassword}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              {/* Eye Icon */}
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setConfirmPass((prev) => !prev)}
              >
                {confirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
