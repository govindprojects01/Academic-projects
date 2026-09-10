import Image from "next/image";
import { AuthButtons } from "@/components/AuthButtons";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceRequirementWorkspace } from "@/components/ServiceRequirementWorkspace";
import { printingServices } from "@/lib/site";

const features = [
  {
    title: "Expert Guidance",
    description: "From topic selection to final submission.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "On-Time Delivery",
    description: "Projects delivered before deadlines.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Trusted Support",
    description: "500+ satisfied students online and 10000+ offline.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-blue/45" />
        </div>
        <div className="mx-auto grid min-h-[500px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:min-h-[560px]">
          <div className="max-w-3xl py-6">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Baba Thesis and Printing
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">Project Area</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
              Professional academic project assistance, thesis support, printing and binding
              services for students in Varanasi and online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="whatsapp">
                View Services & Demo
              </ButtonLink>
              <ButtonLink href="#requirement-form" variant="secondary">
                Submit Requirement
              </ButtonLink>
            </div>
            <div className="mt-5">
              <AuthButtons />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg shadow-soft lg:min-h-[380px]">
          <Image src="/welcome.jpg" alt="Students studying together" fill className="object-cover" priority />
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Welcome"
            title="Complete project support under one roof"
            subtitle="We provide project area solutions for MBA, B.Tech, M.Sc and other courses with quality work, timely delivery and full guidance."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["15+ years", "Experience"],
              ["500+ online", "Students"],
              ["10000+ offline", "Students"],
            ].map(([stat, label]) => (
              <div key={stat} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <strong className="block text-2xl text-brand-blue">{stat}</strong>
                <span className="mt-1 block text-sm text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <img src={feature.image} alt="" className="h-52 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-black text-brand-navy">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading title="Printing Services" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {printingServices.map((service) => (
            <article key={service.title} className="rounded-lg border border-blue-100 bg-brand-mist p-7 shadow-sm">
              <h3 className="text-2xl font-black text-brand-navy">{service.title}</h3>
              <ul className="mt-5 space-y-2 text-slate-700">
                {service.description.map((item) => (
                  <li key={item}>+ {item}</li>
                ))}
              </ul>
              <ButtonLink href={service.href} external variant="whatsapp" className="mt-7">
                {service.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Our Services"
            subtitle="Complete academic project solutions with quality, accuracy and on-time delivery. Click any service to view sample and get quote."
          />
          <div className="mt-10">
            <ServiceGrid />
          </div>
        </div>
      </section>

      {/* Service Requirement Workspace & Sample Demo */}
      <ServiceRequirementWorkspace />
    </PageShell>
  );
}
