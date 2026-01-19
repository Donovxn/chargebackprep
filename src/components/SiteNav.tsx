import Image from "next/image";
import Link from "next/link";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--cbp-accent-2),var(--cbp-accent-1))] px-4 py-2 text-sm font-semibold text-[var(--cbp-text)] shadow-soft hover:opacity-95";
const ghostBtn =
  "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100";

export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/75 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 sm:gap-4">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-zinc-950">
            {/* Put your transparent mark at /public/cp-mark.png */}
            <Image
              src="/cp-mark.png"
              alt="Chargeback Prep"
              width={50}
              height={50}
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            Chargeback Prep
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link href="/#what" className={ghostBtn}>
            What it is
          </Link>
          <Link href="/#pricing" className={ghostBtn}>
            Pricing
          </Link>
          <Link href="/#faq" className={ghostBtn}>
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#score" className={primaryBtn}>
            Get readiness score
          </Link>
        </div>
      </div>
    </header>
  );
}
