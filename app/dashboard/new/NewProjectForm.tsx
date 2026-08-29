"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, File, Trash2, Loader2 } from "lucide-react";
import { createProject } from "@/app/actions";

export default function NewProjectForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
      setError(null);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.delete("files");
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    startTransition(async () => {
      try {
        await createProject(formData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong while submitting the request.");
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Card Form Wrapper */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">New Project Request</h1>
          <p className="text-slate-500 mt-1">
            Provide instructions and upload documents for your web development or design request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-700">
              Project Title / Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              disabled={isPending}
              placeholder="e.g., Logo design for Cafe, E-commerce Landing Page"
              className="mt-2 block w-full rounded-md border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:bg-slate-50"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-slate-700">
              Requirements / Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              required
              disabled={isPending}
              placeholder="Detail what you need. For websites, include layout ideas, color preferences, and features. For designs, specify sizes, formats, and references."
              className="mt-2 block w-full rounded-md border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:bg-slate-50"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700">Upload Files & Reference Documents</label>
            
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-8 hover:border-slate-400 transition cursor-pointer relative bg-slate-50">
              <input
                type="file"
                multiple
                id="files"
                disabled={isPending}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="text-center">
                <Upload className="mx-auto h-10 w-10 text-slate-400" />
                <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                  <span className="font-semibold text-brand-blue hover:text-blue-600">Upload files</span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-slate-400">
                  PDFs, Zips, Docs, PNGs, JPGs up to 10MB
                </p>
              </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Selected Files ({selectedFiles.length})
                </h4>
                <ul className="divide-y divide-slate-100 rounded-md border border-slate-100 bg-white">
                  {selectedFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <File className="h-5 w-5 flex-shrink-0 text-slate-400" />
                        <span className="ml-4 truncate font-medium text-slate-700 max-w-[200px] sm:max-w-md">
                          {file.name}
                        </span>
                        <span className="ml-2 flex-shrink-0 text-slate-400 text-xs">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => removeFile(idx)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-50 hover:text-red-500 transition disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Link
              href="/dashboard"
              className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-green px-5 py-2.5 text-sm font-black text-white shadow-sm hover:bg-green-600 transition disabled:opacity-75 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
