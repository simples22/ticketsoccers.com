import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const ipStore = new Map<string, { count: number; resetAt: number }>();

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().max(80).optional(),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(2500),
  company: z.string().trim().max(120).optional(), // honeypot
});

function getIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;

  const record = ipStore.get(ip);

  if (!record || record.resetAt < now) {
    ipStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function suspicious(value: string) {
  return [
    "<script",
    "javascript:",
    "onerror=",
    "onload=",
    "../",
    "%2e%2e",
    "union select",
    "drop table",
    "insert into",
    "delete from",
  ].some((item) => value.toLowerCase().includes(item));
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, message: "Invalid request type." },
        { status: 415 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const rawBody = await req.json();
    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Please verify the form fields." },
        { status: 400 }
      );
    }

    const { firstName, lastName = "", email, subject, message, company } =
      parsed.data;

    // Invisible anti-bot honeypot
    if (company) {
      return NextResponse.json({
        ok: true,
        message: "Your message has been sent successfully.",
      });
    }

    const combined = `${firstName} ${lastName} ${email} ${subject} ${message}`;

    if (suspicious(combined)) {
      return NextResponse.json(
        { ok: false, message: "Request blocked." },
        { status: 403 }
      );
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Ticketsoccers <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "contact@ticketsoccers.com",
      subject: `Ticketsoccers Contact: ${safeSubject}`,
      replyTo: safeEmail,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
          <h2>New Ticketsoccers Contact Message</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "Your message has been sent successfully.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}