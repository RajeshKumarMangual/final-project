import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  MapPin,
  Square,
  ArrowRight,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  Building2,
  X,
  Layers,
} from "lucide-react";

const Listing = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API}/listings/`);
      setListings(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error loading listings:", err);
    } fontFinally: {
      setLoading(false);
    }
  };

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const cats = new Set(
      listings.map((item) => item.category?.toLowerCase()).filter(Boolean)
    );
    return ["all", ...Array.from(cats)];
  }, [listings]);

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        const matchesSearch =
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          item.category?.toLowerCase() === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [listings, searchTerm, selectedCategory, sortBy]);

  // Skeleton Loader Component
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Skeleton Header */}
          <div className="h-40 bg-slate-200 rounded-3xl animate-pulse"></div>

          {/* Skeleton Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-60 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-1/3 my-2"></div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="h-4 bg-slate-200 rounded-lg"></div>
                    <div className="h-4 bg-slate-200 rounded-lg"></div>
                    <div className="h-4 bg-slate-200 rounded-lg"></div>
                  </div>
                  <div className="h-11 bg-slate-200 rounded-xl pt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Section */}
        <div className="bg-[#1c2a57] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl shadow-[#1c2a57]/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Urban Estates Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore Exclusive Listings
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Browse luxury villas, modern apartments, and premium commercial plots verified by our real estate advisors.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, title, or location..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls Right */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              
              {/* Sort By Price Select */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-[#1c2a57] transition-all"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* View Toggle (Grid / List) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-[#1c2a57] shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white text-[#1c2a57] shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Types:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1c2a57] text-white shadow-md shadow-[#1c2a57]/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listings Display */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-base">No Matching Properties</h3>
              <p className="text-slate-500 text-xs mt-1">
                We couldn't find any properties matching your current filter choices.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="inline-flex items-center gap-2 bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View Layout */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Property Image Header */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={
                      listing.images?.length
                        ? listing.images[0]
                        : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={listing.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
                    }}
                  />

                  {/* Category Pill */}
                  {listing.category && (
                    <span className="absolute top-4 left-4 bg-[#1c2a57]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {listing.category}
                    </span>
                  )}

                  {/* Featured Badge */}
                  {listing.is_featured && (
                    <span className="absolute top-4 right-4 bg-[#f7a31d] text-[#1c2a57] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Featured
                    </span>
                  )}

                  {/* Photo Count Tag */}
                  {listing.images?.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#f7a31d]" />
                      {listing.images.length} Photos
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-[#1c2a57] transition-colors">
                      {listing.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#f7a31d] shrink-0" />
                      <span className="truncate">{listing.location || "Prime Location"}</span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Listing Price
                    </span>
                    <p className="text-2xl font-black text-[#1c2a57]">
                      ₹{Number(listing.price || 0).toLocaleString()}
                    </p>
                  </div>

                  {/* Property Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5" title="Bedrooms">
                      <BedDouble className="w-4 h-4 text-[#1c2a57]" />
                      <span>{listing.bedrooms || 0} Beds</span>
                    </div>

                    <div className="flex items-center gap-1.5" title="Bathrooms">
                      <Bath className="w-4 h-4 text-[#1c2a57]" />
                      <span>{listing.bathrooms || 0} Baths</span>
                    </div>

                    <div className="flex items-center gap-1.5" title="Area Sq.Ft.">
                      <Square className="w-4 h-4 text-[#1c2a57]" />
                      <span>{listing.area || 0} sqft</span>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <Link
                    to={`/listing/${listing.id}`}
                    className="w-full bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-[#1c2a57]/10 transition-all hover:shadow-xl active:translate-y-0"
                  >
                    <span>View Property Details</span>
                    <ArrowRight className="w-4 h-4 text-[#f7a31d]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Layout */
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {/* Left Image */}
                <div className="md:col-span-4 h-56 md:h-full relative bg-slate-100">
                  <img
                    src={
                      listing.images?.length
                        ? listing.images[0]
                        : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={listing.name}
                    className="h-full w-full object-cover"
                  />
                  {listing.is_featured && (
                    <span className="absolute top-3 left-3 bg-[#f7a31d] text-[#1c2a57] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                {/* Right Details */}
                <div className="md:col-span-8 p-6 space-y-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#f7a31d] uppercase tracking-wider">
                        {listing.category || "Residential"}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {listing.name}
                      </h2>
                      <p className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#f7a31d]" />
                        {listing.location || "Prime Location"}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Price</span>
                      <p className="text-2xl font-black text-[#1c2a57]">
                        ₹{Number(listing.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Specs & CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-6 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-[#1c2a57]" />
                        <span>{listing.bedrooms || 0} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#1c2a57]" />
                        <span>{listing.bathrooms || 0} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4 text-[#1c2a57]" />
                        <span>{listing.area || 0} sqft</span>
                      </div>
                    </div>

                    <Link
                      to={`/listing/${listing.id}`}
                      className="w-full sm:w-auto bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shrink-0"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-4 h-4 text-[#f7a31d]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Listing;