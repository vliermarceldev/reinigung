import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { cityData, getCityMeta } from "../src/data/cities.ts";
import { siteConfig } from "../src/data/siteConfig.ts";

// ---------------------------------------------------------
// 1. ROUTING & ERROR HANDLING (Edge Cases)
// ---------------------------------------------------------
test.describe("1. Routing & Edge Cases", () => {
  test("Generische 404-Seite rendert korrekt und hat den Status 404", async ({
    page,
  }) => {
    const response = await page.goto("/diese-seite-gibt-es-nicht");
    expect(response?.status()).toBe(404);

    const h1 = page.locator("h1");
    await expect(h1).toContainText("nicht gefunden", { ignoreCase: true });
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });

  test("Falscher Städte-Slug wirft einen sauberen 404", async ({ page }) => {
    // Diese Stadt existiert nicht in der cities.ts
    const response = await page.goto("/spezialreinigung-muenchen");
    expect(response?.status()).toBe(404);
  });

  test("Danke-Seite zeigt Rückweg und blockiert Indexierung", async ({
    page,
  }) => {
    await page.goto("/danke");
    await expect(page.locator("h1")).toBeVisible();

    // Die Danke-Seite darf niemals bei Google im Index landen
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
  });
});

// ---------------------------------------------------------
// 2. SEO & KONTAKT-FORMATIERUNG
// ---------------------------------------------------------
test.describe("2. SEO & Kontakt-Integrität", () => {
  test("Basis-SEO und Canonical-Tag der Startseite sind korrekt", async ({
    page,
  }) => {
    await page.goto("/");

    // Check Canonical (tolerant gegenüber Trailing Slashes)
    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute("href");
    expect(href).toContain(siteConfig.seo.url);

    // Startseite darf nicht blockiert werden
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
      "content",
      /noindex/,
    );
  });

  test("WhatsApp- und Mail-Links sind robust formatiert", async ({ page }) => {
    await page.goto("/");

    // Wir prüfen, ob die Links das wa.me und mailto: Muster enthalten
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();

    const mailLink = page.locator('a[href^="mailto:"]').first();
    await expect(mailLink).toBeVisible();
  });
});

// ---------------------------------------------------------
// 3. FORMULAR-VALIDIERUNG & LOGIK (Edge Cases)
// ---------------------------------------------------------
test.describe("3. Formular Frontend-Absicherung", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#kontakt");
  });

  test("Pflichtfelder blockieren den Submit, wenn sie leer sind", async ({
    page,
  }) => {
    const form = page.locator("#contact-form");
    const submitBtn = form.locator('button[type="submit"]');

    // Klick ohne Eingaben
    await submitBtn.click();

    // HTML5 Validierung muss greifen
    const nameInput = form.locator('input[name="name"]');
    const isInvalid = await nameInput.evaluate(
      (el: HTMLInputElement) => !el.checkValidity(),
    );
    expect(isInvalid).toBeTruthy();
  });

  test("Dateigröße exakt am Limit (10MB) wird akzeptiert, 10.1MB wird blockiert", async ({
    page,
  }) => {
    const fileInput = page.locator('input[type="file"]');
    const errorMsg = page.locator("#file-error");
    const submitBtn = page.locator('#contact-form button[type="submit"]');

    // Test 1: Exakt 10 MB (sollte durchgehen)
    const exactly10MB = Buffer.alloc(10 * 1024 * 1024);
    await fileInput.setInputFiles({
      name: "limit.jpg",
      mimeType: "image/jpeg",
      buffer: exactly10MB,
    });
    await expect(errorMsg).toBeHidden();
    await expect(submitBtn).toBeEnabled();

    // Test 2: Minimal über Limit (10.1 MB - sollte fehlschlagen)
    const overLimit = Buffer.alloc(10.1 * 1024 * 1024);
    await fileInput.setInputFiles({
      name: "zu-gross.jpg",
      mimeType: "image/jpeg",
      buffer: overLimit,
    });
    await expect(errorMsg).toBeVisible();
    await expect(submitBtn).toBeDisabled();
  });
});

// ---------------------------------------------------------
// 4. BARRIEREFREIHEIT (A11Y)
// ---------------------------------------------------------
test.describe("4. Accessibility (a11y) Checks", () => {
  test("Startseite erfüllt die wichtigsten WCAG-Standards", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude("iframe")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      // Ignoriert den strikten Farbkontrast für Design-Elemente wie Footer/Marquee
      .disableRules(["color-contrast"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

// ---------------------------------------------------------
// 5. RESPONSIVE DESIGN (Mobile)
// ---------------------------------------------------------
test.describe("5. Mobile Viewport (iPhone 13)", () => {
  // Simuliert die exakten Maße eines iPhones
  test.use({ viewport: { width: 390, height: 844 } });

  test("Hero und Formular bleiben im mobilen Viewport", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();

    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();
    await expect(form).toBeVisible();

    const nameInput = form.locator('input[name="name"]');
    const box = await nameInput.boundingBox();

    // Das Input-Feld darf nicht breiter als das Handydisplay sein (horizontaler Scroll-Schutz)
    expect(box?.width).toBeLessThanOrEqual(390);
  });
});

// ---------------------------------------------------------
// 6. STÄDTE-DYNAMIK
// ---------------------------------------------------------
test.describe("6. Lokale Landingpages (Städte)", () => {
  // Testet vollautomatisch alle Städte, die in der config hinterlegt sind
  for (const city of cityData) {
    test(`Stadtseite "${city.name}" erfüllt alle SEO- und Content-Kriterien`, async ({
      page,
    }) => {
      await page.goto(`/spezialreinigung-${city.slug}`);

      const { title, description } = getCityMeta(city.name);

      await expect(page).toHaveTitle(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        description,
      );

      // Canonical (Trailing Slash tolerant)
      const canonical = page.locator('link[rel="canonical"]');
      const canonicalHref = await canonical.getAttribute("href");
      expect(canonicalHref).toContain(
        `${siteConfig.seo.url}/spezialreinigung-${city.slug}`,
      );

      // H1 und lokales FAQ müssen rendern
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(city.h1Sub);

      await expect(page.locator("#faq")).toBeVisible();
    });
  }
});
