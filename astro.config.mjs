import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Deine Live-URL ist wichtig für die Sitemap und canonical Links
  site: "https://lier-objektaufbereitung.de",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
