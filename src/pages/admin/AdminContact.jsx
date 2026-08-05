import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  X,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const AdminContact = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Modal State for Viewing Full Contact
  const [viewingContact, setViewingContact] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/contacts/`);
      setContacts(res.data.data || res.data || []);
    } catch (error) {
      console.error("Error fetching contact queries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact query?",
    );

    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API}/contacts/${id}/delete/`);
      setContacts((prev) => prev.filter((item) => item.id !== id));
      if (viewingContact?.id === id) {
        setViewingContact(null);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API}/contacts/${id}/update/`, { status });

      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );

      if (viewingContact?.id === id) {
        setViewingContact((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  // Filter contacts based on search and status tabs
  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatusFilter === "all" ||
        (item.status || "new").toLowerCase() ===
          selectedStatusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, selectedStatusFilter]);

  const getStatusBadge = (status) => {
    const st = (status || "new").toLowerCase();
    switch (st) {
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" /> Contacted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" /> New
          </span>
        );
    }
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
                <MessageSquare className="w-3.5 h-3.5 text-[#f7a31d]" /> Inquiry
                Management
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Contact Queries ({contacts.length})
              </h1>
              <p className="text-slate-500 text-xs">
                Review messages, respond to leads, and track resolution
                statuses.
              </p>
            </div>
          </div>

          <button
            onClick={fetchContacts}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or subject..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:bg-white focus:border-[#1c2a57] transition-all"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {["all", "new", "contacted", "closed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatusFilter(st)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                    selectedStatusFilter === st
                      ? "bg-[#1c2a57] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Message Preview</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Submitted</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="h-6 bg-slate-100 rounded-xl"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-slate-400 text-xs font-medium"
                    >
                      No contact queries found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Name */}
                      <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                        {item.name || "N/A"}
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                          <Mail className="w-3.5 h-3.5 text-[#f7a31d] shrink-0" />
                          <span>{item.email || "—"}</span>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4 font-semibold text-slate-800 max-w-[180px] truncate">
                        {item.subject || "General Inquiry"}
                      </td>

                      {/* Message Preview */}
                      <td className="px-6 py-4 max-w-xs text-slate-500">
                        <p className="line-clamp-2 leading-relaxed">
                          {item.message || "No message content."}
                        </p>
                      </td>

                      {/* Status Dropdown / Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.status || "new"}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                          className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none focus:border-[#1c2a57] transition-all cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-[11px] font-medium">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewingContact(item)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-[#1c2a57] text-slate-600 hover:text-white transition-all cursor-pointer"
                            title="View Full Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                            title="Delete Contact Query"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FULL MESSAGE VIEW MODAL */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#f7a31d] uppercase tracking-wider">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {viewingContact.subject || "General Inquiry"}
                </h3>
              </div>
              <button
                onClick={() => setViewingContact(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    From
                  </span>
                  <p className="font-bold text-slate-800">
                    {viewingContact.name}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Status
                  </span>
                  <div className="pt-0.5">
                    {getStatusBadge(viewingContact.status)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Email
                  </span>
                  <p className="font-medium text-slate-700">
                    {viewingContact.email || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Phone
                  </span>
                  <p className="font-medium text-slate-700">
                    {viewingContact.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Message
                </span>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {viewingContact.message || "No message content."}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  Update Status:
                </span>
                <select
                  value={viewingContact.status || "new"}
                  onChange={(e) =>
                    handleStatusChange(viewingContact.id, e.target.value)
                  }
                  className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 outline-none focus:border-[#1c2a57]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <button
                onClick={() => handleDelete(viewingContact.id)}
                className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
