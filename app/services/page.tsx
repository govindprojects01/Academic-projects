import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceRequirementWorkspace } from "@/components/ServiceRequirementWorkspace";

export const metadata: Metadata = {
  title: "Our Services | Project Area",
  description: "Academic project, thesis, assignment, PPT and research paper services with interactive sample demo and requirement form.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      {/* Banner */}
      <section className="bg-brand-navy px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            Academic Support
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Complete academic project solutions with on-time delivery
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Select any service card below to view sample report documentation and fill in your project requirements.
          </p>
        </div>
      </section>

      {/* Service Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Click on any service to open requirement form and view sample project documentation."
        />
        <div className="mt-10">
          <ServiceGrid />
        </div>
      </section>

      {/* Service Requirement Workspace & Sample Demo */}
      <ServiceRequirementWorkspace />
    </PageShell>
  );
}
