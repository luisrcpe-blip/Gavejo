"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";

type FloatingWhatsAppProps = {
  sourcePage: string;
};

export function FloatingWhatsApp({ sourcePage }: FloatingWhatsAppProps) {
  const [phone, setPhone] = useState(getDemoSettings().whatsappNumber);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    void syncSettingsFromServer().then(() => setPhone(getDemoSettings().whatsappNumber));
    return subscribeSettings(() => setPhone(getDemoSettings().whatsappNumber));
  }, []);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.matches("input, textarea, select, [contenteditable='true']")) {
        setHidden(true);
      }
    };

    const onFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active || !active.matches("input, textarea, select, [contenteditable='true']")) {
          setHidden(false);
        }
      }, 0);
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const href = useMemo(() => {
    const clean = phone.replace(/\D/g, "");
    return `https://wa.me/${clean}?text=${encodeURIComponent(
      "Hola Gavejo, quiero informacion para mi proyecto."
    )}`;
  }, [phone]);

  return (
    <a
      className={`wa-float ${hidden ? "is-hidden" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("whatsapp_click", sourcePage, { placement: "floating" })}
      aria-label="Abrir WhatsApp"
    >
      WA
    </a>
  );
}
