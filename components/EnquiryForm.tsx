import { whatsappNumber } from "@/lib/site";

type EnquiryFormProps = {
  services: string[];
  showEmail?: boolean;
  showFile?: boolean;
};

export function EnquiryForm({ services, showEmail = false, showFile = false }: EnquiryFormProps) {
  return (
    <form
      action={`https://wa.me/${whatsappNumber}`}
      method="get"
      target="_blank"
      className="mx-auto grid max-w-2xl gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
    >
      <input
        type="text"
        placeholder="Full Name"
        required
        className="rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        required
        className="rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
      />
      {showEmail ? (
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
        />
      ) : null}
      <select
        required
        defaultValue=""
        className="rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
      >
        <option value="" disabled>
          Select Service
        </option>
        {services.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <textarea
        placeholder="Project details / requirements"
        rows={5}
        className="resize-none rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
      />
      {showFile ? (
        <label className="cursor-pointer rounded-md border border-dashed border-brand-blue bg-brand-mist px-4 py-3 text-center text-sm font-bold text-brand-blue">
          Upload PDF / JPEG
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
        </label>
      ) : null}
      <button
        type="submit"
        className="min-h-12 rounded-md bg-brand-green px-5 py-3 font-black text-white shadow-sm transition hover:bg-green-600"
      >
        Submit via WhatsApp
      </button>
    </form>
  );
}
