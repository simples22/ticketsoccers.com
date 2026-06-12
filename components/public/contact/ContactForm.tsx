"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type StatusType = {
  type: "" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<StatusType>({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus({
          type: "error",
          message:
            data.message ||
            "Unable to send your message.",
        });

        return;
      }

      form.reset();

      setStatus({
        type: "success",
        message:
          data.message ||
          "Your message has been sent successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Connection error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="tslnContactForm"
      onSubmit={handleSubmit}
    >
      {/* Honeypot Anti-Bot */}
      <div
        className="tslnHoneyField"
        aria-hidden="true"
      >
        <label htmlFor="company">
          Company
        </label>

        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="tslnContactFormGrid">
        <div className="tslnFormGroup">
          <label htmlFor="firstName">
            First Name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
          />
        </div>

        <div className="tslnFormGroup">
          <label htmlFor="lastName">
            Last Name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="tslnFormGroup">
        <label htmlFor="email">
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="tslnFormGroup">
        <label htmlFor="subject">
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          required
        />
      </div>

      <div className="tslnFormGroup">
        <label htmlFor="message">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          required
        />
      </div>

      {status.message && (
        <p
          className={`tslnFormStatus ${status.type}`}
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        className="tslnBtn"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send Message"}
      </button>
    </form>
  );
}