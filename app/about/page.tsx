import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { email, office } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Project Area | Academic Support Near BHU Gate",
  description:
    "Learn about Project Area and its academic project guidance, thesis formatting, printing and binding support for students near BHU Gate, Lanka, Varanasi.",
  alternates: {
    canonical: "https://www.projectarea.online/about",
  },
};

const strengths = [
  "Project topic and research guidance",
  "Synopsis, proposal and report formatting",
  "Thesis printing, binding and formatting",
  "Original writing support and citation guidance",
  "Presentation and viva preparation support",
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-lg bg-brand-mist p-8 shadow-soft">
            <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-soft">
              <Image src="/govind.jpg" alt="Govind Sharma, founder of Project Area" fill className="object-cover" priority />
            </div>
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-black text-brand-navy">About Project Area</h1>
              <p className="mt-2 font-bold text-brand-blue">Academic Project and Thesis Support</p>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Student-focused academic assistance near BHU Gate"
              subtitle="Project Area helps students understand and organise their academic projects, research documentation, presentations and printing requirements."
            />
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
              <p>
                We support students from MBA, B.Tech, MCA, BCA, M.Sc, diploma and other courses
                with project planning, research documentation, formatting and presentation preparation.
              </p>
              <p>
                Our office is located at <strong>{office}</strong>, convenient for students of Banaras
                Hindu University and nearby colleges.
              </p>
              <p>
                We also work with <strong>BABA Thesis & Printing</strong> for thesis printing,
                binding and document finishing services near BHU Gate, Varanasi.
              </p>
              <p>
                Our goal is to provide clear communication, practical guidance and support that helps
                students understand their work and prepare their final submissions responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-brand-navy">How We Help</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <li key={item} className="rounded-md bg-slate-50 p-4 font-bold text-brand-blue">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-brand-navy p-8 text-white shadow-soft">
            <h2 className="text-2xl font-black">Contact Project Area</h2>
            <p className="mt-4 leading-7 text-blue-50">
              Contact us for project guidance, thesis formatting, printing, binding or documentation support.
            </p>
            <p className="mt-5 font-bold">
              Email: <a href={`mailto:${email}`} className="underline">{email}</a>
            </p>
            <p className="mt-2 font-bold">Location: {office}</p>
            <ButtonLink href="/contact" variant="whatsapp" className="mt-7">
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
