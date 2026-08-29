import { notFound, redirect } from "next/navigation";
import { getProjectDetails } from "@/app/actions";
import { isAdmin } from "@/lib/admin";
import { PageShell } from "@/components/PageShell";
import AdminProjectClient from "./AdminProjectClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectPage({ params }: PageProps) {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/dashboard");
  }

  const { id } = await params;
  const { project, files } = await getProjectDetails(id);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <AdminProjectClient project={project} files={files} />
    </PageShell>
  );
}
