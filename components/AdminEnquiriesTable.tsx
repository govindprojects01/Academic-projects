"use client";

import React, { useState, useTransition } from "react";
import { 
  ServiceEnquiry, 
  updateEnquiryStatus, 
  deleteServiceEnquiry 
} from "@/app/actions";
import { 
  FileText, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Download, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  XCircle,
  RefreshCw,
  Search
} from "lucide-react";

interface AdminEnquiriesTableProps {
  initialEnquiries: ServiceEnquiry[];
}

export function AdminEnquiriesTable({ initialEnquiries }: AdminEnquiriesTableProps) {
  const [enquiries, setEnquiries] = useState<ServiceEnquiry[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (enquiryId: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await updateEnquiryStatus(enquiryId, newStatus);
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === enquiryId
              ? { ...item, status: newStatus as ServiceEnquiry["status"] }
              : item
          )
        );
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    });
  };

  const handleDelete = (enquiryId: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    startTransition(async () => {
      try {
        await deleteServiceEnquiry(enquiryId);
        setEnquiries((prev) => prev.filter((item) => item.id !== enquiryId));
      } catch (err) {
        console.error("Failed to delete enquiry:", err);
      }
    });
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      item.full_name?.toLowerCase().includes(searchLower) ||
      item.phone?.toLowerCase().includes(searchLower) ||
      item.course?.toLowerCase().includes(searchLower) ||
      item.topic?.toLowerCase().includes(searchLower) ||
      item.university?.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, course, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {["ALL", "PENDING", "CONTACTED", "IN_PROGRESS", "COMPLETED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                statusFilter === st
                  ? "bg-brand-blue text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List / Table */}
      {filteredEnquiries.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-2xs">
          <FileText className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-base font-bold text-slate-900">No enquiries found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            No customer requirement enquiries match your search filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((item) => {
            const waMsg = `Hello ${item.full_name}, regarding your ${item.course} project enquiry for "${item.topic}"...`;
            const waUrl = `https://wa.me/${item.phone.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-xs transition space-y-4"
              >
                {/* Top Row: Name, Course, Status & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-black text-slate-900">{item.full_name}</h4>
                      <span className="rounded font-bold bg-blue-50 text-brand-blue border border-blue-200 px-2 py-0.5 text-xs">
                        {item.course}
                      </span>
                      <span className="rounded font-bold bg-slate-100 text-slate-700 px-2 py-0.5 text-xs">
                        {item.branch}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>🏛️ {item.university || "University not specified"}</span>
                      <span>📅 Deadline: <strong>{item.deadline}</strong></span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Dropdown */}
                    <select
                      value={item.status}
                      disabled={isPending}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold border outline-none cursor-pointer ${
                        item.status === "PENDING"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : item.status === "CONTACTED"
                          ? "bg-blue-50 text-blue-800 border-blue-300"
                          : item.status === "IN_PROGRESS"
                          ? "bg-purple-50 text-purple-800 border-purple-300"
                          : item.status === "COMPLETED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>

                    {/* Delete Action */}
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition border border-slate-200"
                      title="Delete enquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Middle Row: Details Grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Project Topic</span>
                    <span className="font-bold text-slate-900">{item.topic}</span>
                  </div>

                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Project Type</span>
                    <span className="font-semibold text-slate-800">{item.project_type}</span>
                  </div>

                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Phone / WhatsApp</span>
                    <span className="font-mono font-bold text-slate-800">{item.phone}</span>
                  </div>

                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Preferred Tech</span>
                    <span className="text-slate-700">{item.preferred_tech || "Not specified"}</span>
                  </div>

                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Deliverables</span>
                    <span className="text-slate-700">{item.deliverables || "Not specified"}</span>
                  </div>

                  <div>
                    <span className="block font-bold text-slate-400 text-[10px] uppercase">Pages & Budget</span>
                    <span className="text-slate-700">{item.pages || "N/A"} | {item.budget || "N/A"}</span>
                  </div>
                </div>

                {/* Notes if present */}
                {item.notes && (
                  <div className="text-xs bg-amber-50/50 border border-amber-200/60 p-3 rounded-lg text-slate-700">
                    <strong className="text-slate-900 block font-bold mb-0.5">Instructions / Notes:</strong>
                    {item.notes}
                  </div>
                )}

                {/* Bottom Row: Actions & Attachment */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                  {/* File Attachment Link */}
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-brand-blue hover:bg-blue-100 transition"
                    >
                      <Download className="h-4 w-4" />
                      Download Attachment ({item.file_name || "File"} — {item.file_size || "50MB Max"})
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No file attached</span>
                  )}

                  {/* Contact Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${item.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Phone className="h-3.5 w-3.5" /> Call
                    </a>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-700 transition shadow-2xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Customer
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
