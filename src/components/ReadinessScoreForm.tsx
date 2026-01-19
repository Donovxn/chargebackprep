"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  offerType: string;
  platform: string;
  processor: string;
  policyLink: string;
  supportChannel: string;
  notes: string;
  // Honeypot (hidden). Should stay empty.
  company: string;
};

const initial: FormState = {
  name: "",
  email: "",
  offerType: "course",
  platform: "",
  processor: "",
  policyLink: "",
  supportChannel: "",
  notes: "",
  company: "",
};

const OFFER_LABEL: Record<string, string> = {
  course: "Course",
  coaching: "Coaching",
  mastermind: "Mastermind/Cohort",
  membership: "Membership",
  community: "Paid community",
  signals: "Signals subscription",
  other: "Other",
};

function buildEmailBody(v: FormState) {
  const offer = OFFER_LABEL[v.offerType] ?? v.offerType;

  return `Quick readiness score request

Name: ${v.name || "(not provided)"}
Email: ${v.email || "(not provided)"}

1) What do you sell? ${offer}
2) Platform(s): ${v.platform}
3) Payment processor: ${v.processor}
4) Refund policy link: ${v.policyLink}
5) Support channel: ${v.supportChannel || "(not provided)"}

Extra notes:
${v.notes || "(none)"}
`;
}

export default function ReadinessScoreForm({
  toEmail = "donovan@chargebackprep.com",
}: {
  toEmail?: string;
}) {
  const router = useRouter();

  const [v, setV] = useState<FormState>(initial);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subject = "Chargeback Prep - readiness score";
  const body = useMemo(() => buildEmailBody(v), [v]);

  // Keep mailto ONLY as fallback
  const mailto = useMemo(() => {
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    return `mailto:${toEmail}?subject=${s}&body=${b}`;
  }, [toEmail, body]);

  const input =
    "h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-black/20 focus:ring-2 focus:ring-[color-mix(in_oklab,var(--cbp-accent-2)_55%,white_45%)]";
  const textarea =
    "min-h-[110px] w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-black/20 focus:ring-2 focus:ring-[color-mix(in_oklab,var(--cbp-accent-2)_55%,white_45%)]";

  const primaryBtn =
    "inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--cbp-accent-2),var(--cbp-accent-1))] px-4 py-2 text-sm font-semibold text-[var(--cbp-text)] shadow-soft hover:opacity-95 disabled:opacity-60";
  const secondaryBtn =
    "inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50";

  async function onCopy() {
    try {
      const plain = `To: ${toEmail}\nSubject: ${subject}\n\n${body}`;
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      router.push("/score/thanks");
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
          Get readiness score
        </h3>
        <p className="text-sm text-zinc-600">
          Fill this out. You will see a confirmation screen. I send your score by
          email.
        </p>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        {/* Honeypot */}
        <div className="hidden">
          <label className="grid gap-1 text-sm">
            <span>Company</span>
            <input
              value={v.company}
              onChange={(e) => setV({ ...v, company: e.target.value })}
              className={input}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">Name (optional)</span>
            <input
              value={v.name}
              onChange={(e) => setV({ ...v, name: e.target.value })}
              className={input}
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">Email</span>
            <input
              required
              value={v.email}
              onChange={(e) => setV({ ...v, email: e.target.value })}
              className={input}
              placeholder="you@email.com"
              type="email"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">What do you sell?</span>
            <select
              value={v.offerType}
              onChange={(e) => setV({ ...v, offerType: e.target.value })}
              className={input}
            >
              <option value="course">Course</option>
              <option value="coaching">Coaching</option>
              <option value="mastermind">Mastermind/Cohort</option>
              <option value="membership">Membership</option>
              <option value="community">Paid community</option>
              <option value="signals">Signals subscription</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">Platform(s)</span>
            <input
              required
              value={v.platform}
              onChange={(e) => setV({ ...v, platform: e.target.value })}
              className={input}
              placeholder="Kajabi, Skool, Whop, Discord..."
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">Payment processor</span>
            <input
              required
              value={v.processor}
              onChange={(e) => setV({ ...v, processor: e.target.value })}
              className={input}
              placeholder="Stripe, PayPal..."
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="font-medium text-zinc-900">Refund policy link</span>
            <input
              required
              value={v.policyLink}
              onChange={(e) => setV({ ...v, policyLink: e.target.value })}
              className={input}
              placeholder="https://..."
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm">
          <span className="font-medium text-zinc-900">
            Support channel (optional)
          </span>
          <input
            value={v.supportChannel}
            onChange={(e) => setV({ ...v, supportChannel: e.target.value })}
            className={input}
            placeholder="Email, helpdesk, DMs..."
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="font-medium text-zinc-900">
            Anything else (optional)
          </span>
          <textarea
            value={v.notes}
            onChange={(e) => setV({ ...v, notes: e.target.value })}
            className={textarea}
            placeholder="If you have a recent dispute, paste the short story."
          />
        </label>

        {error ? (
          <p className="text-sm text-red-600">
            {error}{" "}
            <a className="underline" href={mailto}>
              Email me instead
            </a>
          </p>
        ) : null}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className={primaryBtn} disabled={submitting}>
            {submitting ? "Sending..." : "Get readiness score"}
          </button>

          <button
            type="button"
            onClick={onCopy}
            className={secondaryBtn}
            aria-live="polite"
          >
            {copied ? "Copied" : "Copy message"}
          </button>

          <p className="text-xs text-zinc-500">
            If submit fails, copy and email it to{" "}
            <span className="font-medium text-zinc-700">{toEmail}</span>.
          </p>
        </div>
      </form>
    </div>
  );
}
