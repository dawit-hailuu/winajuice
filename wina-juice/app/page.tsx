import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { About } from "@/components/about";
import { Reviews } from "@/components/reviews";
import { Contact } from "@/components/contact";
import { QRSection } from "@/components/qr-section";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { readMenu } from "@/lib/menu-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await readMenu();
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <MenuSection items={items} />
        <About />
        <Reviews />
        <QRSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
