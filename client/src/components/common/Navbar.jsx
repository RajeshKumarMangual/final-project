import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck, LogIn, LogOut, Home } from "lucide-react";
import logoImg from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_superuser");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/listing" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        
        {/* Real Estate Brand Logo & Tagline */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group"
        >
          <img
            src={logoImg}
            alt="Real Estate Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div>
            <h1 className="text-white text-xl font-black tracking-tight flex items-center gap-1">
              URBAN<span className="text-secondary">ESTATES</span>
            </h1>
            <p className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
              Premium Properties & Living
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-xs font-bold tracking-wider uppercase transition-colors relative py-1 ${
                  isActive
                    ? "text-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin Dashboard */}
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"  // /admin
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Admin Portal</span>
            </Link>
          )}

          {/* Login */}
          {!token && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-secondary/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-bold tracking-wider uppercase py-2 transition-colors ${
                    isActive ? "text-secondary" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {token && isSuperuser && (
              <Link
                to="/admin/dashboard/"  // /admin
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl text-xs font-bold border border-white/20"
              >
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>Admin Portal</span>
              </Link>
            )}

            {!token ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-secondary text-primary font-bold py-3 rounded-xl text-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;