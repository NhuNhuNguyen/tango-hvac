"use client";

// ---------------------------------------------------------------------------------------------------------------------
// Client Component: Get a Free Estimate
//
// Notes for .NET devs:
// - 'use client' opts this file into running in the browser (it can use useState, event handlers, etc.).
// - We keep this as a separate component so the rest of the page can stay as a Server Component.
// ---------------------------------------------------------------------------------------------------------------------

import { useId, useMemo, useState } from "react";

type ServiceOption = "Furnace" | "AC" | "Water Heater";

type EstimateFormState = {
  name: string;
  phone: string;
  service: ServiceOption;
  message: string;
};

type SubmitStatus = "idle" | "submitting" | "submitted";

const DEFAULT_STATE: EstimateFormState = {
  name: "",
  phone: "",
  service: "Furnace",
  message: "",
};

export function GetFreeEstimateSection() {
  // Stable IDs for label <-> input association (accessibility).
  const baseId = useId();

  // Local component state (similar to keeping form values in a ViewModel on the client).
  const [form, setForm] = useState<EstimateFormState>(DEFAULT_STATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isBusy = status === "submitting";

  // Simple derived validation (client-side only).
  const canSubmit = useMemo(() => {
    return form.name.trim().length > 0 && form.phone.trim().length > 0 && form.message.trim().length > 0 && !isBusy;
  }, [form, isBusy]);

  function update<K extends keyof EstimateFormState>(key: K, value: EstimateFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    // Demo submission:
    // - In a real app, you'd POST to an API route or call a Server Action.
    // - This artificial delay helps you "see" the submitting state.
    await new Promise((r) => setTimeout(r, 600));

    setStatus("submitted");
    setForm(DEFAULT_STATE);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">Get a Free Estimate</h2>
            <p className="mt-2 text-sm text-white/75">
              Tell us what you need and we’ll get back to you quickly with a clear estimate.
            </p>

            {status === "submitted" ? (
              <div className="mt-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm text-orange-100">
                Thanks! Your request has been sent. We’ll contact you soon.
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-blue-950/30 p-4 text-sm text-white/80">
                Prefer a call?{" "}
                <a
                  className="font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/70"
                  href="tel:+16477687355"
                >
                  647-768-7355
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="grid gap-4">
              {/* Name */}
              <div className="grid gap-2">
                <label htmlFor={`${baseId}-name`} className="text-sm font-semibold text-white/90">
                  Name
                </label>
                <input
                  id={`${baseId}-name`}
                  name="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm shadow-black/10 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
                />
              </div>

              {/* Phone + Service (two columns on larger screens) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor={`${baseId}-phone`} className="text-sm font-semibold text-white/90">
                    Phone Number
                  </label>
                  <input
                    id={`${baseId}-phone`}
                    name="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="647-768-7355"
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm shadow-black/10 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor={`${baseId}-service`} className="text-sm font-semibold text-white/90">
                    Service
                  </label>
                  <select
                    id={`${baseId}-service`}
                    name="service"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value as ServiceOption)}
                    className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white shadow-sm shadow-black/10 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
                  >
                    <option className="bg-blue-950" value="Furnace">
                      Furnace
                    </option>
                    <option className="bg-blue-950" value="AC">
                      AC
                    </option>
                    <option className="bg-blue-950" value="Water Heater">
                      Water Heater
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="grid gap-2">
                <label htmlFor={`${baseId}-message`} className="text-sm font-semibold text-white/90">
                  Message
                </label>
                <textarea
                  id={`${baseId}-message`}
                  name="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your issue, model number (if known), and preferred time."
                  rows={5}
                  className="w-full resize-y rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm shadow-black/10 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
                />
              </div>

              {/* Submit */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/60">By submitting, you agree we may contact you about this request.</p>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-black/20 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-blue-950"
                >
                  {isBusy ? "Sending..." : "Send request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

