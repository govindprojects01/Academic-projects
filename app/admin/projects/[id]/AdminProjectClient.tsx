"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, Download, Loader2, CheckCircle2, AlertTriangle, Calendar, User, Mail } from "lucide-react";
import { Project, ProjectFile, updateProjectStatus, uploadDeliveryFiles } from "@/app/actions";

interface AdminProjectClientProps {
  project: Project;
  files: ProjectFile[];
}

export default function AdminProjectClient({ project: initialProject, files: initialFiles }: AdminProjectClientProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [files, setFiles] = useState<ProjectFile[]>(initialFiles);
  const [statusPending, startStatusTransition] = useTransition();
  const [uploadPending, startUploadTransition] = useTransition();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const requirementFiles = files.filter((f) => f.file_type === "requirement");
  const deliveryFiles = files.filter((f) => f.file_type === "delivery");

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as any;
    setStatusMessage(null);
    
    startStatusTransition(async () => {
      try {
        await updateProjectStatus(project.id, newStatus);
        setProject((prev) => ({ ...prev, status: newStatus }));
        setStatusMessage("Project status updated successfully!");
      } catch (err: any) {
        console.error(err);
        setStatusMessage("Error: Failed to update status.");
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      setUploadMessage(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;
    
    setUploadMessage(null);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    startUploadTransition(async () => {
      try {
        await uploadDeliveryFiles(project.id, formData);
        
        // Refresh the page or files array (we can just reload to fetch updated files, or append them)
        // For simplicity and correctness, window.location.reload() ensures everything is in sync
        setUploadMessage("Delivery files uploaded successfully!");
        setSelectedFiles([]);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err: any) {
        console.error(err);
        setUploadMessage("Error: Failed to upload deliverables.");
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Admin Portal
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Main Details (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Project Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h1 className="text-2xl font-black text-slate-900 leading-tight">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Submitted: {new Date(project.created_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold leading-5 ${
                  project.status === "PENDING"
                    ? "bg-amber-100 text-amber-800"
                    : project.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : project.status === "COMPLETED"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Description & Structured Parameters */}
            <div className="mt-6 space-y-6">
              {(project.course || project.branch || project.project_type || project.deadline) && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {project.course && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Course</span>
                      <span className="font-bold text-slate-900">{project.course}</span>
                    </div>
                  )}
                  {project.branch && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Branch / Stream</span>
                      <span className="font-bold text-slate-900">{project.branch}</span>
                    </div>
                  )}
                  {project.project_type && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Project Type</span>
                      <span className="font-semibold text-slate-800">{project.project_type}</span>
                    </div>
                  )}
                  {project.deadline && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Required By</span>
                      <span className="font-semibold text-amber-700">📅 {project.deadline}</span>
                    </div>
                  )}
                  {project.university && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">University</span>
                      <span className="text-slate-800">{project.university}</span>
                    </div>
                  )}
                  {project.preferred_tech && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Preferred Tech</span>
                      <span className="text-slate-800">{project.preferred_tech}</span>
                    </div>
                  )}
                  {project.deliverables && (
                    <div className="sm:col-span-2">
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Required Deliverables</span>
                      <span className="text-slate-800">{project.deliverables}</span>
                    </div>
                  )}
                  {(project.pages || project.budget) && (
                    <div>
                      <span className="block font-bold text-slate-400 text-[10px] uppercase">Pages & Budget</span>
                      <span className="text-slate-800">{project.pages || "N/A"} | {project.budget || "N/A"}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-slate-900">Requirements Detail</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Client Files Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-base font-bold text-slate-900">Client Reference Files ({requirementFiles.length})</h3>
            {requirementFiles.length === 0 ? (
              <p className="text-sm text-slate-400 mt-3">No reference files uploaded by the client.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200">
                {requirementFiles.map((file) => (
                  <li key={file.id} className="flex items-center justify-between py-3.5 pl-4 pr-5 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <FileText className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <span className="ml-3 truncate font-medium text-slate-700 max-w-[200px] sm:max-w-md">
                        {file.file_name}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-brand-blue hover:text-blue-600 inline-flex items-center gap-1 transition"
                      >
                        Download
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Uploaded Deliverables Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-base font-bold text-slate-900">Currently Uploaded Deliverables ({deliveryFiles.length})</h3>
            {deliveryFiles.length === 0 ? (
              <p className="text-sm text-slate-400 mt-3">No files have been delivered to the client yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200">
                {deliveryFiles.map((file) => (
                  <li key={file.id} className="flex items-center justify-between py-3.5 pl-4 pr-5 text-sm bg-slate-50/50">
                    <div className="flex w-0 flex-1 items-center">
                      <FileText className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="ml-3 truncate font-medium text-slate-700 max-w-[200px] sm:max-w-md" title={file.file_name}>
                        {file.file_name}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-500 hover:text-slate-700 inline-flex items-center gap-1 transition"
                      >
                        View Link
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Sidebar Management Panel (Right 1/3) */}
        <div className="space-y-6">
          
          {/* Client Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Client Info</h3>
            <div className="mt-4 space-y-3.5">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Name</p>
                  <p className="text-sm font-bold text-slate-800">{project.user_name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <p className="text-sm font-bold text-slate-800 truncate" title={project.user_email}>
                    {project.user_email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action: Status Selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Project Status</h3>
            
            <div className="mt-4">
              <label htmlFor="status" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Change Status
              </label>
              <div className="relative mt-2">
                <select
                  id="status"
                  name="status"
                  value={project.status}
                  disabled={statusPending}
                  onChange={handleStatusChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:opacity-50"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
                {statusPending && (
                  <div className="absolute right-8 top-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                  </div>
                )}
              </div>

              {statusMessage && (
                <p className={`mt-3 text-xs font-semibold ${statusMessage.startsWith("Error") ? "text-red-600" : "text-emerald-600"}`}>
                  {statusMessage}
                </p>
              )}
            </div>
          </div>

          {/* Action: Delivery Uploader */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Deliver Final Work</h3>
            
            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Completed Files
                </label>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-200 px-4 py-6 hover:border-slate-300 transition cursor-pointer relative bg-slate-50/50">
                  <input
                    type="file"
                    multiple
                    disabled={uploadPending}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                    <span className="mt-2 block text-xs font-semibold text-brand-blue">Upload deliverables</span>
                  </div>
                </div>
              </div>

              {/* Selected file names preview */}
              {selectedFiles.length > 0 && (
                <div className="rounded-md bg-slate-50 p-3 text-xs space-y-1.5 max-h-40 overflow-y-auto">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Files to Upload ({selectedFiles.length})</p>
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                      <span className="truncate flex-1">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {uploadMessage && (
                <p className={`text-xs font-semibold ${uploadMessage.startsWith("Error") ? "text-red-600" : "text-emerald-600"}`}>
                  {uploadMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={selectedFiles.length === 0 || uploadPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green py-2.5 text-sm font-black text-white shadow-sm hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading Assets...
                  </>
                ) : (
                  "Upload & Deliver Work"
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
