import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  MessageSquare,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock,
  LayoutDashboard,
  PlusCircle,
  FileText,
} from "lucide-react";
import logo from "../../assets/logo.png";

const AdminDashboard = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [stats, setStats] = useState({
    listings: 0,
    inquiries: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Parallel fetch for overview numbers
      const [listingsRes, inquiriesRes, galleryRes] = await Promise.allSettled([
        axios.get(`${API}/listings/`),
        axios.get(`${API}/contacts/`),
        axios.get(`${API}/gallery/`),
      ]);

      const listingsData =
        listingsRes.status === "fulfilled"
          ? listingsRes.value.data.data || listingsRes.value.data
          : [];
      const inquiriesData =
        inquiriesRes.status === "fulfilled"
          ? inquiriesRes.value.data.data || inquiriesRes.value.data
          : [];
      const galleryData =
        galleryRes.status === "fulfilled"
          ? galleryRes.value.data.data || galleryRes.value.data
          : [];

      setStats({
        listings: listingsData.length || 0,
        inquiries: inquiriesData.length || 0,
        gallery: galleryData.length || 0,
      });
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const navModules = [
    {
      title: "Property Listings",
      count: stats.listings,
      desc: "Manage residential, villa, and commercial property listings.",
      link: "/admin/listing",
      icon: Building2,
      badge: "Manage Assets",
      accent: "from-blue-600 to-[#1c2a57]",
    },
    {
      title: "Client Inquiries",
      count: stats.inquiries,
      desc: "Review incoming tour requests, contact submissions, and lead inquiries.",
      link: "/admin/contact",
      icon: MessageSquare,
      badge: "Lead Center",
      accent: "from-amber-500 to-[#f7a31d]",
    },
    {
      title: "Media Gallery",
      count: stats.gallery,
      desc: "Upload and curate high-resolution asset imagery and branding showcase photos.",
      link: "/admin/gallery",
      icon: ImageIcon,
      badge: "Assets Storage",
      accent: "from-indigo-600 to-[#1c2a57]",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex gap-2" >
            <div>
              <img
                src={logo}
                alt="Urban Estates Logo"
                className="w-20  object-cover object-center shadow-md"
              />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2a57]/5 text-[#1c2a57] text-[11px] font-bold uppercase tracking-widest">
                <LayoutDashboard className="w-3.5 h-3.5 text-[#f7a31d]" />{" "}
                Command Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Urban Estates Management Panel
              </h1>
              <p className="text-slate-500 text-xs">
                Monitor, publish, and manage property assets and client
                inquiries in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/listing"
              className="inline-flex items-center gap-2 bg-[#1c2a57] hover:bg-[#152042] text-white text-xs font-bold px-5 py-3 rounded-2xl uppercase tracking-wider shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#f7a31d]" />
              <span>Add Listing</span>
            </Link>
          </div>
        </div>

        {/* Quick Metric Stat Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Active Listings
              </span>
              <Building2 className="w-5 h-5 text-[#1c2a57]" />
            </div>
            <p className="text-3xl font-black text-[#1c2a57]">
              {loading ? "..." : stats.listings}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Pending Inquiries
              </span>
              <MessageSquare className="w-5 h-5 text-[#f7a31d]" />
            </div>
            <p className="text-3xl font-black text-[#1c2a57]">
              {loading ? "..." : stats.inquiries}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Gallery Assets
              </span>
              <ImageIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-black text-[#1c2a57]">
              {loading ? "..." : stats.gallery}
            </p>
          </div>
        </div>

        {/* Core Navigation Module Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pl-1">
            Core Operations & Management Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navModules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#1c2a57] text-[#f7a31d] flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                        {module.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1c2a57] transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={module.link}
                    className="w-full bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md transition-all group-hover:bg-[#f7a31d] group-hover:text-[#1c2a57]"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
