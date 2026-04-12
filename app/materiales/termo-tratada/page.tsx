import { LandingPage } from "@/components/landing/LandingPage";
import { termoLanding } from "@/lib/landing-data";

export default function TermoTratadaPage() {
  return <LandingPage config={termoLanding} />;
}
