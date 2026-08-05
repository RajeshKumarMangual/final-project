import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I schedule a property viewing with URBAN ESTATES?",
      a: "Fill out the contact form specifying the property ID or preferred neighborhood. An agent will reach out within 2 hours to confirm your private viewing time.",
    },
    {
      q: "What types of real estate services do you provide?",
      a: "We manage residential purchases, luxury villa rentals, commercial property acquisitions, plot investments, and full property management services.",
    },
    {
      q: "Are there any hidden consulting or booking fees?",
      a: "No. All initial consultations, property viewings, and valuation inquiries with Urban Estates are completely transparent and complimentary.",
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/contacts/create/`,
        formData,
      );

      setSuccess(
        res.data.message ||
          "Your inquiry has been submitted! Our real estate team will get back to you shortly.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send your inquiry. Please verify your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Dark Executive Brand Hero */}
          <div className="lg:col-span-5 bg-[#1c2a57] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#f7a31d]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              {/* Badge & Title */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f7a31d] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md mb-4 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" /> Urban Estates Support
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Let's Find Your Next Property.
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Have questions about investment opportunities, residential
                  listings, or luxury suites? Speak directly with our advisory
                  specialists.
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#f7a31d]/20 text-[#f7a31d] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Corporate Hub
                    </p>
                    <p className="text-xs text-white font-medium">
                      123 Executive Tower, Business District
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#f7a31d]/20 text-[#f7a31d] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Direct Hotline
                    </p>
                    <p className="text-xs text-white font-medium">
                      +1 (800) 555-0199 / +1 (800) 555-0144
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#f7a31d]/20 text-[#f7a31d] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Email Inquiry
                    </p>
                    <p className="text-xs text-white font-medium">
                      contact@urbanestates.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-[#f7a31d]">98%</p>
                <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                  Client Satisfaction
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#f7a31d]">24/7</p>
                <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                  Property Support
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Send an Inquiry
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Fill out the form below and an agent will get back to you within
                24 hours.
              </p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-6 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject / Interest <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Buying Villa, Property Tour"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding preferred location, budget, or general questions..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#1c2a57]/20 focus:border-[#1c2a57] transition-all font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f7a31d] hover:bg-[#e09112] text-[#1c2a57] font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-[#f7a31d]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#1c2a57]/30 border-t-[#1c2a57] rounded-full animate-spin"></span>
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Query</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Quick answers regarding client inquiries, property visits, and
              advisory services.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-[#f7a31d]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
