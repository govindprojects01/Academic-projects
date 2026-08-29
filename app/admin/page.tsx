import Link from "next/link";
import { redirect } from "next/navigation";
import { Clock, CheckCircle2, RefreshCw, Calendar, Eye, Mail, User } from "lucide-react";
import { getAdminProjects } from "@/app/actions";
import { isAdmin } from "@/lib/admin";
import { PageShell } from "@/components/PageShell";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/dashboard");
  }

  const { status } = await searchParams;
  const currentFilter = status || "ALL";
  const projects = await getAdminProjects(currentFilter);

  const filters = [
    { label: "All Projects", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Delivered", value: "DELIVERED" },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-1">Manage project requests, track progress, and upload deliverable assets.</p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 border-b border-slate-200">
          <nav className="-mb-px flex flex-wrap gap-6" aria-label="Tabs">
            {filters.map((filter) => (
              <Link
                key={filter.value}
                href={filter.value === "ALL" ? "/admin" : `/admin?status=${filter.value}`}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 text-sm font-bold transition ${
                  currentFilter === filter.value
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Projects Table / List */}
        <div className="mt-8">
          {projects.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <Clock className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-950">No projects found</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                No projects match the current filter "{currentFilter.toLowerCase()}" in the system.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                    <tr>
                      <th scope="col" className="px-6 py-4">Project / Client</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                      <th scope="col" className="px-6 py-4">Date Submitted</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50/75 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 line-clamp-1">{project.title}</div>
                          <div className="mt-1 flex flex-col gap-0.5 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {project.user_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {project.user_email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>
                              {new Date(project.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-brand-blue shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
