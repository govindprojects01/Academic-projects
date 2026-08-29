"use client";

import { academicServices, googleFormUrl } from "@/lib/site";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {academicServices.map((service, index) => (
        <button
          key={service.title}
          type="button"
          onClick={() => window.open(googleFormUrl, "_blank", "noopener,noreferrer")}
          className="group flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-mist text-base font-black text-brand-blue">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-black leading-snug text-brand-navy">{service.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
          <span className="mt-5 rounded bg-slate-100 px-3 py-2 text-xs font-black uppercase text-brand-blue">
            {service.metric}
          </span>
        </button>
      ))}
    </div>
  );
}
