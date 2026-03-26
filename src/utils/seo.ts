import { cityData } from "../data/cities.ts";
import { siteConfig } from "../data/siteConfig.ts";

export function getBaseSchema(
  title: string,
  description: string,
  url: string,
  ogImage: string,
) {
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${siteConfig.seo.url}/#organization`,
    name: siteConfig.company.name,
    url: siteConfig.seo.url,
    logo: `${siteConfig.seo.url}/logowhite.svg`,
    image: ogImage,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
  };

  const localBusinessSchema = {
    "@type": "CleaningService",
    "@id": `${siteConfig.seo.url}/#localbusiness`,
    name: siteConfig.company.name,
    url: siteConfig.seo.url,
    image: [ogImage],
    logo: `${siteConfig.seo.url}/logowhite.svg`,
    description: siteConfig.seo.defaultDescription,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.company.city,
      postalCode: siteConfig.company.zip,
      addressRegion: siteConfig.company.state,
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ruhrgebiet" },
      { "@type": "AdministrativeArea", name: "Niederrhein" },
      ...cityData.map((city) => ({ "@type": "City", name: city.name })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        areaServed: "DE",
        availableLanguage: ["de"],
      },
    ],
    parentOrganization: {
      "@id": `${siteConfig.seo.url}/#organization`,
    },
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteConfig.seo.url}/#website`,
    url: siteConfig.seo.url,
    name: siteConfig.company.name,
    inLanguage: "de-DE",
  };

  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url: url,
    name: title,
    description,
    isPartOf: {
      "@id": `${siteConfig.seo.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.seo.url}/#localbusiness`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    inLanguage: "de-DE",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      webpageSchema,
    ],
  };
}

export function getFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
