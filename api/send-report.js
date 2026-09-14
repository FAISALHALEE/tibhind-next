const nodemailer = require("nodemailer");

const PRIMARY_EMAIL = "tibhind@gmail.com";

function clean(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ));
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let payload;
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid request." });
  }

  const items = Array.isArray(payload.items) ? payload.items.slice(0, 30) : [];
  const page = clean(payload.page, 300);

  const nameItem = items.find((x) => x && x.id === "n");
  const whatsappItem = items.find((x) => x && x.id === "w");
  const descriptionItem = items.find((x) => x && x.id === "d");

  if (!nameItem || !clean(nameItem.value, 200) || !whatsappItem || !clean(whatsappItem.value, 60) || !descriptionItem || !clean(descriptionItem.value, 5000)) {
    return res.status(400).json({ ok: false, error: "Please complete the required fields." });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return res.status(500).json({ ok: false, error: "Email service is not configured. Please use WhatsApp to reach us." });
  }

  const lines = items.map((x) => `${clean(x.label, 200) || clean(x.id, 50)}: ${clean(x.value, 5000)}`);
  const text = [
    "New patient report submitted on tibhind.com",
    page ? `Page: ${page}` : null,
    "",
    ...lines,
  ].filter(Boolean).join("\n");

  const htmlRows = items
    .map((x) => `<tr><td style="padding:6px 14px 6px 0;color:#7b918b;vertical-align:top;white-space:nowrap">${escapeHtml(clean(x.label, 200) || clean(x.id, 50))}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(clean(x.value, 5000)) || "<em>Not provided</em>"}</td></tr>`)
    .join("");
  const html =
    `<h3 style="font-family:Arial,sans-serif">New patient report — tibhind.com</h3>` +
    (page ? `<p style="font-family:Arial,sans-serif;color:#555">Page: ${escapeHtml(page)}</p>` : "") +
    `<table style="font-family:Arial,sans-serif;border-collapse:collapse">${htmlRows}</table>`;

  const replyTo = clean((items.find((x) => x && x.id === "e") || {}).value, 200);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const mail = {
    from: process.env.MAIL_FROM || `"TIB HIND website" <${user}>`,
    to: PRIMARY_EMAIL,
    subject: `New patient report${page ? " — " + page : ""}`,
    text,
    html,
  };
  if (replyTo) mail.replyTo = replyTo;

  const additional = clean(process.env.ADDITIONAL_EMAIL_TO, 200);
  if (additional) mail.cc = additional;

  try {
    await transporter.sendMail(mail);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-report failed:", err && err.message);
    return res.status(500).json({ ok: false, error: "We could not send your report right now. Please try again or contact us on WhatsApp." });
  }
};
