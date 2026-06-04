/** Primary reference sources — ids used across the report */
export const reportSources = [
  { id: "seia-smi-2025", label: "SEIA / Wood Mackenzie", title: "Solar Market Insight Report 2025 Year in Review", url: "https://seia.org/research-resources/solar-market-insight-report-2025-year-in-review/", accessed: "06/2026" },
  { id: "seia-5m", label: "SEIA", title: "5 Million Solar Installations (U.S. milestone & stats)", url: "https://seia.org/news/5million", accessed: "06/2026" },
  { id: "energysage-ca", label: "EnergySage", title: "Solar panel cost in California (2026)", url: "https://www.energysage.com/local-data/solar-panel-cost/ca/", accessed: "06/2026" },
  { id: "energysage-marketplace", label: "EnergySage", title: "Marketplace & installer comparison", url: "https://www.energysage.com/", accessed: "06/2026" },
  { id: "sce-rates", label: "SCE", title: "Rate Advisory — residential average rate", url: "https://www.sce.com/save-money/rates-financing/sce-rate-advisory", accessed: "06/2026" },
  { id: "sce-tou", label: "SCE", title: "Time-of-Use residential rate plans (TOU-D 4–9 PM)", url: "https://www.sce.com/save-money/rates-financing/residential-rate-plans/time-of-use-plans", accessed: "06/2026" },
  { id: "cpuc-nbt", label: "CPUC", title: "Net Billing Tariff (NEM 3.0) proceeding", url: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-costs/nem-revisit", accessed: "06/2026" },
  { id: "cpuc-fixed", label: "CPUC / SEIA", title: "Residential fixed charges & rate design (ongoing)", url: "https://www.cpuc.ca.gov/", accessed: "06/2026" },
  { id: "census-ca", label: "U.S. Census", title: "California QuickFacts — housing units & tenure", url: "https://www.census.gov/quickfacts/fact/table/CA/HSG010223", accessed: "06/2026" },
  { id: "ca-dgstats", label: "California DGStats", title: "Interconnected solar & storage (IOU territories)", url: "https://www.californiadgstats.ca.gov/charts/", accessed: "06/2026" },
  { id: "ca-energy-2045", label: "California Energy Commission", title: "100% clean electricity by 2045", url: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency", accessed: "06/2026" },
  { id: "title24-solar", label: "California Energy Commission", title: "2022 Building Energy Standards — solar mandate", url: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", accessed: "06/2026" },
  { id: "cslb", label: "CSLB", title: "Contractors State License Board — C-10 / C-46", url: "https://www.cslb.ca.gov/", accessed: "06/2026" },
  { id: "sgip", label: "CPUC / utilities", title: "Self-Generation Incentive Program (battery rebates)", url: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/self-generation-incentive-program", accessed: "06/2026" },
  { id: "irs-itc", label: "IRS / SEIA", title: "Section 25D residential ITC — expired after 2025 (OBBBA)", url: "https://www.seia.org/research-resources/solar-market-insight-report-2025-year-in-review/", accessed: "06/2026" },
  { id: "solarreviews", label: "SolarReviews", title: "Installer ratings & reviews", url: "https://www.solarreviews.com/", accessed: "06/2026" },
  { id: "berkeley-lbnl", label: "LBNL / studies", title: "Solar & home value (solar-owned premium literature)", url: "https://emp.lbl.gov/projects/solar-adopters", accessed: "06/2026" },
  { id: "brightlocal", label: "BrightLocal", title: "Local Consumer Review Survey (online trust)", url: "https://www.brightlocal.com/research/local-consumer-review-survey/", accessed: "06/2026" },
  { id: "mckinsey-solar", label: "McKinsey", title: "Solar industry / distributed energy insights", url: "https://www.mckinsey.com/industries/electric-power-and-natural-gas/our-insights", accessed: "06/2026" },
  { id: "cali-company", label: "CaliSolar internal", title: "Install count, EPC partner (Simple Power C-10 #1,111,652)", url: null, accessed: "06/2026", note: "Internal data — reconcile with CRM/permits" },
];

export const caMarketSizing = {
  asOf: "June 2026",
  housingUnits: { value: "≈15.0 million", sourceId: "census-ca", note: "Housing units, July 2025 (V2025)" },
  ownerOccupied: { value: "≈8.4 million households", sourceId: "census-ca", note: "55.9% owner-occupied rate × housing units" },
  rooftopSuitable: { value: "≈5.9 million households", sourceId: "census-ca", note: "Est. ~70% of owner-occupied with PV-suitable roofs (detached/townhome; excludes unsuitable high-rise)" },
  withSolar: { value: "≈1.9–2.1 million systems", sourceId: "ca-dgstats", note: "Interconnected at PG&E/SCE/SDG&E (residential+commercial); mostly residential — track on California DGStats" },
  remainingTam: { value: "≈4.0 million households", sourceId: "ca-dgstats", note: "Suitable roofs without solar — core TAM for residential dealers 2026–2030" },
  annualResidentialMW: { value: "4,647 MWdc (2025, −2% YoY)", sourceId: "seia-smi-2025", note: "U.S. total; CA still leads residential" },
  forecast2026: { value: "−19% U.S. residential (2026)", sourceId: "seia-smi-2025", note: "After Section 25D expiration" },
};
