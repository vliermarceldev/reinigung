# Lier Objektaufbereitung - Spezialreinigung

Ein hochperformantes, SEO-optimiertes und barrierefreies Multi-Page-Webprojekt, gebaut mit Astro, Tailwind CSS v4 und TypeScript. Entwickelt für maximale lokale Sichtbarkeit und höchste Conversion-Raten bei Härtefällen und Bauendreinigungen.

## 🚀 Kern-Features

- **Statische Generierung (SSG):** Blitzschnelle Ladezeiten und perfekte Core Web Vitals dank Astro.
- **Single Source of Truth:** Vollständige Steuerung aller Inhalte, FAQs und Meta-Daten über zentralisierte und validierte TypeScript-Dateien (`siteConfig.ts`, `cities.ts`).
- **Skalierbare Lokal-SEO:** Dynamische Generierung von Landingpages pro Einsatzort inkl. automatisiertem Schema.org Local Business & FAQ-Markup.
- **Performance First:** Aggressiv optimierte Variable-Fonts (Latin-Subset) und serverseitige Bildkomprimierung.
- **Bulletproof Formular:** Gehärtetes Web3Forms-Setup mit hCaptcha, Honeypot und strikter clientseitiger MIME-Type-Validierung für Dateianhänge.
- **Enterprise Quality Gate:** Cross-Browser E2E-Testing (Playwright), strikte Barrierefreiheits-Checks (Axe-core) und automatisierte CI-Pipelines.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (via Vite Plugin)
- **Sprache & Validierung:** TypeScript & [Zod](https://zod.dev)
- **E2E & a11y Testing:** [Playwright](https://playwright.dev) & [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/master/packages/playwright)
- **CI/CD:** GitHub Actions & [Lychee](https://lychee.cli.rs/) (Broken Link Checker)

## 📁 Projektstruktur

Das Projekt folgt einer klaren, modularen Architektur:

```text
/
├── .github/workflows/   # CI/CD Pipelines (Quality Gate)
├── src/
│   ├── assets/          # Lokale Bilder & Grafiken
│   ├── components/      # Wiederverwendbare UI-Elemente (Footer, Process, CTAs...)
│   ├── data/
│   │   ├── cities.ts    # 📍 Zentraler Datenstamm für alle Städte & FAQs (Zod-validiert)
│   │   └── siteConfig.ts# ⚙️ Globale Einstellungen (SEO, URLs, Firmenname)
│   ├── layouts/         # Basis-Layouts (Meta-Tags, JSON-LD Einbindung)
│   ├── pages/           # Statische Routen (index, impressum, 404, etc.)
│   │   └── spezialreinigung-[city].astro # Dynamischer SEO-Seitengenerator
│   ├── styles/
│   │   └── global.css   # Tailwind v4 Import & Font-Optimierung (unicode-range)
│   └── utils/
│       └── seo.ts       # Helper-Funktionen für Schema.org Generierung
├── tests/
│   └── e2e.spec.ts      # Playwright Test-Suite (Routing, Formulare, a11y, SEO)
└── astro.config.mjs     # Minimale Astro & Vite Konfiguration
```
