"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics-store";
import { addLead } from "@/lib/leads-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";

type ContactFormProps = {
  originLanding: string;
};

export function ContactForm({ originLanding }: ContactFormProps) {
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
    "Hola Gavejo, quiero una propuesta tecnica para mi proyecto."
  )}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <input
          className="input-field"
          placeholder="Nombre y apellidos"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="input-field"
          placeholder="Email o telefono"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
        <textarea
          className="input-field textarea"
          placeholder="Cuentanos brevemente tu proyecto"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <label className="consent-row">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>
            Acepto el tratamiento de datos segun la{" "}
            <a href={settings.privacyUrl} target="_blank" rel="noreferrer">
              politica de privacidad
            </a>
            .
          </span>
        </label>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
            Enviar consulta
          </button>
          <a className="btn btn-secondary" href={waHref} target="_blank" rel="noreferrer">
            Abrir WhatsApp
          </a>
        </div>
      </div>
      {status === "ok" && (
        <p className="form-feedback ok">
          Lead registrado en CRM. Integraciones EmailJS y Mailchimp quedan preparadas segun ajustes.
        </p>
      )}
      {status === "error" && (
        <p className="form-feedback error">
          Completa los campos y verifica conexion API/MySQL (DB_*) para guardar el lead.
        </p>
      )}
    </form>
  );
}
