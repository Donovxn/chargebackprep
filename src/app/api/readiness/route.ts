import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const OptionalUrl = z.preprocess(
  (val) => {
    const s = typeof val === "string" ? val.trim() : "";
    const lower = s.toLowerCase();
    if (!s) return "";
    if (lower === "none" || lower === "n/a" || lower === "na") return "";
    return s;
  },
  z.union([z.literal(""), z.string().url()])
);

const IntakeSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email(),
  offerType: z.string().trim().max(30),
  platform: z.string().trim().min(1).max(120),
  processor: z.string().trim().min(1).max(120),
  policyLink: OptionalUrl, // ✅ optional + validates when present
  supportChannel: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
});

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function linkOrMissing(url: string) {
  if (!url) return "(missing)";
  const safe = escapeHtml(url);
  return `<a href="${safe}" target="_blank" rel="noreferrer">${safe}</a>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = IntakeSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message || "Invalid submission.";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot triggered: pretend success
    if (data.company && data.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(mustEnv("RESEND_API_KEY"));
    const from = mustEnv("EMAIL_FROM");
    const owner = mustEnv("EMAIL_OWNER");

    const ownerHtml = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
        <h2>New readiness request</h2>
        <p><b>Name:</b> ${escapeHtml(data.name || "")}</p>
        <p><b>Email:</b> ${escapeHtml(data.email)}</p>
        <p><b>Offer type:</b> ${escapeHtml(data.offerType)}</p>
        <p><b>Platform(s):</b> ${escapeHtml(data.platform)}</p>
        <p><b>Processor:</b> ${escapeHtml(data.processor)}</p>
        <p><b>Refund policy:</b> ${linkOrMissing(data.policyLink)}</p>
        <p><b>Support channel:</b> ${escapeHtml(data.supportChannel || "")}</p>
        <p><b>Notes:</b><br/>${escapeHtml(data.notes || "").replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const userHtml = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
        <h2>Request received ✅</h2>
        <p>We got your readiness request.</p>
        <p>You will get your score by email soon.</p>
        <p style="margin-top:16px;color:#666;font-size:12px;">
          Not legal advice. No chargeback win guarantees.
        </p>
      </div>
    `;

    await resend.emails.send({
      from,
      to: owner,
      subject: `New readiness request: ${data.email}`,
      html: ownerHtml,
      replyTo: data.email,
    });

    await resend.emails.send({
      from,
      to: data.email,
      subject: "We got your readiness request",
      html: userHtml,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error. Try again or email us." },
      { status: 500 }
    );
  }
}
