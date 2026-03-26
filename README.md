# Marcel van Lier Objektaufbereitung

Dies ist der Quellcode für die Unternehmenswebsite **Marcel van Lier Objektaufbereitung** – Spezialreinigung & Bauendreinigung im Ruhrgebiet und am Niederrhein.

Live-Website: [https://lier-objektaufbereitung.de](https://lier-objektaufbereitung.de)

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation für maximale Performance)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typografie:** Fontsource (Montserrat & Open Sans)
- **Formulare:** [Web3Forms](https://web3forms.com/)
- **Hosting:** Vercel

## 📂 Projektstruktur

Alle zentralen Inhalte und Konfigurationen werden aus der `siteConfig.ts` im Ordner `src/data/` gesteuert.

```text
/
├── public/                 # Statische Assets (Favicon, OG-Images, Robots.txt)
├── src/
│   ├── assets/             # Bilder und Grafiken
│   ├── components/         # Wiederverwendbare Astro-Komponenten (Hero, FAQ, Footer)
│   ├── data/               # Zentrale Daten (cities.js, siteConfig.ts)
│   ├── layouts/            # Basis-HTML-Gerüst und globale SEO-Tags
│   ├── pages/              # Routing (index, danke, impressum, datenschutz, dynamische Städte)
│   └── styles/             # Globale CSS-Dateien und Tailwind-Konfiguration
├── astro.config.mjs        # Astro-Konfiguration (Sitemap, Tailwind)
├── package.json            # Abhängigkeiten und Skripte
└── tsconfig.json           # TypeScript-Konfiguration
```
