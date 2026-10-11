import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Thesis and Dissertation Formatting Support in Varanasi",
  description:
    "Thesis and dissertation support for students: document formatting, chapter structure, references, tables, figures, proofreading and print-ready preparation in Varanasi and online.",
  alternates: { canonical: "https://www.projectarea.online/thesis-dissertation" },
  openGraph: {
    title: "Thesis and Dissertation Support | Project Area",
    description:
      "Formatting, reference organisation, document checks and print-ready thesis preparation.",
    url: "https://www.projectarea.online/thesis-dissertation",
    type: "website",
  },
};

const services = [
  ["Thesis formatting", "Set up headings, margins, page numbering, contents pages, lists of tables and figures, and consistent styles based on your university guidelines."],
  ["Chapter and document organisation", "Review the structure of your introduction, literature review, methodology, results, discussion and conclusion for consistency."],
  ["References and citations", "Help organise citations and reference lists in the required style, such as APA, while checking that sources can be verified."],
  ["Tables, charts and appendices", "Improve readability and consistency across tables, charts, captions, appendices and supporting documents."],
  ["Final document and printing preparation", "Check page breaks, front matter, headings and print layout before you approve a final Word or PDF file."],
];

export default function ThesisDissertationPage() {
  return (
    <PageShell>
      <section className="bg-brand-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Thesis · Dissertation · Document support</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">Thesis and Dissertation Formatting Support</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">Prepare a clear, consistent thesis document with help on formatting, references, tables, figures and print-ready layout. Available for students in Varanasi and online, subject to your requirements.</p>
          <a className="mt-7 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700" href="https://wa.me/919559628719?text=Hello%20Project%20Area%2C%20I%20need%20thesis%20or%20dissertation%20formatting%20support." target="_blank" rel="noreferrer">Ask about thesis support</a>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-black text-brand-navy">Thesis support options</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {services.map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
        <section className="mt-10 rounded-xl bg-brand-mist p-6">
          <h2 className="text-2xl font-black text-brand-navy">What to share before starting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Your course, subject and submission deadline.</li>
            <li>The university or department's thesis template and instructions.</li>
            <li>The current Word/PDF file and a clear list of the changes you need.</li>
            <li>Required citation style, page size, binding and printing requirements, if applicable.</li>
          </ul>
          <p className="mt-5 leading-7 text-slate-700">We can help improve presentation and organisation, but sources and findings must be genuine and verifiable. No service can guarantee a particular grade, acceptance decision or plagiarism-check score.</p>
          <div className="mt-6 flex flex-wrap gap-4 font-bold">
            <Link className="text-brand-blue underline" href="/academic-projects">Academic project guidance</Link>
            <Link className="text-brand-blue underline" href="/thesis-synopsis">Synopsis and proposal support</Link>
            <Link className="text-brand-blue underline" href="/contact">Contact Project Area</Link>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
