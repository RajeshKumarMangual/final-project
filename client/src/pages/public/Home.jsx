import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Square,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Star,
  Users,
  KeyRound,
  FileCheck2,
  Newspaper,
  PhoneCall,
  Home as HomeIcon,
  Filter,
} from "lucide-react";

const Home = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // Search Filter Form State
  const [searchIntent, setSearchIntent] = useState("buy"); // "buy" | "rent"
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [activeTabCategory, setActiveTabCategory] = useState("all");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API}/listings/`);
      const data = res.data.data || res.data || [];
      setListings(data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoadingListings(false);
    }
  };

  // Filter listings based on category tab
  const displayedListings = useMemo(() => {
    let filtered = listings;
    if (activeTabCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === activeTabCategory.toLowerCase()
      );
    }
    return filtered.slice(0, 6);
  }, [listings, activeTabCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/listing?intent=${searchIntent}&location=${encodeURIComponent(
        searchLocation
      )}&type=${encodeURIComponent(propertyType)}`
    );
  };

  // Static Data Arrays
  const stats = [
    { label: "Active Listings", value: "1,250+", icon: Building2 },
    { label: "Verified Buyers", value: "5,800+", icon: Users },
    { label: "Cities Covered", value: "18+", icon: MapPin },
    { label: "Client Satisfaction", value: "99.4%", icon: Star },
  ];

  const categories = [
    {
      title: "Luxury Villas",
      count: "120+ Listings",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600",
      type: "villa",
    },
    {
      title: "Modern Apartments",
      count: "450+ Listings",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600",
      type: "apartment",
    },
    {
      title: "Penthouse Suites",
      count: "85+ Listings",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
      type: "penthouse",
    },
    {
      title: "Commercial Spaces",
      count: "210+ Listings",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      type: "commercial",
    },
  ];

  const corePillars = [
    {
      icon: ShieldCheck,
      title: "100% Legal Clearance",
      desc: "Every listing is thoroughly vetted by our legal team to ensure clean ownership titles and government compliance.",
    },
    {
      icon: KeyRound,
      title: "End-to-End Ownership",
      desc: "From initial home viewing and price negotiations to loan processing and key handover, we guide every step.",
    },
    {
      icon: Award,
      title: "Zero Hidden Fees",
      desc: "Transparent commission structures and clear terms so you can invest with full peace of mind.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh & Priya Sharma",
      role: "Villa Buyers, Premium Sector",
      text: "Urban Estates made finding our dream home smooth and hassle-free. Their legal verification gave us 100% confidence.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Ananya Roy",
      role: "Commercial Investor",
      text: "The portfolio evaluation and market intelligence provided by their team ensured high rental yield on my new office space.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Vikram Malhotra",
      role: "Penthouse Owner",
      text: "Exquisite properties and unmatched customer care. They truly understand luxury living standards.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 space-y-20 pb-20">
      
      {/* 1. HERO SECTION & QUICK SEARCH */}
      <section className="relative bg-[#1c2a57] text-white pt-12 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[40px] shadow-2xl shadow-[#1c2a57]/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Hero Content */}
          <div className="max-w-3xl space-y-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Premium Properties & Living
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Discover Extraordinary <span className="text-[#f7a31d]">Living</span> Spaces.
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Urban Estates connects discerning buyers with luxury villas, modern high-rise apartments, and high-yield commercial investments.
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-100 text-slate-800 space-y-4">
            
            {/* Search Intent Tabs (Buy / Rent) */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setSearchIntent("buy")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  searchIntent === "buy"
                    ? "bg-[#1c2a57] text-white shadow-md shadow-[#1c2a57]/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Buy Property
              </button>
              <button
                type="button"
                onClick={() => setSearchIntent("rent")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  searchIntent === "rent"
                    ? "bg-[#1c2a57] text-white shadow-md shadow-[#1c2a57]/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Rent Property
              </button>
            </div>

            {/* Inline Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-6 relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-1">
                  Location or Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#f7a31d] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search by city, area, or neighborhood..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-1">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                >
                  <option value="all">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="plot">Land / Plot</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

          </div>

        </div>
      </section>

      {/* 2. STATS & NUMBERS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-2">
                <div className="w-12 h-12 rounded-2xl bg-[#1c2a57]/5 text-[#1c2a57] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#f7a31d]" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#1c2a57]">{stat.value}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROPERTY CATEGORIES EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#f7a31d] text-xs font-bold uppercase tracking-wider">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Properties by Category
          </h2>
          <p className="text-slate-500 text-xs">
            Find tailored real estate options designed for your unique lifestyle and financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/listing?type=${cat.type}`)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2a57] via-[#1c2a57]/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                <p className="text-xs font-bold text-[#f7a31d] uppercase tracking-wider">{cat.count}</p>
                <h3 className="text-lg font-bold">{cat.title}</h3>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors pt-1">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f7a31d]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED LISTINGS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[#f7a31d] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4" /> Top Tier Assets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Properties
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["all", "residential", "commercial", "villa"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTabCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                  activeTabCategory === cat
                    ? "bg-[#1c2a57] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loadingListings ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : displayedListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 text-slate-500 text-xs">
            No properties found for this category tab.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-60 bg-slate-100 overflow-hidden">
                  <img
                    src={
                      item.images?.length
                        ? item.images[0]
                        : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  {item.category && (
                    <span className="absolute top-4 left-4 bg-[#1c2a57]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {item.category}
                    </span>
                  )}
                  {item.is_featured && (
                    <span className="absolute top-4 right-4 bg-[#f7a31d] text-[#1c2a57] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-lg truncate group-hover:text-[#1c2a57] transition-colors">
                      {item.name}
                    </h3>
                    <p className="flex items-center gap-1 text-slate-500 text-xs truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#f7a31d] shrink-0" />
                      {item.location || "Prime Location"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                    <p className="text-2xl font-black text-[#1c2a57]">
                      ₹{Number(item.price || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-2xl text-[11px] font-bold text-slate-700">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#1c2a57]" />
                      <span>{item.bedrooms || 0} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-[#1c2a57]" />
                      <span>{item.bathrooms || 0} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-3.5 h-3.5 text-[#1c2a57]" />
                      <span>{item.area || 0} sqft</span>
                    </div>
                  </div>

                  <Link
                    to={`/listing/${item.id}`}
                    className="w-full bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 text-[#f7a31d]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            to="/listing"
            className="inline-flex items-center gap-2 bg-[#1c2a57] text-white font-bold py-3.5 px-8 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:bg-[#152042] transition-all"
          >
            <span>Browse Full Listing Directory</span>
            <ArrowRight className="w-4 h-4 text-[#f7a31d]" />
          </Link>
        </div>
      </section>

      {/* 5. CORE PILLARS / WHY CHOOSE US */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#f7a31d] text-xs font-bold uppercase tracking-wider">
              The Urban Estates Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Reinventing Real Estate Guidance
            </h2>
            <p className="text-slate-500 text-xs">
              We streamline the property acquisition lifecycle with trust, data accuracy, and premier client assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4 hover:shadow-xl hover:bg-white transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1c2a57] text-[#f7a31d] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#f7a31d] text-xs font-bold uppercase tracking-wider">
            Verified Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#f7a31d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f7a31d]" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1c2a57] to-[#253975] rounded-3xl p-8 sm:p-14 text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#1c2a57]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-3 text-center sm:text-left relative z-10 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[10px] font-bold uppercase tracking-widest border border-white/10">
              Personalized Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              Ready to Sell or Find Your Dream Home?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect with an Urban Estates representative today for confidential property consultations and free market evaluations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/contact"
              className="bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all text-center"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/listing"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider border border-white/10 transition-all text-center"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;