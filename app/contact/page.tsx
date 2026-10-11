import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { email, office, phonePrimary, phoneSecondary } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Project Area | Thesis Printing Near BHU Gate, Varanasi",
  description:
    "Contact Project Area for academic project guidance, thesis formatting, printing and binding near BHU Gate, Lanka, Varanasi. Call or send an enquiry online.",
  alternates: {
    canonical: "https://www.projectarea.online/contact",
  },
  openGraph: {
    title: "Contact Project Area | Varanasi",
    description:
      "Get in touch for project guidance, thesis and dissertation formatting, printing and binding near BHU Gate, Varanasi.",
    url: "https://www.projectarea.online/contact",
    type: "website",
  },
};

type ContactCard = {
  title: string;
  lines: Array<{
    label: string;
    href?: string;
  }>;
};

const contactCards: ContactCard[] = [
  {
    title: "Call / WhatsApp",
    lines: [
      { label: phonePrimary, href: `tel:${phonePrimary}` },
      { label: phoneSecondary, href: `tel:${phoneSecondary}` },
    ],
  },
  {
    title: "Email",
    lines: [{ label: email, href: `mailto:${email}` }],
  },
  {
    title: "Office",
    lines: [{ label: office }],
  },
  {
    title: "Working Hours",
    lines: [{ label: "Mon - Sun" }, { label: "9:00 AM - 10:00 PM" }],
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Contact Project Area in Varanasi"
          subtitle="Ask about academic project guidance, thesis formatting, printing and binding support near BHU Gate, Lanka."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <article key={card.title} className="rounded-lg bg-white p-6 text-center shadow-sm">
              <h2 className="text-xl font-black text-brand-blue">{card.title}</h2>
              <div className="mt-4 space-y-2 text-sm font-bold leading-6 text-slate-700">
                {card.lines.map((line) =>
                  line.href ? (
                    <p key={line.label}>
                      <a href={line.href} className="text-brand-blue hover:underline">
                        {line.label}
                      </a>
                    </p>
                  ) : (
                    <p key={line.label}>{line.label}</p>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-lg shadow-soft">
          <iframe
            title="Map showing Lanka near BHU Gate, Varanasi"
            src="https://www.google.com/maps?q=Lanka%20BHU%20Gate%20Varanasi&output=embed"
            loading="lazy"
            className="h-80 w-full border-0"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <SectionHeading title="Send an Enquiry" subtitle="Share your requirement and our team will reply." />
        <div className="mt-10">
          <EnquiryForm
            showEmail
            showFile
            services={["MBA Project", "B.Tech / MCA Project", "Thesis Formatting", "Printing & Binding"]}
          />
        </div>
      </section>
    </PageShell>
  );
}
