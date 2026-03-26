import { z } from "zod";

const responseTime = "12 Stunden";

// 1. Zod Schema für die Basis-Daten
const siteConfigSchema = z.object({
  company: z.object({
    name: z.string().min(1),
    owner: z.string().min(1),
    street: z.string().min(1),
    zip: z.string().length(5, "PLZ muss genau 5 Zeichen lang sein"),
    city: z.string().min(1),
    state: z.string().min(1),
    region: z.string().min(1),
    radius: z.string().min(1),
  }),
  contact: z.object({
    phoneFormatted: z.string().min(1),
    // E.164 Format Validierung (z.B. +49176...)
    phoneE164: z
      .string()
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        "Muss eine gültige E.164 Telefonnummer sein",
      ),
    email: z.string().email("Muss eine gültige E-Mail Adresse sein"),
  }),
  seo: z.object({
    url: z.string().url("Muss eine gültige URL sein"),
    defaultTitle: z.string().min(10),
    defaultDescription: z.string().min(20),
  }),
  promises: z.object({
    responseTime: z.string().min(1),
    minPrice: z.string().min(1),
  }),
  cta: z.object({
    waDefaultText: z.string().min(1),
    mailDefaultSubject: z.string().min(1),
    promiseText: z.string().min(1),
  }),
});

// 2. Rohe Konfigurationsdaten
const rawConfig = {
  company: {
    name: "Marcel van Lier Objektaufbereitung",
    owner: "Marcel van Lier",
    street: "Vor dem Falltor 11",
    zip: "46459",
    city: "Rees",
    state: "Nordrhein-Westfalen",
    region: "Ruhrgebiet & Niederrhein",
    radius: "80 km",
  },
  contact: {
    phoneFormatted: "+49 176 20013611",
    phoneE164: "+4917620013611",
    email: "kontakt@lier-objektaufbereitung.de",
  },
  seo: {
    url: "https://lier-objektaufbereitung.de",
    defaultTitle:
      "Spezialreinigung & Bauendreinigung im Ruhrgebiet | Marcel van Lier Objektaufbereitung",
    defaultDescription:
      "Spezialreinigung, Bauendreinigung und Grundreinigung für Immobilien und Gewerbeflächen im Ruhrgebiet. Strukturierte Ausführung, transparente Einschätzung und direkte Kommunikation.",
  },
  promises: {
    responseTime,
    minPrice: "150 €",
  },
  cta: {
    waDefaultText:
      "Hallo, ich habe eine Anfrage zur Spezialreinigung. Hier sind erste Fotos vom Objekt:",
    mailDefaultSubject: "Anfrage Reinigungsprojekt",
    promiseText: `werktags innerhalb von ${responseTime} eine erste realistische Einschätzung`,
  },
};

// 3. LAUFZEIT-VALIDIERUNG:
// Wirft einen Error beim Server-Start, wenn z.B. die URL keine gültige URL ist.
const validatedData = siteConfigSchema.parse(rawConfig);

// 4. Finales Export-Objekt inkl. Helfer-Funktionen zusammensetzen
export const siteConfig = {
  ...validatedData,

  // Dynamische Methoden (nutzen sicher die validierten Daten)
  getWhatsAppLink: (text: string) => {
    // Entfernt vorsichtshalber das + aus der E164 Nummer für den wa.me Link
    const cleanPhone = validatedData.contact.phoneE164.replace("+", "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  },
  getMailtoLink: (subject: string) => {
    return `mailto:${validatedData.contact.email}?subject=${encodeURIComponent(subject)}`;
  },
  cta: {
    ...validatedData.cta,
    getWaCityText: (city: string) =>
      `Hallo, ich habe eine Anfrage zur Spezialreinigung in ${city}. Hier sind erste Fotos vom Objekt:`,
    getMailCitySubject: (city: string) => `Anfrage Reinigungsprojekt ${city}`,
  },
};

// Typ-Export für andere Dateien, die das Config-Objekt erwarten
export type SiteConfig = typeof siteConfig;
