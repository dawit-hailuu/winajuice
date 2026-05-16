import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/251945292929?text=Hello%20Wina%20Juice!%20I'd%20like%20to%20order."
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6 fill-current" strokeWidth={0} />
      <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
