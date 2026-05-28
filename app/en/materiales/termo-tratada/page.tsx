import { LandingPage } from "@/components/landing/LandingPage";
import { termoLandingEn } from "@/lib/landing-data-en";

export default function EnglishTermoTratadaPage() {
  return <LandingPage config={termoLandingEn} locale="en" />;
}
