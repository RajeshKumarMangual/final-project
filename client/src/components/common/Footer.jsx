import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2
} from "lucide-react";
import logoImg from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/listing" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const propertyTypes = [
    { name: "Luxury Villas", path: "/listing?type=villa" },
    { name: "Modern Apartments", path: "/listing?type=apartment" },
    { name: "Commercial Spaces", path: "/listing?type=commercial" },
    { name: "Residential Plots", path: "/listing?type=plot" },
  ];

  return (
    <footer className="bg-primary text-white border-t border-white/10 relative overflow-hidden">
      {/* Decorative Gradient Background Blur */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="Urban Estates Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <h2 className="text-white text-xl font-black tracking-tight">
                  URBAN<span className="text-secondary">ESTATES</span>
                </h2>
                <p className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
                  Premium Properties & Living
                </p>
              </div>
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed">
              Your trusted partner in finding premium residential and commercial spaces. Discover modern living designed around your lifestyle.
            </p>

          
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-secondary text-xs transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-secondary/60">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Property Categories
            </h3>
            <ul className="space-y-2.5">
              {propertyTypes.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-slate-300 hover:text-secondary text-xs transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-secondary/60">›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Contact Info
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>123 Executive Tower, Business District, City</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>contact@urbanestates.com</span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-[11px] text-slate-300 mb-2 font-medium">
                Subscribe for featured property updates
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-l-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-3 py-2 rounded-r-xl transition-all cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} URBAN ESTATES. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;