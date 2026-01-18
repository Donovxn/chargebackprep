import Link from "next/link";
import ReadinessScoreForm from "@/components/ReadinessScoreForm";

const TO_EMAIL = "donovan@chargebackprep.com";

function mailto(to: string, subject: string, body: string) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${to}?subject=${s}&body=${b}`;
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--cbp-accent-2),var(--cbp-accent-1))] px-4 py-2 text-sm font-semibold text-[var(--cbp-text)] shadow-soft hover:opacity-95";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10";
const tertiaryLink =
  "text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline";

const card = "rounded-2xl border border-black/10 bg-white p-6 shadow-soft";
const cardDark =
  "rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-soft";

export default function Home() {
  const emailInstead = mailto(
    TO_EMAIL,
    "Chargeback Prep - quick question",
    "Hey Donovan,\n\nI sell:\nMy platform(s):\nMy payment processor:\nRefund policy link:\n\nMy question:\n"
  );

  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative overflow-hidden pt-24 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                Built for creators selling digital offers
              </p>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Chargebacks shouldn’t steal hours of your week.
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">
                I set up your Proof Vault in 48 hours so every sale has clean proof. When disputes hit, you get a ready-to-submit Evidence Pack in 24 hours.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <Link href="/#self-test" className={secondaryBtn}>
                  Quick self-test
                </Link>
                <a href={emailInstead} className={tertiaryLink}>
                  Email me instead
                </a>
              </div>

              <p className="mt-3 text-sm text-white/50">
                Takes about 2 minutes. No call.
              </p>

              <div className="mt-10 h-px w-full dark-divider" />
            </div>

            <div className={cardDark}>
              <h2 className="text-sm font-semibold tracking-tight text-white">
                Who this is for
              </h2>
              <ul className="mt-4 grid gap-3 text-sm text-white/75">
                {["Those who sell:",]}
                {[
                  "Courses, coaching, memberships",
                  "Paid communities (Skool, Discord, Circle, Whop)",
                  "Digital subscriptions (trading, sports picks, reselling)",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white/80">Outcome</p>
                <p className="mt-1 text-sm text-white/70">
                  Disputes go from “scramble” to “minutes.”
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white/80">
                  The diagnostic
                </p>
                <p className="mt-1 text-sm text-white/70">
                  If a chargeback hit today, could you pull (1) proof they accepted
                  your refund policy and (2) proof they accessed what they bought in
                  under 10 minutes?
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/#score" className={primaryBtn}>
                    Get readiness score
                  </Link>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/5"
                  >
                    See pricing
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/50">
                Not legal advice. No win-rate promises. Only real proof you already
                have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section
        id="what"
        className="scroll-mt-24 bg-[var(--cbp-bg)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              What this service actually is
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              This is operational readiness. Clean proof, clean folders, fast response. No win-rate promises.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                48-hour Prep Install
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                I set up your Proof Vault so proof is easy to pull when disputes hit.
              </p>

              <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                {[
                  "Lock your refund policy and saved versions (versioning starts immediately)",
                  "Map policy acceptance proof (best available for your stack)",
                  "Map access and delivery proof sources",
                  "Build the folder system and naming (Proof Vault)",
                  "Add an evidence pack template (so we don’t rebuild from scratch)",
                  "Track deadlines so nothing gets missed",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <a
                  href={emailInstead}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Email me instead
                </a>
              </div>
            </div>

            <div className={card}>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                24-hour Evidence Pack
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                When a chargeback hits, you get a ready-to-submit pack within 24 hours. No stress.
              </p>

              <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                {[
                  "Short summary (facts only)",
                  "Timeline of events",
                  "Purchase and policy proof",
                  "Policy acceptance proof (best available)",
                  "Access and usage proof (best available)",
                  "Relevant support messages and labeled exhibits",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <a
                  href={emailInstead}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Email me instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELF TEST */}
      <section
        id="self-test"
        className="scroll-mt-24 bg-[var(--cbp-bg)] pb-16 sm:pb-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className={card}>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Quick self-test
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              If a chargeback hit today, could you pull these two things in under 10 minutes?
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-black/10 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-900">
                  Proof they accepted your refund policy
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Not just “it exists.” Actual proof the buyer saw it.
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-900">
                  Proof they accessed what they bought
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Access granted, logins, usage, attendance, whatever is available.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/#score" className={primaryBtn}>
                Get readiness score
              </Link>
              <p className="text-sm text-zinc-600">
                Send your checkout link plus stack. I’ll reply with what’s missing and what to fix first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* READINESS SCORE */}
      <section id="score" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Get your readiness score
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                You send details. I reply with the gaps and what to fix first. No call required.
              </p>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold text-zinc-900">What you get back</p>
                <ul className="mt-4 grid gap-3 text-sm text-zinc-700">
                  {[
                    "Pass/fail on policy acceptance + access proof",
                    "The top 3 gaps to fix first",
                    "What I’d install so disputes take minutes, not hours",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ReadinessScoreForm toEmail="donovan@chargebackprep.com" /> 
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="scroll-mt-24 bg-[var(--cbp-bg)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Pricing
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Simple pricing. No contracts. No call.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">48-hour Prep Install</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
                $500
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Done-for-you setup of your proof trail plus Proof Vault.
              </p>

              <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                {[
                  "Policy proof and versioning",
                  "Acceptance proof setup (best available)",
                  "Access and usage proof map",
                  "Templates and naming system",
                  "Deadline tracking",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <a
                  href={emailInstead}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Email me instead
                </a>
              </div>
            </div>

            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">Evidence Packs</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
                $150{" "}
                <span className="text-base font-semibold text-zinc-600">/ dispute</span>
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Delivered fast once inputs are provided.
              </p>

              <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                {[
                  "1-page summary and timeline",
                  "Receipts, policy, and acceptance",
                  "Access proof (best available)",
                  "Support logs (relevant only)",
                  "Exhibits labeled and organized",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <a
                  href={emailInstead}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Email me instead
                </a>
              </div>
            </div>

            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">Optional Retainer (later)</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
                $299{" "}
                <span className="text-base font-semibold text-zinc-600">/ mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Includes up to 3 packs/month. Only once volume justifies it.
              </p>

              <ul className="mt-5 grid gap-3 text-sm text-zinc-700">
                {["Priority turnaround", "Simple monthly billing", "Same boundaries"].map(
                  (t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cbp-accent-2)]" />
                      <span>{t}</span>
                    </li>
                  )
                )}
              </ul>

              <div className="mt-6 grid gap-3">
                <Link href="/#score" className={primaryBtn}>
                  Get readiness score
                </Link>
                <a
                  href={emailInstead}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Email me instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOUNDARIES */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Boundaries
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">
                No win-rate promises
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                I only promise what I control: speed, organization, and a clean evidence pack.
              </p>
            </div>
            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">
                No fake evidence
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Everything is real. If it doesn’t exist, we fix the system so it exists next time.
              </p>
            </div>
            <div className={card}>
              <p className="text-sm font-semibold text-zinc-900">
                Not legal advice
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                This is operational readiness and packaging, not legal strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 bg-[var(--cbp-bg)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            FAQ
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900">
                Do you need access to everything?
              </summary>
              <p className="mt-3 text-sm text-zinc-600">
                No. I’ll ask for the best available proof sources for your stack. If
                you can’t grant access, exports and screenshots can work.
              </p>
            </details>

            <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900">
                Do we need a call?
              </summary>
              <p className="mt-3 text-sm text-zinc-600">
                No. We can do this async over email. If you prefer Slack or Discord,
                that works too.
              </p>
            </details>

            <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900">
                What if my platforms don’t show great usage logs?
              </summary>
              <p className="mt-3 text-sm text-zinc-600">
                Then we use what exists today, and we set up better logging going
                forward. The goal is “best available proof,” not perfection.
              </p>
            </details>

            <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900">
                Can you guarantee I’ll win disputes?
              </summary>
              <p className="mt-3 text-sm text-zinc-600">
                No. No guarantees. What I do is make your evidence fast to pull and
                clean to submit, so you respond on time with your best proof.
              </p>
            </details>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/#score" className={primaryBtn}>
              Get readiness score
            </Link>
            <a
              href={emailInstead}
              className="text-sm font-medium text-zinc-700 hover:underline"
            >
              Or email me directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
