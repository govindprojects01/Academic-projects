import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Thesis Synopsis and Research Proposal Support",
  description:
    "Get guidance on thesis synopsis and research proposal structure, objectives, literature review planning, methodology, sampling and references for MBA and other academic courses.",
  alternates: { canonical: "https://www.projectarea.online/thesis-synopsis" },
  openGraph: {
    title: "Thesis Synopsis and Research Proposal Support | Project Area",
    description:
      "Understand synopsis structure, research objectives, methodology and reference formatting.",
    url: "https://www.projectarea.online/thesis-synopsis",
    type: "website",
  },
};

const sections = [
  ["Title and research problem", "Clarify the research area, define the problem and keep the proposed scope manageable."],
  ["Objectives and research questions", "Make objectives specific, logically connected and appropriate to the course and available data."],
  ["Literature review plan", "Identify relevant scholarly sources, compare findings and record references so claims can be checked."],
  ["Methodology and sampling", "Explain the proposed research design, target population, sampling method, sample size rationale and analysis plan."],
  ["Timeline and references", "Prepare a practical work plan and format citations and references according to the department's instructions."],
];

export default function ThesisSynopsisPage() {
  return (
    <PageShell>
      <section className="bg-brand-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Synopsis · Proposal · Research planning</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">Thesis Synopsis and Research Proposal Guidance</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">Plan a focused research proposal with clear objectives, a relevant literature review, a realistic methodology and verifiable references. Guidance is available for MBA and other academic courses.</p>
          <a className="mt-7 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700" href="https://wa.me/919559628719?text=Hello%20Project%20Area%2C%20I%20need%20synopsis%20or%20research%20proposal%20guidance." target="_blank" rel="noreferrer">Discuss your synopsis</a>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-black text-brand-navy">What a synopsis usually includes</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {sections.map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
        <section className="mt-10 rounded-xl bg-brand-mist p-6">
          <h2 className="text-2xl font-black text-brand-navy">How we can help</h2>
          <p className="mt-3 leading-7 text-slate-700">Share your topic, course, institution's format, deadline and any supervisor feedback. We can help you understand the required structure, organise your plan and improve clarity. Your institution's instructions always take priority.</p>
          <p className="mt-3 leading-7 text-slate-700">A synopsis is a plan, not proof that research has already been completed. Findings, citations and data should never be invented or presented as verified when they are not.</p>
          <div className="mt-6 flex flex-wrap gap-4 font-bold">
            <Link className="text-brand-blue underline" href="/academic-projects">Academic project guidance</Link>
            <Link className="text-brand-blue underline" href="/thesis-dissertation">Thesis and dissertation support</Link>
            <Link className="text-brand-blue underline" href="/services">All services</Link>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
