import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, ExternalLink, Calendar, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { getProjectDetails } from "@/app/actions";
import { PageShell } from "@/components/PageShell";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProjectDetail({ params }: PageProps) {
  const { id } = await params;
  const { project, files } = await getProjectDetails(id);

  if (!project) {
    notFound();
  }

  const requirementFiles = files.filter((f) => f.file_type === "requirement");
  const deliveryFiles = files.filter((f) => f.file_type === "delivery");

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Info Column (Left 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Project Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 leading-tight">{project.title}</h1>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      Submitted on{" "}
                      {new Date(project.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
                  {project.status === "PENDING" && <Clock className="h-4 w-4" />}
                  {project.status === "IN_PROGRESS" && (
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                  )}
                  {(project.status === "COMPLETED" || project.status === "DELIVERED") && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {project.status}
                </span>
              </div>

              {/* Requirements Description & Structured Fields */}
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
                  <h3 className="text-base font-bold text-slate-900">Project Description & Notes</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* User Uploaded Requirement Files */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-base font-bold text-slate-900">Your Reference Documents ({requirementFiles.length})</h3>
              
              {requirementFiles.length === 0 ? (
                <p className="text-sm text-slate-400 mt-3">No reference documents were uploaded.</p>
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
                          View File
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* Delivery Sidebar (Right 1/3) */}
          <div className="space-y-6">
            
            {/* Deliverables Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Final Delivery Assets</h3>

              {deliveryFiles.length === 0 ? (
                <div className="mt-5 text-center py-6">
                  {project.status === "PENDING" || project.status === "IN_PROGRESS" ? (
                    <>
                      <Clock className="mx-auto h-8 w-8 text-amber-400" />
                      <p className="mt-3 text-sm font-bold text-slate-800">Assets under development</p>
                      <p className="mt-1 text-xs text-slate-500 px-2 leading-relaxed">
                        Our designers/developers are busy working on your request. Once complete, your final files will be made available here.
                      </p>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="mt-3 text-sm font-bold text-slate-800">Pending asset upload</p>
                      <p className="mt-1 text-xs text-slate-500 px-2 leading-relaxed">
                        This project is marked as {project.status.toLowerCase()} but files have not been uploaded by the admin yet.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600" />
                    <p className="mt-2 text-xs font-bold text-emerald-800">Work is complete & ready!</p>
                  </div>
                  
                  <ul className="divide-y divide-slate-100 rounded-md border border-slate-100 bg-slate-50">
                    {deliveryFiles.map((file) => (
                      <li key={file.id} className="p-3 text-sm">
                        <p className="font-semibold text-slate-800 truncate text-xs" title={file.file_name}>
                          {file.file_name}
                        </p>
                        <a
                          href={file.file_url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-blue py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-600 transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Asset
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Need Help Card */}
            <div className="rounded-xl border border-slate-200 bg-brand-navy p-6 text-white shadow-sm">
              <h4 className="font-black text-base text-brand-green">Need immediate revisions?</h4>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                If you need modifications to the final designs or files, click the WhatsApp action below to directly ping our support.
              </p>
              <a
                href={`https://wa.me/919559628719?text=Hello,%20I%20want%20to%20discuss%20project%20ID:%20${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-brand-green py-2.5 text-xs font-black text-white hover:bg-green-600 transition"
              >
                Discuss Revisions via WhatsApp
              </a>
            </div>

          </div>

        </div>
      </div>
    </PageShell>
  );
}
