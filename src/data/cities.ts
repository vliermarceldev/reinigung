import { z } from "zod";
import { siteConfig } from "./siteConfig.ts";

// 1. Definition der Laufzeit-Schemas (Regeln)
export const faqSchema = z.object({
  q: z.string().min(5, "Frage ist zu kurz"),
  a: z.string().min(10, "Antwort ist zu kurz"),
});

export const citySchema = z.object({
  name: z.string().min(2, "Stadtname fehlt oder ist zu kurz"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug ist ungültig (nur a-z, 0-9 und -)"),
  h1Sub: z.string().min(5, "H1 Subline fehlt"),
  introTitle: z.string().min(5, "Intro Titel fehlt"),
  introText: z.string().min(20, "Intro Text ist zu kurz"),
  logistics: z.string().min(10, "Logistik-Text fehlt"),
  faqs: z.array(faqSchema).min(1, "Mindestens ein FAQ-Eintrag ist Pflicht"),
});

// 2. Automatische Generierung der TypeScript-Typen
export type FaqEntry = z.infer<typeof faqSchema>;
export type CityEntry = z.infer<typeof citySchema>;

// 3. Die rohen Daten aller Städte
const rawCityData = [
  {
    slug: "essen",
    name: "Essen",
    h1Sub: "in Essen.",
    introTitle: "Lokale Expertise für Essener Immobilien.",
    introText:
      "Essen vereint moderne Unternehmenssitze im Südviertel, historische Industriekultur und anspruchsvolle Wohnkonzepte in Rüttenscheid oder Bredeney. Ob tiefgehende Bauendreinigung nach Sanierungen, Intensivreinigung von Gewerbeflächen oder die diskrete Aufbereitung von Härtefällen und Übergabeobjekten im Essener Norden – wir kennen die lokalen Anforderungen und Gebäudestrukturen genau.",
    logistics:
      "Dank der zentralen Anbindung über die A40 und A52 gibt es keine langen Anfahrtswege. Besichtigungstermine in Essen können oft innerhalb von 24 Stunden realisiert werden, und auch kurzfristige Einsätze sind wirtschaftlich sinnvoll umsetzbar.",
    faqs: [
      {
        q: "Bieten Sie auch Bauendreinigungen für Großprojekte in Essen an?",
        a: "Ja, wir betreuen neben Wohnungsübergaben auch gewerbliche Sanierungs- und Neubauprojekte im gesamten Essener Stadtgebiet.",
      },
      {
        q: "Wie schnell sind Sie bei einem Härtefall in Essen vor Ort?",
        a: "Bei akuten Fällen (z. B. nach Mietnomaden oder starken Verunreinigungen) können wir in Essen meist innerhalb von 24 bis 48 Stunden eine Erstbesichtigung durchführen.",
      },
    ],
  },
  {
    slug: "dortmund",
    name: "Dortmund",
    h1Sub: "in Dortmund.",
    introTitle: "Spezialreinigung für den Standort Dortmund.",
    introText:
      "Als größter Wirtschaftsstandort in Westfalen wächst Dortmund rasant. Vom Phönixsee über das Kreuzviertel bis hin zu den großen Logistik- und Gewerbeparks entstehen ständig neue Anforderungen an Sauberkeit und Werterhalt. Wir unterstützen Hausverwaltungen, Makler und Bauträger in Dortmund mit strukturierter Bauendreinigung und kompromissloser Grundreinigung für anspruchsvolle Objekte.",
    logistics:
      "Die Erreichbarkeit über die B1/A40 sowie die A45 macht Einsätze im gesamten Dortmunder Raum und dem Umland effizient planbar. Ein klarer Pluspunkt für schnelle Reaktionszeiten.",
    faqs: [
      {
        q: "Übernehmen Sie auch die Reinigung von Logistikflächen in Dortmund?",
        a: "Wir fokussieren uns auf die Spezial- und Grundreinigung von Büro-, Verwaltungs- und Sozialräumen innerhalb von Gewerbeobjekten, weniger auf reine Hallenreinigungen.",
      },
      {
        q: "Ist eine Vorab-Besichtigung in Dortmund kostenfrei?",
        a: "Ja, sofern sich der Aufwand nicht bereits über aussagekräftige Fotos und Videos via WhatsApp oder E-Mail seriös einschätzen lässt.",
      },
    ],
  },
  {
    slug: "duesseldorf",
    name: "Düsseldorf",
    h1Sub: "in Düsseldorf.",
    introTitle: "Premium-Aufbereitung für Düsseldorfer Objekte.",
    introText:
      "Düsseldorf stellt mit seinen hochwertigen Immobilien – ob Penthäuser in Oberkassel, Büros im Medienhafen oder exklusive Gewerbeflächen an der Kö – besondere Ansprüche an die Objektaufbereitung. Standardreinigung reicht hier oft nicht aus. Wir bieten präzise Spezialreinigungen, sensible Detailpflege und verlässliche Bauendreinigungen, die dem hohen Düsseldorfer Standard gerecht werden.",
    logistics:
      "Über die A52 oder A3 sind wir schnell in der Landeshauptstadt. Die Ausführung wird präzise getaktet, sodass auch bei enger Parkraumsituation oder in stark frequentierten Lagen ein reibungsloser Ablauf garantiert ist.",
    faqs: [
      {
        q: "Können auch sensible und teure Materialien gereinigt werden?",
        a: "Absolut. Vor jedem Einsatz in hochwertigen Düsseldorfer Immobilien prüfen wir die Verträglichkeit von Reinigungsmitteln auf spezifischen Oberflächen.",
      },
      {
        q: "Arbeiten Sie auch für Düsseldorfer Hausverwaltungen?",
        a: "Ja, wir sind ein verlässlicher Partner für Hausverwaltungen und Makler, wenn es um die bezugsfertige Übergabe von Premium-Immobilien geht.",
      },
    ],
  },
  {
    slug: "duisburg",
    name: "Duisburg",
    h1Sub: "in Duisburg.",
    introTitle: "Verlässliche Objektaufbereitung in Duisburg.",
    introText:
      "Von der industriellen Prägung in Marxloh bis zu den modernen Wohn- und Bürokomplexen am Innenhafen – Duisburg erfordert vielseitige Reinigungskonzepte. Wir übernehmen die anspruchsvolle Grundreinigung von Gewerbeflächen, detaillierte Bauendreinigungen nach Sanierungen und die professionelle Aufbereitung von stark verschmutzten Objekten im gesamten Stadtgebiet.",
    logistics:
      "Dank der direkten Anbindung an die A59 und A40 sind wir im gesamten Duisburger Stadtgebiet zügig einsatzbereit. Flexibilität und Termintreue stehen dabei an erster Stelle.",
    faqs: [
      {
        q: "Führen Sie auch Grundreinigungen in Privatwohnungen in Duisburg durch?",
        a: "Ja, Intensiv- und Grundreinigungen gehören zu unserem Kernangebot für Privat- und Gewerbeobjekte in Duisburg, insbesondere vor Mieterwechseln.",
      },
      {
        q: "Entfernen Sie auch festsitzenden Baustaub nach Kernsanierungen?",
        a: "Das ist unsere Spezialität. Wir entfernen Bau- und Feinstaub sowie Materialrückstände restlos von allen Oberflächen.",
      },
    ],
  },
  {
    slug: "oberhausen",
    name: "Oberhausen",
    h1Sub: "in Oberhausen.",
    introTitle: "Spezialreinigung & Bauendreinigung in Oberhausen.",
    introText:
      "Oberhausen ist durch seine zentrale Lage und Strukturwandelprojekte wie die Neue Mitte ein dynamischer Standort für Gewerbe und Wohnen. Wir unterstützen Bauträger, Hausverwaltungen und private Eigentümer in Oberhausen mit maßgeschneiderten Reinigungslösungen – von der Baufeinreinigung bis zur Beseitigung hartnäckiger Verschmutzungen bei Übergabeobjekten.",
    logistics:
      "Die Autobahnknotenpunkte A42 und A3 ermöglichen uns eine schnelle Erreichbarkeit aller Oberhausener Stadtteile. Das sichert eine effiziente Logistik für reibungslose Projektabläufe.",
    faqs: [
      {
        q: "Reinigen Sie auch Ladenlokale und Gewerbeflächen in Oberhausen?",
        a: "Ja, die Grundreinigung und Bauendreinigung von Ladenlokalen und Büroflächen gehört zu unseren täglichen Aufgaben.",
      },
      {
        q: "Gibt es einen Mindestauftragswert für Einsätze in Oberhausen?",
        a: "Ja, der branchenübliche Mindestauftragswert liegt bei 150 € netto, um Anfahrt und professionelles Equipment wirtschaftlich abzubilden.",
      },
    ],
  },
  {
    slug: "bocholt",
    name: "Bocholt",
    h1Sub: "in Bocholt.",
    introTitle: "Präzise Spezialreinigung für Bocholt und Umgebung.",
    introText:
      "Im westlichen Münsterland gelegen, zeichnet sich Bocholt durch einen starken Mittelstand und attraktive Wohnquartiere aus. Wir bieten hier diskrete und hochprofessionelle Spezialreinigungen an. Ob es um die Übergabe von Neubauten, die Reinigung von Praxen und Büros oder um komplexe Härtefälle geht – unser Fokus liegt auf Werterhalt und Sauberkeit auf höchstem Niveau.",
    logistics:
      "Durch unsere regionale Nähe zum Niederrhein und Westmünsterland sind wir in Bocholt besonders schnell vor Ort. Kurze Kommunikationswege garantieren eine reibungslose Abstimmung.",
    faqs: [
      {
        q: "Bieten Sie auch Fenster- und Rahmenreinigungen in Bocholt an?",
        a: "Wir bieten diese Leistungen als Teil von Bauendreinigungen oder Intensivreinigungen an, jedoch nicht als klassische, isolierte Unterhalts-Fensterreinigung.",
      },
      {
        q: "Reicht eine Anfrage per WhatsApp mit Fotos aus?",
        a: "In den meisten Fällen ja. Aussagekräftige Bilder Ihres Objekts in Bocholt reichen oft für eine erste realistische Einschätzung.",
      },
    ],
  },
  {
    slug: "borken",
    name: "Borken",
    h1Sub: "im Raum Borken.",
    introTitle: "Professionelle Objektaufbereitung im Kreis Borken.",
    introText:
      "Borken verbindet städtische Infrastruktur mit ländlichem Charme. Für Immobilienbesitzer, Makler und Gewerbetreibende in der Region bieten wir verlässliche Bauendreinigungen und Intensivreinigungen an. Wenn Standardreinigungen an ihre Grenzen stoßen, greifen unsere bewährten Verfahren für stark beanspruchte Flächen und Härtefälle.",
    logistics:
      "Einsätze im Kreis Borken werden effizient über die B67 und A31 koordiniert. Eine Vorab-Kalkulation per Foto beschleunigt den gesamten Prozess zusätzlich.",
    faqs: [
      {
        q: "Sind Einsätze in den ländlichen Außengebieten von Borken möglich?",
        a: "Selbstverständlich. Wir betreuen das gesamte Stadtgebiet Borken inklusive der umliegenden Gemeinden.",
      },
      {
        q: "Arbeiten Sie auch an Wochenenden?",
        a: "Wochenendeinsätze sind nach individueller Absprache bei besonders zeitkritischen Übergaben oder gewerblichen Projekten möglich.",
      },
    ],
  },
  {
    slug: "wesel",
    name: "Wesel",
    h1Sub: "in Wesel.",
    introTitle: "Spezialreinigung mit System in Wesel am Rhein.",
    introText:
      "Wesel wächst als attraktiver Wohn- und Wirtschaftsstandort am Niederrhein stetig. Wir übernehmen die fachgerechte Reinigung nach Bau- und Renovierungsmaßnahmen sowie die Grundreinigung von Gewerbe- und Privatobjekten. Auch bei anspruchsvollen Detailreinigungen von Rahmen, Falzen und empfindlichen Oberflächen sind wir Ihr direkter Ansprechpartner in Wesel.",
    logistics:
      "Mit unserem Standort in Rees liegen wir in direkter Nachbarschaft zu Wesel (über die B8). Das ermöglicht uns extrem schnelle Reaktionszeiten und unkomplizierte, oft taggleiche Besichtigungstermine vor Ort.",
    faqs: [
      {
        q: "Kommen durch die Nähe zu Rees überhaupt Anfahrtskosten auf mich zu?",
        a: "Bei Aufträgen im unmittelbaren Umkreis wie Wesel fallen die Logistikkosten sehr gering aus oder sind in den Pauschalangeboten bereits transparent integriert.",
      },
      {
        q: "Führen Sie die Abnahme der Reinigung in Wesel persönlich durch?",
        a: "Ja, als inhabergeführtes Unternehmen erfolgt die finale Abnahme und Übergabe bei allen Objekten direkt und persönlich durch Marcel van Lier.",
      },
    ],
  },
];

// 4. Laufzeitvalidierung
export const cityData: CityEntry[] = z.array(citySchema).parse(rawCityData);

// 5. Helfer-Funktion für SEO-Titel und Meta-Beschreibungen der Städteseiten
export const getCityMeta = (cityName: string) => {
  return {
    title: `Spezialreinigung & Bauendreinigung in ${cityName} | ${siteConfig.company.name}`,
    description: `Spezialreinigung in ${cityName}: Bauendreinigung, Grundreinigung und Härtefälle. Werktags innerhalb von ${siteConfig.promises.responseTime} eine erste realistische Einschätzung.`,
  };
};
