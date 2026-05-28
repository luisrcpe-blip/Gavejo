export const SUPPORTED_LOCALES = ["es", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

const LOCALIZED_PREFIXES: Record<Exclude<Locale, typeof DEFAULT_LOCALE>, string> = {
  en: "/en"
};

const NON_LOCALIZED_PREFIXES = ["/admin", "/api", "/catalogos"];

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizePath(path: string, locale: Locale) {
  if (!path || path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:")) {
    return path;
  }

  const basePath = stripLocalePrefix(path);

  if (NON_LOCALIZED_PREFIXES.some((prefix) => basePath === prefix || basePath.startsWith(`${prefix}/`))) {
    return basePath;
  }

  if (locale === DEFAULT_LOCALE) return basePath;

  const prefix = LOCALIZED_PREFIXES.en;
  return basePath === "/" ? prefix : `${prefix}${basePath}`;
}

export function getLocalizedEquivalent(pathname: string | null | undefined, locale: Locale) {
  return localizePath(stripLocalePrefix(pathname || "/"), locale);
}
