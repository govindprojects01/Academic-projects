"use client";

import React, { useState, useTransition, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Trash2, 
  Loader2, 
  ZoomIn, 
  ZoomOut, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Info,
  X
} from "lucide-react";
import { submitServiceEnquiry } from "@/app/actions";

interface ServiceRequirementWorkspaceProps {
  initialCourse?: string;
}

const courseOptions = [
  "B.Tech / B.E Projects",
  "MBA Projects & Reports",
  "BCA / MCA Projects",
  "Diploma / Polytechnic",
  "M.Sc / B.Sc Projects",
  "M.Tech Projects",
  "Assignments",
  "PPT & Presentations",
  "Synopsis & Proposal",
  "Research Papers",
  "Thesis & Dissertation",
  "Other"
];

const branchOptions = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence & ML",
  "Data Science",
  "Management & Finance",
  "Other"
];

const projectTypeOptions = [
  "Final Year Project",
  "Mini Project",
  "Major Project",
  "Synopsis / Proposal",
  "Research Based Project",
  "IoT Project",
  "Software Project",
  "Hardware Project",
  "Assignment",
  "Thesis / Dissertation"
];

const techOptions = [
  "Python",
  "Java",
  "PHP",
  "JavaScript",
  "React",
  "Node.js",
  "Arduino / IoT",
  "Other"
];

const deliverableOptions = [
  { id: "report", label: "📘 Complete Project Report", defaultChecked: true },
  { id: "code", label: "💻 Source Code / Project Files", defaultChecked: true },
  { id: "synopsis", label: "📄 Synopsis / Proposal", defaultChecked: false },
  { id: "ppt", label: "📊 PowerPoint Presentation", defaultChecked: false },
  { id: "viva", label: "🎤 Viva Preparation / Guidance", defaultChecked: false },
  { id: "diagrams", label: "📐 UML / ER / Flowcharts / Diagrams", defaultChecked: false },
];

export function ServiceRequirementWorkspace({ initialCourse }: ServiceRequirementWorkspaceProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourse || "B.Tech / B.E Projects");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [successData, setSuccessData] = useState<{
    enquiryId: string;
    whatsappUrl: string;
  } | null>(null);

  // Sync initialCourse prop if changed externally
  useEffect(() => {
    if (initialCourse) {
      setSelectedCourse(initialCourse);
    }
  }, [initialCourse]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.75, Math.min(1.25, Number((prev + delta).toFixed(2)))));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxBytes = 50 * 1024 * 1024; // 50 MB
      if (file.size > maxBytes) {
        setFileError(`File "${file.name}" exceeds the maximum limit of 50 MB.`);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setFileError(null);

    const formData = new FormData(e.currentTarget);
    if (selectedFile) {
      formData.set("file", selectedFile);
    }

    startTransition(async () => {
      try {
        const res = await submitServiceEnquiry(formData);
        if (res.success) {
          setSuccessData({
            enquiryId: res.enquiryId,
            whatsappUrl: res.whatsappUrl,
          });
        }
      } catch (err: any) {
        console.error("Submission failed:", err);
        setSubmitError(err.message || "Something went wrong. Please check fields and try again.");
      }
    });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="requirement-form" className="scroll-mt-20 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-brand-blue border border-blue-100">
            <Sparkles className="h-3.5 w-3.5" /> Requirement & Demo Workspace
          </span>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Explore Sample & Submit Your Requirements
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-2xl mx-auto">
            Check the sample report structure and submit your project requirements to get a custom quote. Upload documents up to 50 MB.
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* ================= LEFT PANEL: DEMO REPORT PREVIEW ================= */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-blue" />
                <h3 className="font-extrabold text-slate-900 text-base">Sample Report Preview</h3>
              </div>
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-black text-rose-600 border border-rose-200">
                SAMPLE DEMO
              </span>
            </div>

            {/* Document Toolbar */}
            <div className="p-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-600 truncate max-w-[160px]">
                {selectedCourse.split(" ")[0]}_Project_Demo.pdf
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleZoom(0.1)}
                  className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 font-bold text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-2xs"
                  title="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5" /> + Zoom
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-0.1)}
                  className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 font-bold text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-2xs"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-3.5 w-3.5" /> − Zoom
                </button>
              </div>
            </div>

            {/* Document Paper Container */}
            <div className="bg-slate-200/60 p-4 sm:p-6 overflow-auto max-h-[720px] flex justify-center">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease-out",
                }}
                className="relative w-full max-w-[500px] min-h-[640px] bg-white rounded-lg p-6 sm:p-8 shadow-md border border-slate-300 text-slate-800 flex flex-col justify-between"
              >
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <span className="text-4xl font-black text-brand-blue/5 -rotate-45 select-none whitespace-nowrap">
                    PROJECT AREA DEMO
                  </span>
                </div>

                {/* Paper Header */}
                <div>
                  <div className="text-center border-b-2 border-slate-900 pb-4 mb-5">
                    <small className="block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      ACADEMIC {selectedCourse.toUpperCase()}
                    </small>
                    <h4 className="mt-1 text-lg font-black leading-tight text-slate-900">
                      Smart Attendance Management System Using Face Recognition
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 font-medium">
                      Sample Academic Project & Report Documentation
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Department of Computer Science & Engineering
                    </p>
                  </div>

                  {/* Abstract */}
                  <div className="mb-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 text-center mb-1.5">
                      ABSTRACT
                    </h5>
                    <p className="text-[11.5px] leading-relaxed text-slate-700 text-justify">
                      This sample project demonstrates the structure and presentation style of an academic final-year project report. The system explores automated management using modern software technologies, requirement analysis, and practical testing methodologies.
                    </p>
                  </div>

                  {/* Table of Contents */}
                  <div className="mb-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 text-center mb-1.5">
                      TABLE OF CONTENTS
                    </h5>
                    <ul className="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                      <li>Chapter 1 — Introduction & Problem Statement</li>
                      <li>Chapter 2 — Literature Survey & Related Work</li>
                      <li>Chapter 3 — System Architecture & Design</li>
                      <li>Chapter 4 — System Requirements & Tech Stack</li>
                      <li>Chapter 5 — Implementation & Source Code</li>
                      <li>Chapter 6 — Testing & Results Analysis</li>
                      <li>Chapter 7 — Conclusion & Future Scope</li>
                      <li>References & Appendix</li>
                    </ul>
                  </div>

                  {/* Technology Badges */}
                  <div className="rounded-md bg-slate-50 border border-slate-200 p-3 mb-4">
                    <strong className="block text-[11px] font-black text-slate-900 mb-1.5">
                      Technology Stack
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {["Python", "OpenCV", "MySQL", "React", "HTML/CSS", "Node.js"].map((tech) => (
                        <span key={tech} className="rounded bg-white border border-slate-300 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Introduction Snippet */}
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 text-center mb-1.5">
                      SAMPLE INTRODUCTION
                    </h5>
                    <p className="text-[11px] leading-relaxed text-slate-700 text-justify">
                      Software and hardware solutions automate repetitive operational tasks. This report outlines the end-to-end lifecycle from topic selection to testing.
                    </p>
                  </div>
                </div>

                {/* Page Number */}
                <div className="mt-6 text-center text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-2">
                  Page 1 of Demo Sample
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL: REQUIREMENT FORM ================= */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-blue" />
                <h3 className="font-extrabold text-slate-900 text-lg">Project Requirement Form</h3>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-black text-brand-blue border border-blue-200">
                GET QUOTE
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Quote Note Box */}
              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-slate-700 flex items-start gap-3">
                <Info className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-black text-sm mb-0.5">
                    💬 Custom Project Quote
                  </strong>
                  Pricing depends on project scope, technology, documentation length, deliverables, and required deadline. Fill in your details below.
                </div>
              </div>

              {submitError && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-xs font-bold text-red-700 border border-red-200">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 2-Column Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g., 9876543210"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label htmlFor="course" className="block text-xs font-bold text-slate-700 mb-1">
                      Course *
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    >
                      {courseOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Branch Dropdown */}
                  <div>
                    <label htmlFor="branch" className="block text-xs font-bold text-slate-700 mb-1">
                      Branch / Stream *
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      required
                      defaultValue="Computer Science & Engineering"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    >
                      {branchOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* University / College */}
                  <div className="sm:col-span-2">
                    <label htmlFor="university" className="block text-xs font-bold text-slate-700 mb-1">
                      University / College Name
                    </label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      placeholder="Enter your university or college name"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-bold text-slate-700 mb-1">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      defaultValue="Final Year Project"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    >
                      {projectTypeOptions.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Deadline Date */}
                  <div>
                    <label htmlFor="deadline" className="block text-xs font-bold text-slate-700 mb-1">
                      Required By (Deadline) *
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      min={todayStr}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Project Topic */}
                  <div className="sm:col-span-2">
                    <label htmlFor="topic" className="block text-xs font-bold text-slate-700 mb-1">
                      Project Topic / Title *
                    </label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      required
                      placeholder="e.g., AI Based Attendance System / E-Commerce Web App"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Preferred Technology Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Preferred Technology
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {techOptions.map((tech) => (
                      <label key={tech} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 cursor-pointer hover:border-blue-300 text-xs font-medium text-slate-700">
                        <input type="checkbox" name="preferredTech" value={tech} className="rounded text-brand-blue focus:ring-brand-blue" />
                        <span>{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Required Deliverables
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {deliverableOptions.map((item) => (
                      <label key={item.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 cursor-pointer hover:border-blue-300 text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          name="deliverables"
                          value={item.label}
                          defaultChecked={item.defaultChecked}
                          className="rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pages & Budget Dropdowns */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pages" className="block text-xs font-bold text-slate-700 mb-1">
                      Approx. Report Pages
                    </label>
                    <select
                      id="pages"
                      name="pages"
                      defaultValue="30–50 Pages"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    >
                      <option>30–50 Pages</option>
                      <option>50–70 Pages</option>
                      <option>70–100 Pages</option>
                      <option>100+ Pages</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs font-bold text-slate-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue="Under ₹5,000"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                    >
                      <option>Under ₹5,000</option>
                      <option>₹5,000 – ₹10,000</option>
                      <option>₹10,000 – ₹20,000</option>
                      <option>₹20,000+</option>
                    </select>
                  </div>
                </div>

                {/* Additional Requirements Textarea */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-slate-700 mb-1">
                    Additional Requirements / Instructions
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Provide formatting guidelines, research objectives, database preferences, etc."
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100 resize-y"
                  />
                </div>

                {/* File Upload Field (Max 50 MB) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Attach Project Guidelines / Reference File (Max 50 MB)
                  </label>

                  {fileError && (
                    <p className="mb-2 text-xs font-bold text-red-600">{fileError}</p>
                  )}

                  {!selectedFile ? (
                    <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center hover:bg-blue-50/50 hover:border-brand-blue transition cursor-pointer">
                      <Upload className="h-7 w-7 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-brand-blue">
                        Click to upload file (PDF, Zip, Doc, Images)
                      </span>
                      <span className="mt-1 text-[11px] text-slate-400">
                        Maximum file size limit: <strong>50 MB</strong>
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.zip,.rar,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="h-6 w-6 text-brand-blue flex-shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600 transition"
                        title="Remove file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-[48px] rounded-xl bg-brand-green px-5 py-3 font-black text-white shadow-sm hover:bg-green-600 transition disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting to Database...
                    </>
                  ) : (
                    <>
                      📩 Send Project Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS MODAL */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-center relative">
            <button
              onClick={() => setSuccessData(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-black text-slate-900">Enquiry Submitted!</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Your project requirement has been saved to our database. Our academic consultant will review it shortly.
            </p>

            <div className="my-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs">
              <span className="block font-bold text-slate-400 uppercase text-[10px]">Reference ID</span>
              <span className="font-mono font-bold text-brand-blue text-sm">{successData.enquiryId}</span>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={successData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-xs font-black text-white hover:bg-green-600 transition shadow-sm"
              >
                <MessageSquare className="h-4 w-4" /> Continue on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
