import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    ; (async () => {
      try {
        const res = await api.get("/api/users/user", {
          withCredentials: true,
        });

        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        if (err.response?.status !== 401) {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
        setUser(null);
      }
    })();
  }, [navigate]);

  const logout = async () => {
    try {
      const res = await api.post("/api/users/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/login");
      toast.success(
        res?.data?.message ||
        "Thank you for using Proxima! You are logged out!",
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "User does not exist");
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">

          <NavLink
            to="/products"
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 p-2.5 rounded-xl text-white shadow-lg">
              <i className="fa-brands fa-product-hunt text-xl"></i>
            </div>

            <span className="font-extrabold text-2xl bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              Proxima
            </span>
          </NavLink>

          <div className="flex items-center gap-3">

            {user && (
              <NavLink
                to="/products/new"
                className="hidden sm:block bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:scale-105 transition-all duration-300"
              >
                Create Product
              </NavLink>
            )}

            {!user ? (
              <>
                <NavLink
                  to="/signup"
                  className="font-semibold text-slate-700 hover:text-pink-600 transition"
                >
                  Sign Up
                </NavLink>

                <NavLink
                  to="/login"
                  className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
