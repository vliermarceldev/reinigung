import type { FaqEntry } from "./cities.ts";
import { siteConfig } from "./siteConfig.ts";

export const globalFaqs: FaqEntry[] = [
  {
    q: "Was kostet eine Spezialreinigung?",
    a: "Die Kosten richten sich nach Objektart, Fläche, Verschmutzungsgrad, Zugänglichkeit und Leistungsumfang. Viele Anfragen lassen sich bereits auf Basis von Fotos oder Videos seriös einschätzen. Bei komplexeren Objekten erfolgt die Kalkulation nach Besichtigung oder auf Stundenbasis.",
  },
  {
    q: "Kann ich auch per Foto ein Angebot erhalten?",
    a: "Ja. Für viele Projekte genügt eine kurze Beschreibung zusammen mit 3 bis 5 aussagekräftigen Fotos oder einem kurzen Video. So lässt sich der Aufwand schnell einordnen und ein passender Angebotsrahmen festlegen.",
  },
  {
    q: "Sind auch kurzfristige Termine möglich?",
    a: "Kurzfristige Einsätze sind je nach Auslastung und Objektart möglich. Senden Sie idealerweise direkt Fotos, Standort und eine kurze Beschreibung, damit die Machbarkeit schnell geprüft werden kann.",
  },
  {
    q: "Welche Leistungen werden angeboten?",
    a: "Zum Schwerpunkt gehören Bauendreinigung, Grund- und Intensivreinigung, Reinigung bei starker Verschmutzung sowie Sonder- und Detailreinigung, beispielsweise an Glas-, Rahmen- und Übergabeflächen.",
  },
  {
    q: "Für welche Objekte ist das Angebot geeignet?",
    a: "Bearbeitet werden unter anderem Wohnungen, Häuser, Gewerbeflächen, Büros, Praxen, Übergabeobjekte sowie Einheiten von Hausverwaltungen, Maklern und kleineren gewerblichen Auftraggebern.",
  },
  {
    q: "Wie läuft eine Anfrage ab?",
    a: "Nach Eingang Ihrer Anfrage werden Objektinformationen und Bildmaterial geprüft. Anschließend erhalten Sie eine Einschätzung, ein Angebot oder – wenn erforderlich – einen Termin zur Besichtigung. Nach Bestätigung wird die Ausführung verbindlich eingeplant.",
  },
  {
    q: "Gibt es einen Mindestauftragswert?",
    a: `Ja. Der Mindestauftragswert liegt bei ${siteConfig.promises.minPrice}. So können Anfahrt, Vorbereitung, Ausführung und Dokumentation wirtschaftlich sauber abgebildet werden.`,
  },
  {
    q: "In welchem Gebiet sind Einsätze möglich?",
    a: `Der Schwerpunkt liegt im ${siteConfig.company.region}. Weitere Einsatzorte sind je nach Projektvolumen und Planung nach Absprache möglich.`,
  },
  {
    q: "Wird pauschal oder nach Aufwand abgerechnet?",
    a: "Beides ist möglich. Klar definierte Leistungen können pauschal angeboten werden. Bei schwer kalkulierbaren oder stark verschmutzten Objekten ist eine Abrechnung nach Aufwand häufig die transparenteste Lösung.",
  },
  {
    q: "Was unterscheidet Spezialreinigung von normaler Reinigung?",
    a: "Spezialreinigung wird dort eingesetzt, wo Standardreinigung nicht ausreicht. Dazu zählen höhere Verschmutzungsgrade, Baufeinstaub, haftende Rückstände, sensible Flächen und Objekte mit erhöhtem Anspruch an Ergebnis und Ausführung.",
  },
];
