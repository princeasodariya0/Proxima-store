import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/api/users/login", form);

      toast.success(
        res?.data?.message || "Welcome to Proxima! You are logged in!",
      );
      navigate(res.data?.redirectUrl || "/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl shadow-lg">
              🔐
            </div>
            <h1 className="mt-5 text-4xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2">
              Login to your Proxima account
            </p>
          </div>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-slate-500">
              Don't have an account?
            </p>
            <NavLink
              to="/signup"
              className="text-violet-700 font-semibold hover:text-pink-500 transition"
            >
              Create Account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
