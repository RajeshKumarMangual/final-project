import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Building2,
  Search,
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import ListingFormModal from "../../components/admin/ListingFormModal";

const AdminListing = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/listings/`);
      setListings(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (listing) => {
    setEditing(listing);
    setShowModal(true);
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property listing?")) return;

    try {
      await axios.delete(`${API}/listings/${id}/delete/`);
      fetchListings();
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete property listing.");
    }
  };

  // Filter listings based on search term and category tabs
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterType === "featured") return matchesSearch && item.is_featured;
      if (filterType === "active") return matchesSearch && item.is_active;
      if (filterType === "inactive") return matchesSearch && !item.is_active;

      return matchesSearch;
    });
  }, [listings, searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Title Bar with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="space-y-3">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1c2a57] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#f7a31d]" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2a57]/5 text-[#1c2a57] text-[11px] font-bold uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5 text-[#f7a31d]" /> Property Inventory
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Property Listings ({listings.length})
              </h1>
              <p className="text-slate-500 text-xs">
                Create, update, and manage luxury residences, commercial suites, and villas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={fetchListings}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-[#1c2a57] hover:bg-[#152042] text-white font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#f7a31d]" />
              <span>Add Listing</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Quick Filter Tabs */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, or type..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { label: "All Properties", key: "all" },
                { label: "Featured", key: "featured" },
                { label: "Active", key: "active" },
                { label: "Inactive", key: "inactive" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterType(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterType === tab.key
                      ? "bg-[#1c2a57] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Listings Table Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Specs</th>
                  <th className="px-6 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="h-12 bg-slate-100 rounded-2xl"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400 text-xs font-medium">
                      No listings found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => {
                    const mainImage =
                      listing.images && listing.images.length > 0
                        ? listing.images[0]
                        : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80";

                    return (
                      <tr
                        key={listing.id}
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        {/* Property Image & Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={mainImage}
                              alt={listing.name}
                              className="w-16 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                            <div className="space-y-0.5 max-w-[200px]">
                              <p className="font-bold text-slate-900 group-hover:text-[#1c2a57] transition-colors truncate">
                                {listing.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                ID: #{listing.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 font-semibold text-slate-700 capitalize">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                            {listing.category || "Residential"}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4 text-slate-600 font-medium max-w-[160px] truncate">
                          <div className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#f7a31d] shrink-0" />
                            <span className="truncate">{listing.location || "N/A"}</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-black text-[#1c2a57] whitespace-nowrap">
                          ₹ {Number(listing.price || 0).toLocaleString("en-IN")}
                        </td>

                        {/* Specifications (Area/Bed/Bath) */}
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          <div className="flex items-center gap-3 text-[11px] font-semibold">
                            <span className="flex items-center gap-1" title="Bedrooms">
                              <Bed className="w-3.5 h-3.5 text-slate-400" />
                              {listing.bedrooms || 0}
                            </span>
                            <span className="flex items-center gap-1" title="Bathrooms">
                              <Bath className="w-3.5 h-3.5 text-slate-400" />
                              {listing.bathrooms || 0}
                            </span>
                            <span className="flex items-center gap-1" title="Area">
                              <Maximize2 className="w-3 h-3 text-slate-400" />
                              {listing.area || "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Featured Star */}
                        <td className="px-6 py-4 text-center">
                          {listing.is_featured ? (
                            <div className="inline-flex p-1.5 rounded-full bg-amber-50 border border-amber-200">
                              <Star className="w-4 h-4 fill-[#f7a31d] text-[#f7a31d]" />
                            </div>
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )}
                        </td>

                        {/* Active / Inactive Status */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {listing.is_active ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3 h-3" /> Inactive
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(listing)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-[#1c2a57] text-slate-600 hover:text-white transition-all cursor-pointer"
                              title="Edit Listing"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteListing(listing.id)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-all cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Listing Form Modal */}
      <ListingFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        editing={editing}
        fetchListings={fetchListings}
        API={API}
      />
    </div>
  );
};

export default AdminListing;