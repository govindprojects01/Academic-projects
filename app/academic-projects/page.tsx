import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Academic Project Guidance for MBA, BCA & B.Tech Students",
  description:
    "Get structured academic project guidance for MBA, BCA, MCA, B.Tech, B.E. and science courses. Support includes topic planning, research methodology, data analysis, documentation and presentation preparation.",
  alternates: { canonical: "https://www.projectarea.online/academic-projects" },
  openGraph: {
    title: "Academic Project Guidance | Project Area",
    description:
      "Project planning, research methods, data analysis and report-formatting support for students.",
    url: "https://www.projectarea.online/academic-projects",
    type: "website",
  },
};

const supportAreas = [
  ["Topic selection and scope", "Narrow a broad subject into a practical, researchable project question that fits your course requirements."],
  ["Research methodology", "Understand research objectives, sampling, questionnaire design, data collection and limitations."],
  ["Excel and data analysis", "Get help organising data, building pivot tables and charts, and understanding suitable descriptive or statistical methods."],
  ["Report structure and formatting", "Organise chapters, tables, figures, references and appendices according to your institution's prescribed format."],
  ["Presentation and viva preparation", "Prepare clear slides and practise explaining your own methods, findings and conclusions."],
];

export default function AcademicProjectsPage() {
  return (
    <PageShell>
      <section className="bg-brand-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Academic support · Varanasi and online</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">Academic Project Guidance for MBA, BCA, MCA and B.Tech Students</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">Get practical support with project planning, research methods, data analysis, report formatting and presentations. Work is guided by your institution's rules and your own learning goals.</p>
          <a className="mt-7 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700" href="https://wa.me/919559628719?text=Hello%20Project%20Area%2C%20I%20need%20academic%20project%20guidance." target="_blank" rel="noreferrer">Discuss your project</a>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-black text-brand-navy">What we can help you with</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {supportAreas.map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-brand-mist p-6">
          <h2 className="text-2xl font-black text-brand-navy">Courses and project types</h2>
          <p className="mt-3 leading-7 text-slate-700">Support may be relevant to MBA, BBA, BCA, MCA, B.Tech, B.E., diploma, B.Sc. and M.Sc. projects, depending on the topic and requirements. Share your course, subject, deadline and university guidelines so the scope can be assessed accurately.</p>
          <h2 className="mt-7 text-2xl font-black text-brand-navy">How to get started</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-700">
            <li>Share your course, topic or area of interest.</li>
            <li>Provide your project instructions and formatting requirements.</li>
            <li>Confirm the support needed, timeline and quote before work begins.</li>
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-600">Academic support is intended to help students understand and complete their own work. Students remain responsible for checking institutional rules, verifying sources and submitting work they can explain.</p>
          <div className="mt-6 flex flex-wrap gap-4 font-bold">
            <Link className="text-brand-blue underline" href="/thesis-dissertation">Thesis and dissertation support</Link>
            <Link className="text-brand-blue underline" href="/thesis-synopsis">Synopsis and proposal support</Link>
            <Link className="text-brand-blue underline" href="/services">All services</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
