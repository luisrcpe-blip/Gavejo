import { LandingPage } from "@/components/landing/LandingPage";
import { fachadasLanding } from "@/lib/landing-data";

export default function FachadasPage() {
  return <LandingPage config={fachadasLanding} />;
}
