import Link from "next/link";
import CopyToClipboard from "@/components/CopyToClipboard";

const CONTACT_EMAIL = "donovan@chargebackprep.com";

function gmailInboxUrl() {
  return "https://mail.google.com/mail/u/0/#inbox";
}

function gmailComposeUrl(to: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: "Chargeback Prep - follow up",
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export default function ThanksPage() {
  return (
    <main className="min-h-[calc(100svh-4rem)] bg-[var(--cbp-bg)] px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Request received ✅
          </h1>

          <p className="mt-3 text-zinc-700">
            You will get your readiness score by email soon. If you want to add
            context, reply to the confirmation email.
          </p>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-zinc-900">
              What happens next
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700">
              <li>We check policy acceptance + access proof basics.</li>
              <li>You get the top gaps (in order) and what to fix first.</li>
              <li>No call required. Optional 10-minute triage if you want it.</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={gmailInboxUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Open inbox
              </a>

              <a
                href={gmailComposeUrl(CONTACT_EMAIL)}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-700 hover:underline"
              >
                New email
              </a>

              <CopyToClipboard
                value={CONTACT_EMAIL}
                label="Copy email"
                copiedLabel="Email copied"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              />

              <p className="text-xs text-zinc-500">
                Email:{" "}
                <span className="font-medium text-zinc-700">{CONTACT_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              See pricing
            </Link>

            <Link
              href="/#score"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Submit another
            </Link>
          </div>

          <p className="mt-10 text-xs text-zinc-500">
            Not legal advice. No chargeback win guarantees.
          </p>
        </div>
      </div>
    </main>
  );
}
