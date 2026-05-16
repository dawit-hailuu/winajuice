"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "./ui/button";
import { Download, QrCode } from "lucide-react";

export function QRSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("https://winajuice.et/menu");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/menu`);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 280,
        margin: 1,
        color: { dark: "#163829", light: "#FFFFFF" },
        errorCorrectionLevel: "H",
      }).catch(() => {});
    }
  }, [url]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "wina-juice-menu-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-foreground text-background">
          <div className="absolute inset-0 bg-grain opacity-20" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-citrus/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-leaf/20 blur-3xl" />

          <div className="relative grid items-center gap-10 p-8 md:grid-cols-2 md:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-citrus">
                <QrCode className="h-3.5 w-3.5" />
                Digital Menu
              </span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight md:text-5xl">
                Scan, sip, <span className="italic text-citrus">enjoy.</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-background/70">
                Place this QR code on your tables. Customers scan it with their phone camera
                and instantly see the full Wina Juice menu — no app, no login, no fuss.
              </p>
              <Button
                onClick={download}
                variant="accent"
                size="lg"
                className="mt-6"
              >
                <Download className="h-4 w-4" /> Download QR (PNG)
              </Button>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-3xl bg-background p-4 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  className="block h-auto w-full max-w-[260px] rounded-xl"
                  aria-label="QR code linking to the Wina Juice menu"
                />
              </div>
              <p className="mt-4 text-xs font-mono text-background/50">{url}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
