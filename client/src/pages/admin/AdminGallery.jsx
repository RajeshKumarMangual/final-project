import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Pencil,
  Plus,
  Trash2,
  ArrowLeft,
  X,
  RefreshCw,
  Copy,
  Check,
  Eye,
  Sparkles,
  Link2,
} from "lucide-react";

const AdminGallery = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [previewModal, setPreviewModal] = useState(null);

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
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setImageUrl("");
    setEditing(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await axios.put(`${API}/gallery/${editing}/update/`, {
          image_url: imageUrl,
        });
      } else {
        await axios.post(`${API}/gallery/create/`, {
          image_url: imageUrl,
        });
      }

      resetForm();
      fetchGallery();
    } catch (err) {
      console.error("Error saving image:", err);
      alert("Failed to save image asset.");
    } finally {
      setLoading(false);
    }
  };

  const editImage = (image) => {
    setEditing(image.id);
    setImageUrl(image.image_url);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media asset?")) return;

    try {
      await axios.delete(`${API}/gallery/${id}/delete/`);
      fetchGallery();
    } catch (err) {
      console.error("Error deleting image:", err);
      alert("Failed to delete media asset.");
    }
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
                <ImageIcon className="w-3.5 h-3.5 text-[#f7a31d]" /> Visual Assets Management
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Media Gallery ({images.length})
              </h1>
              <p className="text-slate-500 text-xs">
                Upload, manage, and curate high-resolution property showcase photography.
              </p>
            </div>
          </div>

          <button
            onClick={fetchGallery}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${fetching ? "animate-spin" : ""}`} />
            <span>Refresh Assets</span>
          </button>
        </div>

        {/* Add / Edit Image Form Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1c2a57] text-[#f7a31d] flex items-center justify-center font-bold text-xs">
                {editing ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {editing ? "Edit Gallery Image" : "Upload New Gallery Asset"}
              </h2>
            </div>

            {editing && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Editing Asset #{editing}
              </span>
            )}
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Input Field Column */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-[#f7a31d]" /> Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                    required
                  />
                  <p className="text-[11px] text-slate-400">
                    Provide a direct HTTPS image address (Unsplash, Cloudinary, S3, or hosted CDN).
                  </p>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#1c2a57] hover:bg-[#152042] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {editing ? <Sparkles className="w-4 h-4 text-[#f7a31d]" /> : <Plus className="w-4 h-4 text-[#f7a31d]" />}
                    <span>{loading ? "Saving Asset..." : editing ? "Update Image" : "Add To Gallery"}</span>
                  </button>

                  {editing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Live Preview Column */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Preview
                </label>
                <div className="h-44 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-[11px] text-slate-400 font-medium">
                        Paste a valid image URL above to see the live thumbnail preview.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Gallery Image Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pl-1">
            Curated Showcase Grid ({images.length})
          </h2>

          {fetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-64 border border-slate-100 animate-pulse p-4">
                  <div className="w-full h-44 bg-slate-100 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-slate-100 rounded-lg w-2/3"></div>
                </div>
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Gallery Media Assets Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Use the submission form above to add your first luxury property image asset to the public gallery.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={`Gallery Asset ${img.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80";
                      }}
                    />

                    {/* Image Hover Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => setPreviewModal(img.image_url)}
                        className="p-2.5 bg-white/90 hover:bg-white text-slate-800 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-110"
                        title="Expand Image"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(img.image_url, img.id)}
                        className="p-2.5 bg-white/90 hover:bg-white text-slate-800 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-110"
                        title="Copy Image URL"
                      >
                        {copiedId === img.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <span className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      #{img.id}
                    </span>
                  </div>

                  {/* Bottom Controls */}
                  <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[120px]">
                      {img.image_url}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => editImage(img)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-[#1c2a57] text-slate-600 hover:text-white transition-all cursor-pointer"
                        title="Edit Asset"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteImage(img.id)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-all cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {previewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewModal(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewModal}
              alt="Expanded Preview"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGallery;