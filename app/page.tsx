// ---------------------------------------------------------------------------------------------------------------------
// Home page (App Router): Tango Air HVAC
//
// Notes for .NET devs:
// - This file exports a React component function (similar idea to an MVC "View" returning HTML).
// - Tailwind CSS is used for styling via utility classes (think "small, composable CSS helpers").
// - Keep this page "static" (no client-side state) so it can be rendered efficiently on the server.
// ---------------------------------------------------------------------------------------------------------------------

import Image from "next/image";
import { GetFreeEstimateSection } from "./components/GetFreeEstimateSection";

// A small in-file model for the service list.
// In C#, you'd likely define a record/class; here we use a typed object shape.
type Service = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

// Centralized content: easier to update and keeps JSX clean.
const COMPANY = {
  name: "Tango Air HVAC",
  headline: "Tango Air HVAC - 15 Years of Experience in Toronto",
  phoneDisplay: "647-768-7355",
  phoneE164Like: "+16477687355", // Used for the tel: link (no spaces/dashes).
} as const;

const SERVICES: Service[] = [
  {
    title: "Furnace",
    description: "Installation, repair, and seasonal tune-ups to keep your home warm and efficient.",
    imageSrc: "/furnace-indoor.jpg",
    imageAlt: "Indoor furnace equipment",
  },
  {
    title: "AC",
    description: "Cooling solutions, maintenance, and fast troubleshooting for the hottest days.",
    imageSrc: "/ac-unit.jpg",
    imageAlt: "Outdoor air conditioner unit",
  },
  {
    title: "Tankless Water Heater",
    description: "Endless hot water with energy-efficient upgrades and reliable servicing.",
    imageSrc: "/hot-water-tank.jpg",
    imageAlt: "Hot water equipment",
  },
] as const;

export default function Home() {
  return (
    // Page container:
    // - Blue-900 base to match brand tone
    // - Subtle gradient + padding to make the hero feel premium
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Header: brand + primary call-to-action (call button) */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          {/* Simple "badge" logo placeholder; swap with an actual SVG/logo later */}
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-semibold text-blue-950">
            TA
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold">{COMPANY.name}</div>
            <div className="text-xs text-white/70">Toronto, ON</div>
          </div>
        </div>

        {/* tel: makes it mobile-friendly; similar to "Click-to-call" in native apps */}
        <a
          href={`tel:${COMPANY.phoneE164Like}`}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-blue-950 shadow-sm shadow-black/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-blue-950"
          aria-label={`Call ${COMPANY.name} at ${COMPANY.phoneDisplay}`}
        >
          Call {COMPANY.phoneDisplay}
        </a>
      </header>

      {/* Hero section: split-screen layout (text left, photo right) */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm shadow-black/30">
          <div className="grid lg:grid-cols-2">
            {/* Left column: all textual content + CTAs (like the "ViewModel" side) */}
            <div className="bg-gradient-to-b from-blue-950/40 via-blue-950/25 to-blue-950/40 p-6 lg:p-10">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">
                Trusted HVAC service in Toronto
                <span className="h-1 w-1 rounded-full bg-white/40" />
                15 years
              </p>

              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {COMPANY.headline}
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
                Reliable heating and cooling support for homeowners. Fast response, clear communication, and workmanship
                you can count on.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Primary CTA: call now */}
                <a
                  href={`tel:${COMPANY.phoneE164Like}`}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-black/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
                  Call now: {COMPANY.phoneDisplay}
                </a>

                {/* Secondary CTA: "services" anchor, like a jump-link */}
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
                  View services
                </a>
              </div>

              {/* Quick info: stays on the text side per the new layout request */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-blue-950/35 p-5">
                  <div className="text-xs text-white/75">Phone</div>
                  <div className="mt-1 text-lg font-semibold">
                    <a
                      className="underline decoration-white/25 underline-offset-4 hover:decoration-white/70"
                      href={`tel:${COMPANY.phoneE164Like}`}
                    >
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-blue-950/35 p-5">
                  <div className="text-xs text-white/75">Core services</div>
                  <div className="mt-1 text-sm text-white/90">Furnace • AC • Tankless Water Heater</div>
                </div>
              </div>
            </div>

            {/* Right column: the hero photo (no overlay). */}
            <div className="relative min-h-[280px] bg-blue-950/20 p-4 lg:min-h-[520px] lg:p-6">
              {/* In split-screen, we want the entire subject visible; object-contain avoids cropping. */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-blue-950/30">
                <Image
                  src="/technician-working.jpeg"
                  alt="HVAC technician working"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section: cards generated from the SERVICES array (like a foreach) */}
      <section id="services" className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="mt-2 text-sm text-white/75">Installation, maintenance, and repair for the essentials.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 transition hover:bg-white/10"
            >
              {/* Card image: real photo per service */}
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                {/* Slight vignette to keep text contrast consistent below */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/25 via-transparent to-transparent" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                {/* Accent pill to keep brand orange visible throughout the page */}
                <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs font-semibold text-orange-200">
                  Available
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{service.description}</p>

              {/* Inline CTA inside each card (kept subtle) */}
              <a
                href={`tel:${COMPANY.phoneE164Like}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-orange-200 underline decoration-orange-200/30 underline-offset-4 transition group-hover:decoration-orange-200/70"
              >
                Call for a quote
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Brands section: simple trust signal with real equipment photo */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight">Brands We Trust</h2>
              <p className="mt-2 text-sm text-white/75">Quality equipment matters. We install and support trusted brands.</p>
              <p className="mt-5 inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-200">
                Authorized Lennox Equipment Installer
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/lennox-unit.jpg"
                  alt="Lennox HVAC equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get a Free Estimate: Client Component (interactive form) */}
      <GetFreeEstimateSection />

      {/* Footer: minimal, consistent branding */}
      <footer className="border-t border-white/10 bg-blue-950/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/75">
            © {new Date().getFullYear()} {COMPANY.name}
          </div>
          <div className="text-sm text-white/75">
            Phone:{" "}
            <a className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60" href={`tel:${COMPANY.phoneE164Like}`}>
              {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
