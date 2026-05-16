import { Leaf, Sparkles, Heart, Map } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "100% Fresh",
    desc: "Only real fruits, no artificial flavors, no preservatives. Ever.",
    color: "bg-leaf/10 text-leaf",
  },
  {
    icon: Sparkles,
    title: "Hygienic Standards",
    desc: "World-class cleanliness in every step of preparation.",
    color: "bg-citrus/10 text-citrus",
  },
  {
    icon: Map,
    title: "Locally Sourced",
    desc: "Ethiopian farmers, Ethiopian flavor — supporting our community.",
    color: "bg-sunshine/15 text-sunshine",
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Every glass crafted with care, attention, and a smile.",
    color: "bg-coral/15 text-coral",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
      {/* Lush green band */}
      <div className="absolute inset-x-4 inset-y-8 -z-10 rounded-[2.5rem] bg-primary md:inset-x-8" />
      <div className="absolute inset-x-4 inset-y-8 -z-10 rounded-[2.5rem] bg-grain opacity-40 md:inset-x-8" />

      <div className="container relative">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="text-primary-foreground">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-citrus">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Born from a love of <em className="text-sunshine not-italic">fresh fruit</em>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-primary-foreground/80">
              <p>
                Wina Juice <span className="font-display italic">ዊና ጁስ</span> started with a
                simple belief: everyone deserves a glass of pure, natural goodness.
              </p>
              <p>
                From our flagship in Summit Fiyel Bet to branches across Addis Ababa — Ras
                Desta Hospital, Shola Gebeya, and Addisu Gebeya — we source the freshest
                local fruits and vegetables every single day.
              </p>
              <p className="text-sunshine">
                820+ followers on Facebook. 4 locations. One promise: nothing but fresh.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-3xl bg-card p-5 text-card-foreground shadow-sm"
              >
                <div className={`grid h-11 w-11 place-items-center rounded-2xl ${color}`}>
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
