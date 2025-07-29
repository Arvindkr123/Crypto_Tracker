import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUserApi } from "../api_service/user_apis";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name") || "Guest";

  const handleLogout = async () => {
    try {
      const res = await logoutUserApi();
      if (res.message) {
        toast.success(res.message);

        // Clear local storage
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        // Redirect
        navigate("/login");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Crypto Tracker
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block">{userName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
