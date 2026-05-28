"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics-store";
import { Locale, localizePath } from "@/lib/i18n";
import { addLead } from "@/lib/leads-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";

type ContactFormProps = {
  originLanding: string;
  locale?: Locale;
};

const FORM_COPY: Record<
  Locale,
  {
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    project: string;
    projectPlaceholder: string;
    consentPrefix: string;
    privacy: string;
    submit: string;
    whatsapp: string;
    ok: string;
    error: string;
    whatsappMessage: string;
  }
> = {
  es: {
    name: "Nombre y apellidos",
    namePlaceholder: "Ejemplo: Ana Torres",
    contact: "Email o telefono",
    contactPlaceholder: "email@empresa.com o +34...",
    project: "Proyecto",
    projectPlaceholder: "Cuentanos brevemente tu proyecto",
    consentPrefix: "Acepto el tratamiento de datos segun la",
    privacy: "politica de privacidad",
    submit: "Enviar consulta",
    whatsapp: "Abrir WhatsApp",
    ok: "Lead registrado en CRM. Integraciones EmailJS y Mailchimp quedan preparadas segun ajustes.",
    error: "Completa los campos y verifica conexion API/MySQL (DB_*) para guardar el lead.",
    whatsappMessage: "Hola Gavejo, quiero una propuesta tecnica para mi proyecto."
  },
  en: {
    name: "Full name",
    namePlaceholder: "Example: Ana Torres",
    contact: "Email or phone",
    contactPlaceholder: "email@company.com or +34...",
    project: "Project",
    projectPlaceholder: "Tell us briefly about your project",
    consentPrefix: "I accept data processing according to the",
    privacy: "privacy policy",
    submit: "Send inquiry",
    whatsapp: "Open WhatsApp",
    ok: "Lead saved in the CRM. EmailJS and Mailchimp integrations remain ready in settings.",
    error: "Complete the fields and verify the API/MySQL connection (DB_*) to save the lead.",
    whatsappMessage: "Hello Gavejo, I would like a technical proposal for my project."
  }
};

export function ContactForm({ originLanding, locale = "es" }: ContactFormProps) {
  const copy = FORM_COPY[locale];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [settings, setSettings] = useState(getDemoSettings());

  useEffect(() => {
    void syncSettingsFromServer().then(() => setSettings(getDemoSettings()));
    setSettings(getDemoSettings());
    return subscribeSettings(() => setSettings(getDemoSettings()));
  }, []);

  const canSubmit =
    name.trim().length > 1 && contact.trim().length > 4 && message.trim().length > 5 && consent;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) {
      setStatus("error");
      return;
    }

    const query = new URLSearchParams(window.location.search);
    try {
      await addLead({
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
        originLanding,
        consent,
        utmSource: query.get("utm_source") ?? undefined,
        utmCampaign: query.get("utm_campaign") ?? undefined
      });
    } catch {
      setStatus("error");
      return;
    }

    trackEvent("form_submit", originLanding, {
      hasConsent: consent,
      emailJsEnabled: settings.emailJsEnabled,
      mailchimpEnabled: settings.mailchimpEnabled
    });

    setStatus("ok");
    setName("");
    setContact("");
    setMessage("");
    setConsent(false);
  };

  const waHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    copy.whatsappMessage
  )}`;
  const privacyHref = localizePath(settings.privacyUrl, locale);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field-group">
          <span className="field-label">{copy.name}</span>
          <input
            className="input-field"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="field-group">
          <span className="field-label">{copy.contact}</span>
          <input
            className="input-field"
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.contactPlaceholder}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </label>
        <label className="field-group">
          <span className="field-label">{copy.project}</span>
          <textarea
            className="input-field textarea"
            placeholder={copy.projectPlaceholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <label className="consent-row">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>
            {copy.consentPrefix}{" "}
            <a href={privacyHref} target="_blank" rel="noreferrer">
              {copy.privacy}
            </a>
            .
          </span>
        </label>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
            {copy.submit}
          </button>
          <a className="btn btn-secondary" href={waHref} target="_blank" rel="noreferrer">
            {copy.whatsapp}
          </a>
        </div>
      </div>
      {status === "ok" && (
        <p className="form-feedback ok">
          {copy.ok}
        </p>
      )}
      {status === "error" && (
        <p className="form-feedback error">
          {copy.error}
        </p>
      )}
    </form>
  );
}
