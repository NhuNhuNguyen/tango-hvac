"use client"; // Thêm dòng này nếu toàn bộ page cần tương tác, hoặc giữ nguyên nếu chỉ cần cho Dynamic Import

import Image from "next/image";
import dynamic from "next/dynamic"; // 1. Import thư viện dynamic

// 2. Import GetFreeEstimateSection theo kiểu Dynamic và tắt SSR
const GetFreeEstimateSection = dynamic(
  () => import("./components/GetFreeEstimateSection").then((mod) => mod.GetFreeEstimateSection),
  { 
    ssr: false,
    loading: () => <div className="mx-auto w-full max-w-6xl px-6 pb-16 min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> 
  }
);

type Service = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const COMPANY = {
  name: "Tango Air HVAC",
  headline: "Tango Air HVAC - 15 Years of Experience in Toronto",
  phoneDisplay: "647-768-7355",
  phoneE164Like: "+16477687355",
} as const;

const SERVICES: Service[] = [
  {
    title: "Furnace",
    description: "Installation, repair, and seasonal tune-ups to keep your home warm and efficient.",
    imageSrc: "/furnace-indoor.JPG",
    imageAlt: "Indoor furnace equipment",
  },
  {
    title: "AC",
    description: "Cooling solutions, maintenance, and fast troubleshooting for the hottest days.",
    imageSrc: "/ac-unit.JPG",
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
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-semibold text-blue-950">
            TA
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold">{COMPANY.name}</div>
            <div className="text-xs text-white/70">Toronto, ON</div>
          </div>
        </div>

        <a
          href={`tel:${COMPANY.phoneE164Like}`}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-blue-950 shadow-sm shadow-black/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-blue-950"
        >
          Call {COMPANY.phoneDisplay}
        </a>
      </header>

      {/* Hero section */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm shadow-black/30">
          <div className="grid lg:grid-cols-2">
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
                Reliable heating and cooling support for homeowners. Fast response, clear communication, and workmanship you can count on.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`tel:${COMPANY.phoneE164Like}`}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-black/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
                  Call now: {COMPANY.phoneDisplay}
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
                  View services
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] bg-blue-950/20 p-4 lg:min-h-[520px] lg:p-6">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-blue-950/30">
                <Image
                  src="/technician-working.jpeg"
                  alt="HVAC technician working"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 transition hover:bg-white/10">
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm text-white/80">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Form section dùng Dynamic Import đã khai báo ở trên */}
      <GetFreeEstimateSection />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-blue-950/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between text-sm text-white/75">
          <div>© {new Date().getFullYear()} {COMPANY.name}</div>
          <div>Phone: <a className="font-semibold text-white" href={`tel:${COMPANY.phoneE164Like}`}>{COMPANY.phoneDisplay}</a></div>
        </div>
      </footer>
    </main>
  );
}