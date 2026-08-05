import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  Plus,
  Trash2,
  Building2,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Check,
} from "lucide-react";

const categories = ["house", "apartment", "land"];

const amenitiesList = [
  "Parking",
  "Internet",
  "Television",
  "Security",
  "Fire Alarm",
  "Furniture",
  "Storage",
];

const initialState = {
  category: "house",
  name: "",
  description: "",
  price: "",
  location: "",
  images: [""],
  amenities: [],
  bedrooms: 0,
  bathrooms: 0,
  area: "",
  is_featured: false,
  is_active: true,
};

const ListingFormModal = ({
  open,
  onClose,
  editing,
  fetchListings,
  API,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        images:
          editing.images?.length > 0
            ? editing.images
            : [""],
      });
    } else {
      setForm(initialState);
    }
  }, [editing, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const changeImage = (index, value) => {
    const imgs = [...form.images];
    imgs[index] = value;

    setForm({
      ...form,
      images: imgs,
    });
  };

  const addImage = () => {
    setForm({
      ...form,
      images: [...form.images, ""],
    });
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  const toggleAmenity = (amenity) => {
    if (form.amenities.includes(amenity)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== amenity),
      });
    } else {
      setForm({
        ...form,
        amenities: [...form.amenities, amenity],
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        images: form.images.filter((img) => img.trim() !== ""),
      };

      if (editing) {
        await axios.put(
          `${API}/listings/${editing.id}/update/`,
          payload
        );
      } else {
        await axios.post(
          `${API}/listings/create/`,
          payload
        );
      }

      fetchListings();
      onClose();
    } catch (err) {
      console.error("Error saving listing:", err);
      alert("Something went wrong while saving the property listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 space-y-6">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2a57]/5 text-[#1c2a57] text-[11px] font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-[#f7a31d]" /> Estate Portfolio Editor
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {editing ? "Edit Property Listing" : "Add New Property Listing"}
          </h2>
          <p className="text-slate-500 text-xs">
            Fill in the details below to create or update an estate record on URBAN ESTATES.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={submit} className="space-y-6">
          
          {/* Section 1: Property Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Basic Property Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all capitalize cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Property Title
                </label>
                <input
                  name="name"
                  placeholder="e.g. Imperial Heights Penthouse"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                placeholder="Describe the luxury specifications, architecture, and interior amenities..."
                value={form.description}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-[#f7a31d]" /> Price (INR)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="e.g. 25000000"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#f7a31d]" /> Location
                </label>
                <input
                  name="location"
                  placeholder="e.g. Patia, Bhubaneswar"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Image Assets */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#f7a31d]" /> Property Gallery Images
              </h3>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1c2a57] hover:text-[#f7a31d] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More Image URLs</span>
              </button>
            </div>

            <div className="space-y-3">
              {form.images.map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Optional Image Thumbnail Preview */}
                  <div className="w-12 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {img ? (
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&q=80";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-slate-300" />
                    )}
                  </div>

                  <input
                    value={img}
                    onChange={(e) => changeImage(index, e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                  />

                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                      title="Remove Image Input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Specifications */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Specifications
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Bed className="w-3 h-3 text-slate-400" /> Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="0"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Bath className="w-3 h-3 text-slate-400" /> Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="0"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-slate-400" /> Area
                </label>
                <input
                  name="area"
                  placeholder="e.g. 3,200 sqft"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Amenities */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              4. Features & Amenities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {amenitiesList.map((amenity) => {
                const isSelected = form.amenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#1c2a57] text-white border-[#1c2a57] shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{amenity}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#f7a31d]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Publishing Switches */}
          <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-[#1c2a57] focus:ring-[#1c2a57]"
              />
              <span className="text-xs font-bold text-slate-700">Featured Property</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-[#1c2a57] focus:ring-[#1c2a57]"
              />
              <span className="text-xs font-bold text-slate-700">Active Listing</span>
            </label>
          </div>

          {/* Form Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1c2a57] hover:bg-[#152042] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#f7a31d]" />
              <span>
                {loading
                  ? "Saving Property Record..."
                  : editing
                  ? "Update Property Listing"
                  : "Create Property Listing"}
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ListingFormModal;