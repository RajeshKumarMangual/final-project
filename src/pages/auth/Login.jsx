import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import logoImg from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login/`,
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "is_superuser",
          response.data.is_superuser.toString()
        );

        if (response.data.is_superuser) {
          navigate("/admin/dashboard/");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Invalid credentials provided.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Login failed. Please check your network or credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/60 p-7 md:p-9">
        
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group ">
            <img
              src={logoImg}
              alt="Urban Estates Logo"
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          
          </Link>

          <p className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">
            Premium Properties Portal
          </p>

          <h1 className="text-2xl font-black text-slate-900">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-xs mt-1">
            Sign in to access your listings and account panel.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>


        {/* Back to Home Link */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;