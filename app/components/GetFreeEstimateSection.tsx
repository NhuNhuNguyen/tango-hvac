"use client";

import { useId, useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { submitEstimate } from "@/app/actions/estimate";

type ServiceOption = "Furnace" | "AC" | "Water Heater";

type EstimateFormState = {
  name: string;
  phone: string;
  service: ServiceOption;
  message: string;
};

const DEFAULT_STATE: EstimateFormState = {
  name: "",
  phone: "",
  service: "Furnace",
  message: "",
};

export function GetFreeEstimateSection() {
  const [mounted, setMounted] = useState(false);
  const baseId = useId();
  const [form, setForm] = useState<EstimateFormState>(DEFAULT_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length <= 3) {
      formatted = numbers;
    } else if (numbers.length <= 6) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
    setForm((prev) => ({ ...prev, phone: formatted }));
  };

  const update = <K extends keyof EstimateFormState>(key: K, value: EstimateFormState[K]) => {
    if (key === "phone") {
      handlePhoneChange(value as string);
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.phone.length === 12 &&
      form.message.trim().length > 0 &&
      !isSubmitting
    );
  }, [form, isSubmitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    toast.promise(submitEstimate(form), {
      loading: 'Sending your estimate request...',
      success: () => {
        setForm(DEFAULT_STATE);
        setIsSubmitting(false);
        return 'Thanks! Your request has been sent successfully. We will get back to you soon.';
      },
      error: (err) => {
        setIsSubmitting(false);
        return `Failed: ${err.message}`;
      },
    });
  }

  if (!mounted) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">Get a Free Estimate</h2>
            <p className="mt-2 text-sm text-white/75">
              Tell us what you need and we’ll get back to you quickly with a clear estimate.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-blue-950/30 p-4 text-sm text-white/80">
              Prefer a call?{" "}
              <a className="font-semibold text-white underline underline-offset-4" href="tel:+16477687355">
                647-768-7355
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="grid gap-4">
              {/* Name - Thêm autoComplete="name" */}
              <div className="grid gap-2">
                <label htmlFor={`${baseId}-name`} className="text-sm font-semibold text-white/90">Name</label>
                <input
                  id={`${baseId}-name`}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/60 transition"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone - Thêm autoComplete="tel" và type="tel" */}
                <div className="grid gap-2">
                  <label htmlFor={`${baseId}-phone`} className="text-sm font-semibold text-white/90">Phone Number</label>
                  <input
                    id={`${baseId}-phone`}
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="647-768-7355"
                    maxLength={12}
                    className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/60 transition"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor={`${baseId}-service`} className="text-sm font-semibold text-white/90">Service</label>
                  <select
                    id={`${baseId}-service`}
                    value={form.service}
                    onChange={(e) => update("service", e.target.value as ServiceOption)}
                    className="w-full rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/60 transition"
                  >
                    <option className="bg-blue-950" value="Furnace">Furnace</option>
                    <option className="bg-blue-950" value="AC">AC</option>
                    <option className="bg-blue-950" value="Water Heater">Water Heater</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="grid gap-2">
                <label htmlFor={`${baseId}-message`} className="text-sm font-semibold text-white/90">Message</label>
                <textarea
                  id={`${baseId}-message`}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your issue..."
                  rows={5}
                  className="w-full resize-y rounded-xl border border-white/10 bg-blue-950/30 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/60 transition"
                />
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/60">By submitting, you agree we may contact you.</p>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  // disabled:cursor-not-allowed sẽ hiện dấu gạch đỏ khi rê chuột vào button lúc disable
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm transition hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}