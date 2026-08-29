import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { onlineForms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Forms",
  description: "Useful online form links and WhatsApp enquiry form support.",
};

export default function OnlineFormPage() {
  return (
    <PageShell>
      <section className="bg-brand-blue px-4 py-16 text-center text-white sm:px-6">
        <h1 className="text-4xl font-black sm:text-5xl">Online Forms & Applications</h1>
        <p className="mt-4 text-lg font-semibold text-blue-50">
          Easy apply support, one form and direct assistance.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading title="Available Online Forms" />
        <div className="mt-10 grid gap-4">
          {onlineForms.map((form) => (
            <article
              key={form.title}
              className="grid gap-4 rounded-lg border-l-4 border-brand-blue bg-white p-5 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                {form.tag ? (
                  <span className="mb-3 inline-flex rounded-md bg-red-600 px-2 py-1 text-xs font-black uppercase text-white">
                    {form.tag}
                  </span>
                ) : null}
                <h2 className="text-xl font-black text-brand-navy">{form.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{form.description}</p>
              </div>
              <ButtonLink href={form.href} external variant="whatsapp">
                Open Form
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <SectionHeading
          title="Online Application Form"
          subtitle="Fill details once and our team will contact you directly."
        />
        <div className="mt-10">
          <EnquiryForm
            services={[
              "Government Job Form",
              "Police / Defence Form",
              "Railway / Bank Form",
              "MBA / Academic Project",
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
