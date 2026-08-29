import { phonePrimary, whatsappNumber } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 sm:left-auto sm:right-5 sm:flex sm:w-auto sm:flex-col">
      <a
        href={`tel:${phonePrimary}`}
        className="rounded-md bg-brand-blue px-5 py-3 text-center text-sm font-black text-white shadow-soft transition hover:bg-brand-navy"
      >
        Call
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-md bg-brand-green px-5 py-3 text-center text-sm font-black text-white shadow-soft transition hover:bg-green-600"
      >
        WhatsApp
      </a>
    </div>
  );
}
