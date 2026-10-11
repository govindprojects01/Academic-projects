import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceRequirementWorkspace } from "@/components/ServiceRequirementWorkspace";

export const metadata: Metadata = {
  title: "Academic Project & Thesis Services in Varanasi",
  description:
    "Explore MBA, BCA, MCA, B.Tech and M.Sc project guidance, thesis and dissertation support, synopsis, research papers, PPTs, printing and binding near BHU Gate, Lanka, Varanasi.",
  alternates: {
    canonical: "https://www.projectarea.online/services",
  },
  openGraph: {
    title: "Academic Project & Thesis Services in Varanasi | Project Area",
    description:
      "Academic project guidance, thesis support, reports, presentations, printing and binding near BHU Gate, Varanasi.",
    url: "https://www.projectarea.online/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="bg-brand-navy px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            Academic Support in Varanasi
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Academic Project Guidance, Thesis Support & Printing Services
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Find project guidance, thesis formatting, research documentation, presentations,
            printing and binding support for students in Varanasi and online.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          title="Our Academic Services"
          subtitle="Explore project guidance and documentation support for different courses. Choose a service to view a sample and share your requirements."
        />
        <div className="mt-10">
          <ServiceGrid />
        </div>
      </section>

      <ServiceRequirementWorkspace />
    </PageShell>
  );
}
