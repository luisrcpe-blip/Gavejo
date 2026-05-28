import { LandingPage } from "@/components/landing/LandingPage";
import { fachadasLandingEn } from "@/lib/landing-data-en";

export default function EnglishFachadasPage() {
  return <LandingPage config={fachadasLandingEn} locale="en" />;
}
