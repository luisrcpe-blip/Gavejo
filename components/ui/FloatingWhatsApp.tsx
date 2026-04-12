"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics-store";
import { getDemoSettings, subscribeSettings, syncSettingsFromServer } from "@/lib/settings-store";

type FloatingWhatsAppProps = {
  sourcePage: string;
};

export function FloatingWhatsApp({ sourcePage }: FloatingWhatsAppProps) {
  const [phone, setPhone] = useState(getDemoSettings().whatsappNumber);

  useEffect(() => {
    void syncSettingsFromServer().then(() => setPhone(getDemoSettings().whatsappNumber));
    return subscribeSettings(() => setPhone(getDemoSettings().whatsappNumber));
  }, []);

  const href = useMemo(() => {
    const clean = phone.replace(/\D/g, "");
    return `https://wa.me/${clean}?text=${encodeURIComponent(
      "Hola Gavejo, quiero información para mi proyecto."
    )}`;
  }, [phone]);

  return (
    <a
      className="wa-float"
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
