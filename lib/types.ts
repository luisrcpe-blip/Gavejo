export type LeadStatus = "new" | "in_progress" | "closed";

export type Lead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  originLanding: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  consent: boolean;
  utmSource?: string;
  utmCampaign?: string;
};

export type DemoSettings = {
  whatsappNumber: string;
  notifyEmail: string;
  emailJsEnabled: boolean;
  mailchimpEnabled: boolean;
  privacyUrl: string;
  brandMode: "default" | "clean" | "editorial";
};

export type AnalyticsEventName =
  | "cta_click"
  | "whatsapp_click"
  | "form_submit"
  | "lead_status_change";

export type AnalyticsEvent = {
  eventName: AnalyticsEventName;
  sourcePage: string;
  timestamp: string;
  metadata: Record<string, string | number | boolean>;
};

export type MediaItem = {
  image: string;
  alt: string;
};

export type ApplicationItem = MediaItem & {
  title: string;
  text: string;
};

export type SystemItem = MediaItem & {
  number: string;
  title: string;
  text: string;
};

export type MaterialItem = MediaItem & {
  title: string;
  subtitle: string;
  text: string;
  cta: string;
  ctaHref: string;
};

export type LandingConfig = {
  slug: string;
  route: string;
  navName: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  introTitle: string;
  introDescription: string;
  applications: ApplicationItem[];
  systems: SystemItem[];
  materials: MaterialItem[];
  gallery: MediaItem[];
  technicalPoints: string[];
  maderBalear: {
    title: string;
    text: string;
    image: string;
    ctaLabel: string;
  };
  technicalSpecs?: Array<{
    label: string;
    value: string;
  }>;
};

export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
  updatedAt: string;
};

export type LandingOverride = {
  active: boolean;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  ctaPrimaryLabel: string;
};

export type LandingOverrideMap = Record<string, LandingOverride>;

export type PageMeta = {
  key: string;
  title: string;
  route: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
};
