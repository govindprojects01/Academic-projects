"use client";

import { academicServices } from "@/lib/site";
import { ArrowRight, FileText } from "lucide-react";

interface ServiceGridProps {
  onSelectService?: (title: string) => void;
}

export function ServiceGrid({ onSelectService }: ServiceGridProps) {
  const handleServiceClick = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const formElement = document.getElementById("requirement-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const courseSelect = document.getElementById("course") as HTMLSelectElement | null;
      if (courseSelect) {
        const options = Array.from(courseSelect.options);
        const match = options.find(
          (opt) =>
            opt.value.toLowerCase().includes(title.toLowerCase()) ||
            title.toLowerCase().includes(opt.value.toLowerCase().split(" ")[0])
        );
        if (match) {
          courseSelect.value = match.value;
          courseSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {academicServices.map((service, index) => (
        <button
          key={service.title}
          type="button"
          onClick={() => handleServiceClick(service.title)}
          className="group flex min-h-56 flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xs transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-black text-brand-blue border border-blue-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-brand-blue transition">
                <FileText className="h-3.5 w-3.5" /> Sample & Form
              </span>
            </div>
            <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-brand-blue transition">
              {service.title}
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
              {service.description}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-brand-blue">
              {service.metric}
            </span>
            <span className="rounded-full bg-brand-blue/10 p-1.5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
