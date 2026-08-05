import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Send,
  Building2,
  Sparkles,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";

const ListingDetails = () => {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Inquiry Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState("");

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`${API}/listings/${id}/`);
      const data = res.data.data || res.data;

      setListing(data);

      if (data?.images?.length) {
        setSelectedImage(data.images[0]);
      }
    } catch (err) {
      console.error("Error fetching listing details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    try {
      await axios.post(`${API}/contacts/create/`, {
        ...inquiryForm,
        subject: `Property Inquiry: ${listing?.name || "ID #" + id}`,
      });
      setInquirySuccess("Your request was submitted! An agent will call you shortly.");
      setInquiryForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Inquiry submit error:", err);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-32"></div>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-[480px] bg-slate-200 rounded-3xl"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-10 bg-slate-200 rounded-xl w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded-xl w-1/2"></div>
              <div className="h-12 bg-slate-200 rounded-2xl w-1/3"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-slate-200 rounded-2xl"></div>
                <div className="h-20 bg-slate-200 rounded-2xl"></div>
                <div className="h-20 bg-slate-200 rounded-2xl"></div>
              </div>
              <div className="h-40 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xl max-w-md space-y-4">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Listing Not Found</h2>
          <p className="text-slate-500 text-xs">
            The property listing you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/listing"
            className="inline-flex items-center gap-2 bg-[#1c2a57] text-white text-xs font-bold px-5 py-3 rounded-xl uppercase tracking-wider shadow-md hover:bg-[#152042] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#f7a31d]" />
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const defaultFallbackImage =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/listing"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1c2a57] hover:text-[#f7a31d] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Property Listings</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f7a31d]" /> Verified Urban Estates Listing
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Showcase Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Display */}
            <div className="relative h-[420px] sm:h-[500px] bg-slate-200 rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
              <img
                src={selectedImage || listing.images?.[0] || defaultFallbackImage}
                alt={listing.name}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = defaultFallbackImage;
                }}
              />

              {/* Category Overlay Tag */}
              {listing.category && (
                <span className="absolute top-5 left-5 bg-[#1c2a57]/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
                  {listing.category}
                </span>
              )}

              {/* Featured Tag */}
              {listing.is_featured && (
                <span className="absolute top-5 right-5 bg-[#f7a31d] text-[#1c2a57] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Featured Asset
                </span>
              )}
            </div>

            {/* Thumbnail Carousel Strip */}
            {listing.images?.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {listing.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? "border-[#f7a31d] shadow-md scale-95"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = defaultFallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Listing Details & Pricing Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Header Title & Location */}
              <div className="space-y-2 border-b border-slate-100 pb-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#f7a31d] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Premium Estate
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {listing.name}
                </h1>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium pt-1">
                  <MapPin className="w-4 h-4 text-[#f7a31d] shrink-0" />
                  <span>{listing.location || "Location provided on inquiry"}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Asking Price
                  </p>
                  <p className="text-3xl font-black text-[#1c2a57]">
                    ₹{Number(listing.price || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-1"></span>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Available Now
                  </span>
                </div>
              </div>

              {/* Property Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1">
                  <BedDouble className="w-5 h-5 text-[#1c2a57] mx-auto" />
                  <p className="text-xs font-bold text-slate-800">{listing.bedrooms || 0} Beds</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Bedrooms</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1">
                  <Bath className="w-5 h-5 text-[#1c2a57] mx-auto" />
                  <p className="text-xs font-bold text-slate-800">{listing.bathrooms || 0} Baths</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Bathrooms</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1">
                  <Square className="w-5 h-5 text-[#1c2a57] mx-auto" />
                  <p className="text-xs font-bold text-slate-800">{listing.area || 0} sqft</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Area</p>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Property Overview
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {listing.description ||
                    "This high-value estate offers exceptional architectural finishing, expansive layout options, and primary location accessibility suitable for investment or direct residency."}
                </p>
              </div>

              {/* Amenities Grid */}
              {listing.amenities?.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Key Features & Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {listing.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f7a31d] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="w-full bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-[#f7a31d]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule Private Viewing / Inquiry</span>
              </button>
            </div>

          </div>
        </div>

        {/* Modal: Schedule Tour / Contact Form */}
        {isInquiryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 shadow-2xl space-y-6 relative">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Inquire About Property
                  </h3>
                  <p className="text-xs text-slate-500 truncate max-w-[260px]">
                    {listing.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsInquiryOpen(false);
                    setInquirySuccess("");
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {inquirySuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">{inquirySuccess}</p>
                  <button
                    onClick={() => {
                      setIsInquiryOpen(false);
                      setInquirySuccess("");
                    }}
                    className="w-full bg-[#1c2a57] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message / Preferred Tour Time
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="I am interested in viewing this property..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="w-full bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {inquiryLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#f7a31d]" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListingDetails;