import Link from "next/link";
import { getProjects } from "@/app/actions";
import { PageShell } from "@/components/PageShell";
import { Plus, FileText, ChevronRight, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { isAdmin } from "@/lib/admin";

export default async function UserDashboard() {
  const projects = await getProjects();
  const isUserAdmin = await isAdmin();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your graphic design and web development projects.</p>
          </div>
          <div className="flex items-center gap-3">
            {isUserAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition"
              >
                Go to Admin Portal
              </Link>
            )}
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 rounded-md bg-brand-green px-4 py-2.5 text-sm font-black text-white shadow-sm hover:bg-green-600 transition"
            >
              <Plus className="h-4 w-4" />
              New Project Request
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10">
          {projects.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-950">No project requests found</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                Need a new graphic design, banner, brochure, resume, or a custom web app? Submit your files and requirements to get started.
              </p>
              <div className="mt-6">
                <Link
                  href="/dashboard/new"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-green px-4 py-2 text-sm font-black text-white hover:bg-green-600 transition"
                >
                  <Plus className="h-4 w-4" />
                  Submit Your First Request
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition hover:border-slate-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold leading-5 ${
                          project.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : project.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {project.status === "PENDING" && <Clock className="h-3.5 w-3.5" />}
                        {project.status === "IN_PROGRESS" && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                        {(project.status === "COMPLETED" || project.status === "DELIVERED") && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        {project.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(project.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-blue transition line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-semibold text-slate-400">View progress & files</span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
