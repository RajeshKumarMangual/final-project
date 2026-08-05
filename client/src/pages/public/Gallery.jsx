import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";

const Gallery = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Residential");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/gallery/`);
      setImages(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      showStatus("error", "Failed to load property gallery items.");
    } finally {
      setFetching(false);
    }
  };

  const showStatus = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
  };

  const resetForm = () => {
    setImageUrl("");
    setTitle("");
    setCategory("Residential");
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleEditClick = (image) => {
    setEditing(image.id);
    setImageUrl(image.image_url || "");
    setTitle(image.title || "");
    setCategory(image.category || "Residential");
    setIsModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setLoading(true);

    const payload = {
      image_url: imageUrl,
      ...(title && { title }),
      ...(category && { category }),
    };

    try {
      if (editing) {
        await axios.put(`${API}/gallery/${editing}/update/`, payload);
        showStatus("success", "Gallery image updated successfully.");
      } else {
        await axios.post(`${API}/gallery/create/`, payload);
        showStatus("success", "New media asset added to gallery.");
      }

      resetForm();
      fetchGallery();
    } catch (err) {
      console.error("Submission error:", err);
      showStatus("error", "Something went wrong while saving the asset.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property photo?")) return;

    try {
      await axios.delete(`${API}/gallery/${id}/delete/`);
      showStatus("success", "Asset deleted successfully.");
      fetchGallery();
    } catch (err) {
      console.error("Delete error:", err);
      showStatus("error", "Failed to delete the image from server.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-[#1c2a57] rounded-3xl p-8 text-white shadow-xl shadow-[#1c2a57]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[11px] font-bold uppercase tracking-widest border border-white/10">
              <Building2 className="w-3.5 h-3.5" /> Urban Estates Admin
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Property Showcase Gallery
            </h1>
            <p className="text-slate-300 text-xs">
              Manage luxury portfolio photos, architectural interior shots, and marketing assets.
            </p>
          </div>

         
        </div>

        {/* Status Alerts */}
        {statusMessage.text && (
          <div
            className={`px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 border transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Gallery Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Media Assets ({images.length})
            </h2>
          </div>

          {fetching ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm space-y-3">
              <div className="w-8 h-8 border-3 border-[#1c2a57]/20 border-t-[#1c2a57] rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-slate-500 font-medium">Fetching gallery items...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-800 font-bold text-sm">No Property Images Found</p>
                <p className="text-slate-400 text-xs mt-1">Start by adding high-resolution photo URLs to your showcase gallery.</p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#1c2a57] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-[#152042] transition-all"
              >
                <Plus className="w-4 h-4 text-[#f7a31d]" />
                <span>Upload First Photo</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
                >
                  {/* Image Display */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title || "Property Showcase"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600";
                      }}
                    />
                    
                    {/* Badge */}
                    {image.category && (
                      <span className="absolute top-3 left-3 bg-[#1c2a57]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                        {image.category}
                      </span>
                    )}

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button
                        onClick={() => handleEditClick(image)}
                        className="w-10 h-10 rounded-xl bg-white text-[#1c2a57] flex items-center justify-center shadow-lg hover:bg-[#f7a31d] hover:text-[#1c2a57] transition-all cursor-pointer"
                        title="Edit Image"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <a
                        href={image.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-white text-[#1c2a57] flex items-center justify-center shadow-lg hover:bg-[#f7a31d] hover:text-[#1c2a57] transition-all cursor-pointer"
                        title="View Full Resolution"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(image.id)}
                        className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg hover:bg-rose-700 transition-all cursor-pointer"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Caption Footer if exists */}
                  {image.title && (
                    <div className="p-3.5 bg-white border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{image.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Add / Edit Asset */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 shadow-2xl space-y-6 relative">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editing ? "Update Gallery Image" : "Add Property Image"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter the CDN or direct web link for the listing photograph.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Inputs */}
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Image URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Tag / Title <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Skyline Penthouse Master Bedroom"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Interior">Interior Design</option>
                  </select>
                </div>

                {/* Preview Thumbnail */}
                {imageUrl && (
                  <div className="pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Live Image Preview</p>
                    <div className="h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#1c2a57]/30 border-t-[#1c2a57] rounded-full animate-spin"></span>
                        <span>Saving Asset...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{editing ? "Save Changes" : "Confirm Upload"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;