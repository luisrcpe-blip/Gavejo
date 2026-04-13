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
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        style={{ display: "block" }}
      >
        <path d="M20.52 3.48A11.85 11.85 0 0 0 12.03 0C5.4 0 .03 5.37.03 12c0 2.11.55 4.16 1.6 5.96L0 24l6.19-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.88 11.88 0 0 0-3.48-8.52ZM12 22.03c-1.76 0-3.49-.47-4.99-1.35l-.36-.21-3.68.96.98-3.58-.24-.37A10.02 10.02 0 1 1 12 22.03Zm5.8-7.93c-.32-.16-1.9-.94-2.19-1.04-.29-.1-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.61-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.25-.6-.51-.52-.71-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.32-1.11 1.08-1.11 2.63 0 1.56 1.14 3.07 1.29 3.28.16.21 2.23 3.41 5.41 4.78.76.33 1.35.53 1.81.68.76.24 1.45.2 1.99.12.61-.09 1.9-.78 2.16-1.53.26-.76.26-1.41.18-1.53-.08-.11-.29-.19-.61-.35Z" />
      </svg>
    </a>
  );
}
