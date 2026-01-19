import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * Optional URL field:
 * - empty/undefined => ""
 * - "none", "n/a", "na" => ""
 * - otherwise must be a valid URL
 */
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
  policyLink: OptionalUrl, // ✅ optional + validated
  supportChannel: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")), // honeypot
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

function nl2br(s: string) {
  return escapeHtml(s).replace(/\n/g, "<br/>");
}

function wrapEmail(opts: {
  title: string;
  preheader: string;
  bodyHtml: string;
}) {
  const { title, preheader, bodyHtml } = opts;

  // Change these if you want
  const siteUrl = "https://chargebackprep.com";
  const logoUrl = `${siteUrl}/cp-mark.png`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;">
    <!-- Preheader (hidden) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f6f7fb;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:separate;">
            <!-- Header -->
            <tr>
              <td style="padding:0 0 14px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="vertical-align:middle;">
                      <a href="${siteUrl}" target="_blank" rel="noreferrer" style="text-decoration:none;">
                        <span style="display:inline-flex;align-items:center;gap:10px;">
                          <img src="${logoUrl}" width="28" height="28" alt="Chargeback Prep" style="display:inline-block;border-radius:10px;" />
                          <span style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:14px; font-weight:700; color:#111827;">
                            Chargeback Prep
                          </span>
                        </span>
                      </a>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:12px; color:#6b7280;">
                        ${escapeHtml(title)}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background:#ffffff;border:1px solid rgba(17,24,39,.10); border-radius:16px; box-shadow:0 10px 30px rgba(17,24,39,.08); padding:22px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 4px 0 4px;">
                <p style="margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:12px; line-height:1.5; color:#6b7280;">
                  Not legal advice. No chargeback win guarantees. We only use real info you already have.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ownerEmailHtml(data: z.infer<typeof IntakeSchema>) {
  const siteUrl = "https://chargebackprep.com";

  const policy =
    data.policyLink && data.policyLink.length > 0
      ? `<a href="${escapeHtml(data.policyLink)}" target="_blank" rel="noreferrer" style="color:#0ea5a5;text-decoration:underline;">${escapeHtml(
          data.policyLink
        )}</a>`
      : `<span style="color:#6b7280;">none</span>`;

  const support =
    data.supportChannel && data.supportChannel.trim().length > 0
      ? escapeHtml(data.supportChannel)
      : `<span style="color:#6b7280;">(not provided)</span>`;

  const notes =
    data.notes && data.notes.trim().length > 0
      ? nl2br(data.notes)
      : `<span style="color:#6b7280;">(none)</span>`;

  return wrapEmail({
    title: "New readiness request",
    preheader: `New readiness request from ${data.email}`,
    bodyHtml: `
      <h1 style="margin:0 0 10px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:20px; line-height:1.25; color:#111827;">
        New readiness request
      </h1>

      <p style="margin:0 0 16px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:14px; line-height:1.6; color:#374151;">
        Reply to this email to respond to the prospect.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:14px; border:1px solid rgba(17,24,39,.10); border-radius:14px; background:#fafafa;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row("Name", data.name?.trim() ? escapeHtml(data.name) : `<span style="color:#6b7280;">(not provided)</span>`)}
              ${row(
                "Email",
                `<a href="mailto:${escapeHtml(data.email)}" style="color:#0ea5a5;text-decoration:underline;">${escapeHtml(
                  data.email
                )}</a>`
              )}
              ${row("Offer type", escapeHtml(data.offerType))}
              ${row("Platform(s)", escapeHtml(data.platform))}
              ${row("Processor", escapeHtml(data.processor))}
              ${row("Refund policy", policy)}
              ${row("Support channel", support)}
            </table>
          </td>
        </tr>
      </table>

      <h2 style="margin:18px 0 8px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:14px; color:#111827;">
        Notes
      </h2>
      <div style="padding:12px 14px; border:1px solid rgba(17,24,39,.10); border-radius:14px; background:#ffffff; font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:13px; line-height:1.6; color:#374151;">
        ${notes}
      </div>

      <div style="margin-top:18px; padding:12px 14px; border-radius:14px; background:rgba(14,165,165,.08); border:1px solid rgba(14,165,165,.20);">
        <p style="margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:13px; color:#0f766e; line-height:1.6;">
          <b>Fast triage reminder:</b> check (1) policy acceptance proof and (2) access proof. Then send top gaps in order.
        </p>
      </div>

      <p style="margin:16px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:12px; color:#6b7280;">
        Site: <a href="${siteUrl}" target="_blank" rel="noreferrer" style="color:#0ea5a5;text-decoration:underline;">${siteUrl}</a>
      </p>
    `,
  });
}

function row(label: string, valueHtml: string) {
  return `
    <tr>
      <td style="padding:6px 0; width:160px; font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:12px; color:#6b7280; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:6px 0; font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:13px; color:#111827; vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

function userEmailHtml() {
  const siteUrl = "https://chargebackprep.com";
  const pricingUrl = `${siteUrl}/#pricing`;

  return wrapEmail({
    title: "Request received",
    preheader: "We got your readiness request. Next steps inside.",
    bodyHtml: `
      <h1 style="margin:0 0 10px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:20px; line-height:1.25; color:#111827;">
        Request received ✅
      </h1>

      <p style="margin:0 0 14px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:14px; line-height:1.6; color:#374151;">
        We got your readiness request. You’ll get your score by email soon.
      </p>

      <div style="padding:14px; border:1px solid rgba(17,24,39,.10); border-radius:14px; background:#fafafa;">
        <p style="margin:0 0 10px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:13px; font-weight:700; color:#111827;">
          What happens next
        </p>
        <ul style="margin:0; padding-left:18px; font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:13px; line-height:1.7; color:#374151;">
          <li>We check your policy acceptance + access proof basics.</li>
          <li>You get the top gaps (in order) and what to fix first.</li>
          <li>No call required. Optional quick triage if you want it.</li>
        </ul>
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
        <tr>
          <td>
            <a href="${pricingUrl}" target="_blank" rel="noreferrer"
              style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;
              font-size:13px;font-weight:700;padding:10px 14px;border-radius:12px;">
              See pricing
            </a>
          </td>
          <td style="width:10px;"></td>
          <td>
            <a href="${siteUrl}" target="_blank" rel="noreferrer"
              style="display:inline-block;background:#ffffff;color:#111827;text-decoration:none;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;
              font-size:13px;font-weight:700;padding:10px 14px;border-radius:12px;border:1px solid rgba(17,24,39,.12);">
              Back to site
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:14px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; font-size:12px; color:#6b7280; line-height:1.6;">
        If you want to add context, just reply to this email.
      </p>
    `,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = IntakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot triggered: pretend success
    if (data.company && data.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(mustEnv("RESEND_API_KEY"));
    const from = mustEnv("EMAIL_FROM"); // e.g. "Chargeback Prep <donovan@chargebackprep.com>"
    const owner = mustEnv("EMAIL_OWNER"); // e.g. "donovan@chargebackprep.com"

    // Owner notification
    await resend.emails.send({
      from,
      to: owner,
      subject: `New readiness request: ${data.email}`,
      html: ownerEmailHtml(data),
      text: `New readiness request

Name: ${data.name || "(not provided)"}
Email: ${data.email}
Offer type: ${data.offerType}
Platform(s): ${data.platform}
Processor: ${data.processor}
Refund policy: ${data.policyLink || "none"}
Support channel: ${data.supportChannel || "(not provided)"}

Notes:
${data.notes || "(none)"}
`,
      replyTo: data.email,
    });

    // Prospect confirmation
    await resend.emails.send({
      from,
      to: data.email,
      subject: "We got your readiness request",
      html: userEmailHtml(),
      text: `Request received ✅

We got your readiness request. You’ll get your score by email soon.

What happens next:
- We check your policy acceptance + access proof basics.
- You get the top gaps (in order) and what to fix first.
- No call required. Optional quick triage if you want it.

If you want to add context, reply to this email.
`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error. Try again or email us." },
      { status: 500 }
    );
  }
}
