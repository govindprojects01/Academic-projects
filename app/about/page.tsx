import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { email, office } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Founder",
  description: "About Govind Sharma, founder of Project Area academic assistance services.",
};

const strengths = [
  "Project and thesis writing for all streams",
  "Synopsis, proposal and research papers",
  "Thesis printing, binding and formatting",
  "Plagiarism-free content support",
  "Viva and final submission guidance",
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-lg bg-brand-mist p-8 shadow-soft">
            <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-soft">
              <Image src="/govind.jpg" alt="Govind Sharma - Founder" fill className="object-cover" priority />
            </div>
            <div className="mt-8 text-center">
              <h1 className="text-3xl font-black text-brand-navy">Govind Sharma</h1>
              <p className="mt-2 font-bold text-brand-blue">Founder - Academic Projects</p>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About"
              title="Student-focused academic help near BHU Gate"
              subtitle="Project Area supports students with high-quality academic projects, research work, documentation and professional guidance."
            />
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
              <p>
                We specialize in helping students from MBA, B.Tech, MCA, BCA, M.Sc,
                Diploma and other courses complete academic requirements with confidence.
              </p>
              <p>
                Our office is located at <strong>{office}</strong>, making us accessible for
                students of Banaras Hindu University and nearby colleges.
              </p>
              <p>
                Our academic team brings <strong>15+ years of experience</strong> in academic
                writing, project development, research methodology, plagiarism control and final
                submission support.
              </p>
              <p>
                We are proudly partnered with <strong>BABA Thesis & Printing</strong>, a reputed
                20+ years old thesis printing and binding shop near BHU Gate, Varanasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-brand-navy">What We Provide</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <li key={item} className="rounded-md bg-slate-50 p-4 font-bold text-brand-blue">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-brand-navy p-8 text-white shadow-soft">
            <h2 className="text-2xl font-black">Contact Us</h2>
            <p className="mt-4 leading-7 text-blue-50">
              For project enquiries, thesis support, printing, binding or any academic assistance,
              feel free to contact us.
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
