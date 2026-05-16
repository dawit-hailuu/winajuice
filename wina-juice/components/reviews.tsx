import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Hana B.",
    initials: "HB",
    rating: 5,
    text: "The avocado juice here is absolutely incredible! Fresh, creamy, and just perfect. I come here every morning before work.",
  },
  {
    name: "Dawit T.",
    initials: "DT",
    rating: 5,
    text: "Best juice bar in Summit Fiyel Bet, no question. The mixed fruit salad is a must-try. Very clean and professional.",
  },
  {
    name: "Selam A.",
    initials: "SA",
    rating: 4,
    text: "Love the smoothies! The mango-avocado combo is my favorite. Prices are fair and service is fast. Highly recommend!",
  },
  {
    name: "Yonas K.",
    initials: "YK",
    rating: 5,
    text: "ዊና ጁስ is my go-to spot. Buna paired with a fresh juice is the perfect Ethiopian morning ritual.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Happy Customers
          </span>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
            What people are saying
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < r.rating ? "fill-current" : "opacity-25"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                  {r.initials}
                </div>
                <div className="text-sm font-semibold">{r.name}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
