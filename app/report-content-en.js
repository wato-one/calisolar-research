/** English report copy — data for page_component.jsx */

export const sections = [
  { id: "overview", label: "Overview" },
  { id: "pestel", label: "PESTEL" },
  { id: "porter", label: "Porter's 5 Forces" },
  { id: "competitors", label: "Competitors" },
  { id: "consumer", label: "Consumer Deep Dive" },
  { id: "journey", label: "Path to Purchase" },
  { id: "strategy", label: "Strategy" },
  { id: "glossary", label: "Glossary" },
];

export const pestelData = [
  {
    letter: "P", title: "Political", color: "#C62828",
    sourceIds: ["seia-smi-2025", "irs-itc", "cpuc-nbt"],
    items: [
      { headline: "ITC Section 25D expired 12/31/2025", detail: "OBBBA confirms elimination of customer-owned residential ITC. 2025 installs: 4,647 MWdc (−2% YoY). SEIA/Wood Mackenzie forecast −19% U.S. residential in 2026.", impact: "critical", sourceIds: ["seia-smi-2025", "irs-itc"] },
      { headline: "Tariffs & equipment costs 2025–2026", detail: "SEIA 2025 YiR: steel/copper/aluminum +35% after Section 232 50%; commercial electrical/structural equipment costs +60% Q4/2025. Module and BOS pricing remain installer margin headwinds.", impact: "high", sourceIds: ["seia-smi-2025"] },
      { headline: "NEM 3.0 (Net Billing Tariff)", detail: "Effective 4/2023 at CA IOUs. Hourly export credits are typically far below retail import rates — pushes self-consumption + batteries.", impact: "high", sourceIds: ["cpuc-nbt", "sce-tou"] },
    ],
  },
  {
    letter: "E", title: "Economic", color: "#1565C0",
    sourceIds: ["sce-rates", "sce-tou", "energysage-ca", "seia-smi-2025"],
    items: [
      { headline: "SCE rates & TOU peak", detail: "SCE residential average ~34.5¢/kWh (Rate Advisory 6/2026); Jan 2026 adjustment ~−5%, June 2026 slight decrease. Long-term trend still high; TOU-D summer weekday on-peak ~58¢/kWh (4–9 PM) — stronger sales lever than average rate alone.", impact: "opportunity", sourceIds: ["sce-rates", "sce-tou"] },
      { headline: "California install pricing: ~$2.53/W", detail: "EnergySage (6/2026): ~$2.53/W for 8.7 kW system (~$22,018 before incentives). SEIA Q4/2025 U.S. residential average $3.39/W — CA stays lower due to dense competition.", impact: "high", sourceIds: ["energysage-ca", "seia-smi-2025"] },
      { headline: "Financing & TPO post-ITC", detail: "Solar loans depend on market APR (~5–7% by credit). TPO/PPA still use commercial ITC + safe harbor — SEIA: safe harbor activity supports TPO ITC qualification into ~mid-2030.", impact: "high", sourceIds: ["seia-smi-2025"] },
    ],
  },
  {
    letter: "S", title: "Social", color: "#2E7D32",
    sourceIds: ["brightlocal", "energysage-marketplace", "mckinsey-solar"],
    items: [
      { headline: "Top 3 purchase priorities", detail: "(1) Upfront cost / monthly payment, (2) Credible long-term savings, (3) Installer trust — usually outweigh green slogans (industry surveys & CA sales insight).", impact: "insight", sourceIds: ["mckinsey-solar"] },
      { headline: "'Bill control' mindset", detail: "SCE bill shock + PSPS drive solar/battery research. Grid and wildfire mitigation costs still flow into long-term rates despite short-term rate dips.", impact: "opportunity", sourceIds: ["sce-rates"] },
      { headline: "Online reviews = trust gate", detail: "BrightLocal: most consumers read reviews before local services (~80–90% depending on survey year). Ops target: 50+ Google reviews, 24h response — industry benchmark, not a legal requirement.", impact: "insight", sourceIds: ["brightlocal", "solarreviews"] },
    ],
  },
  {
    letter: "T", title: "Technological", color: "#6A1B9A",
    sourceIds: ["seia-smi-2025", "cpuc-nbt", "ca-energy-2045"],
    items: [
      { headline: "Solar + storage", detail: "2025: solar + storage = 79% of new grid-connected capacity in the U.S. NEM 3.0 makes batteries core to CA proposals. Industry survey (estimate in report): ~73% interested in batteries, ~40% purchase — educate/finance gap.", impact: "critical", sourceIds: ["seia-smi-2025", "cpuc-nbt"] },
      { headline: "450W+ modules & TOPCon/HJT", detail: "Higher wattage reduces roof footprint — important for typical CA homes. Module prices −~10% YoY Q4/2025 (SEIA) but metal/BOS costs up.", impact: "opportunity", sourceIds: ["seia-smi-2025"] },
      { headline: "VPP & CA storage goals", detail: "Utility VPP programs (e.g. SCE) + CA energy planning targets tens of thousands of MW storage by 2045.", impact: "opportunity", sourceIds: ["ca-energy-2045", "sce-rates"] },
    ],
  },
  {
    letter: "E", title: "Environmental", color: "#00695C",
    sourceIds: ["ca-energy-2045", "seia-5m"],
    items: [
      { headline: "100% clean electricity by 2045", detail: "California remains a climate policy leader. Solar is a primary generation source — SEIA: ~13.9M homes equivalent from CA capacity (industry estimate).", impact: "opportunity", sourceIds: ["ca-energy-2045", "seia-5m"] },
      { headline: "Wildfires & PSPS", detail: "PSPS and wildfire liability drive backup demand in SCE/PG&E territory — mitigation costs approved via CPUC rate cases.", impact: "opportunity", sourceIds: ["sce-rates"] },
    ],
  },
  {
    letter: "L", title: "Legal", color: "#E65100",
    sourceIds: ["cpuc-fixed", "cslb", "title24-solar"],
    items: [
      { headline: "CPUC fixed charge & rate design", detail: "Rate design (fixed charges, baselines) affects new solar ROI. SEIA and trade groups continue advocacy — track CPUC decisions each cycle.", impact: "critical", sourceIds: ["cpuc-fixed", "seia-smi-2025"] },
      { headline: "C-10 / C-46 licenses", detail: "Self-performing installers need CSLB licenses. Dealers outsource to licensed EPC (CaliSolar model).", impact: "high", sourceIds: ["cslb", "cali-company"] },
      { headline: "Solar mandate & Title 24", detail: "New CA homes require solar under prior Title 24 cycles; 2025 update emphasizes efficiency + battery encouragement (per CEC schedule).", impact: "opportunity", sourceIds: ["title24-solar"] },
    ],
  },
];

export const porterData = [
  { force: "Industry rivalry", level: 5, levelLabel: "VERY HIGH", color: "#C62828", points: ["Hundreds of installers in California, intense price competition", "CA ~$2.53/W vs ~$3.39/W U.S. average (Q4/2025, SEIA)", "ITC 25D ended → SEIA forecasts −19% residential 2026, consolidation", "EnergySage, SolarReviews increase price transparency"] },
  { force: "Threat of new entrants", level: 3.5, levelLabel: "MED-HIGH", color: "#E65100", points: ["Dealer (no install license): low barriers", "Installer (C-10 required): high barriers", "Roofing, HVAC, electrical expanding into solar", "Post-ITC: some exit, some new entrants"] },
  { force: "Supplier power", level: 3, levelLabel: "MEDIUM", color: "#1565C0", points: ["Panels/inverters: many suppliers → low power", "EPC partner: high power if single EPC dependency", "Financing partners: direct impact on close rate", "Licensed labor: scarce → higher power"] },
  { force: "Buyer power", level: 4.5, levelLabel: "HIGH", color: "#6A1B9A", points: ["Many choices; EnergySage engagement up sharply", "Switching cost ≈ 0 before contract signature", "Post-ITC: stronger homeowner negotiation", "Online reviews empower buyers"] },
  { force: "Substitutes", level: 2, levelLabel: "LOW-MED", color: "#2E7D32", points: ["Grid default; SCE TOU on-peak ~58¢ summer", "Community solar: rent/no suitable roof", "Generators: backup only, weak long-term savings", "Energy efficiency: complements, not replaces solar"] },
];

export const competitorData = [
  { name: "Sunrun", type: "National", installs: "1M+", rating: "3.5★", strengths: "#1 national brand, strongest financing, TPO/PPA leader", weaknesses: "Mixed reviews, high sales pressure", threat: 5 },
  { name: "NRG Clean Power", type: "Regional CA", installs: "N/A", rating: "4.9★", strengths: "#1 California 2026 rankings, top certifications", weaknesses: "Rapid expansion → quality risk", threat: 5 },
  { name: "SunPower/Maxeon", type: "National", installs: "500K+", rating: "3.8★", strengths: "Premium panels, trusted brand", weaknesses: "Highest price, financial volatility", threat: 3 },
  { name: "Stellar Solar", type: "Regional SD", installs: "15,000+", rating: "4.99★", strengths: "Highest CA rating, 25+ years", weaknesses: "Mostly San Diego footprint", threat: 3 },
  { name: "LA Solar Group", type: "Regional LA", installs: "N/A", rating: "3.1★", strengths: "INC 500, Tesla-certified, in-house panels", weaknesses: "Low rating, overpromising", threat: 4 },
  { name: "Momentum Solar", type: "National", installs: "50K+", rating: "3.8★", strengths: "20-year warranty, strong marketing", weaknesses: "ITC misrepresentation, aggressive sales", threat: 3 },
];

export const sectionHints = {
  overview: [
    { term: "Authorized dealer", def: "CaliSolar sells & advises; Simple Power (C-10) installs." },
    { term: "EPC", def: "Install partner — design, equipment, construction." },
    { term: "$/W", def: "~$2.53/W in CA (EnergySage 6/2026)." },
    { term: "SCE", def: "Southern CA utility — avg ~34.5¢/kWh; TOU peak ~58¢ (2026 advisory)." },
  ],
  pestel: [
    { term: "PESTEL", def: "Six macro-environment factors." },
    { term: "ITC / Section 25D", def: "30% residential tax credit — ended 12/2025." },
    { term: "NEM 3.0", def: "Low export credits (~4–10¢/kWh)." },
    { term: "CPUC", def: "Regulates CA utility rates & NEM." },
    { term: "PPA / TPO", def: "Third party owns system — commercial ITC path." },
  ],
  porter: [
    { term: "Porter's Five Forces", def: "Five competitive pressure dimensions." },
    { term: "Consolidation", def: "Market concentration after ITC sunset." },
    { term: "EnergySage", def: "Quote marketplace — raises buyer power." },
    { term: "Switching cost", def: "≈ 0 before signing a contract." },
  ],
  competitors: [
    { term: "TPO", def: "Third-party ownership (e.g. Sunrun) — they own the system; customer pays lease; often uses commercial ITC." },
    { term: "PPA", def: "Pay per kWh from third-party-owned system; low upfront; read contract escalator." },
    { term: "National vs Regional", def: "National: scale, financing, brand. Regional: local trust, reviews, geography (NRG CA, Stellar SD)." },
    { term: "Overpromising", def: "Inflated ITC or savings claims — distrust; weak competitors show low ratings." },
  ],
  journey: [
    { term: "Path to Purchase", def: "7 stages: Trigger → … → Advocate." },
    { term: "Bill Shock / PSPS", def: "Main triggers: high bills & outages." },
    { term: "PTO", def: "Utility permission to operate (3–12 weeks)." },
    { term: "EnergySage", def: "Compare 3–5 quotes online at Compare stage." },
    { term: "WOM", def: "Neighbor referrals — highest conversion." },
  ],
  consumer: [
    { term: "EnergySage / SolarReviews", def: "Research & price comparison channels." },
    { term: "PPA / TPO vs Loan", def: "No ownership vs solar-owned (LBNL home-value literature, market-dependent)." },
    { term: "SGIP", def: "CA battery rebate program." },
    { term: "Social proof", def: "Reviews drive trust before signing." },
    { term: "NEM 3.0", def: "Storage nearly required." },
  ],
  strategy: [
    { term: "Social proof", def: "Target 50+ Google reviews." },
    { term: "Post-ITC messaging", def: "Lead with TPO/PPA & SCE rates, not 25D." },
    { term: "Bundling", def: "Solar + battery under NEM 3.0." },
    { term: "EnergySage", def: "List on marketplace — priority action." },
    { term: "WOM / Referral", def: "$250–500 referral incentive." },
  ],
};

export const journeyStages = [
  {
    num: "01", title: "TRIGGER", subtitle: "Need activation", duration: "Immediate",
    icon: "⚡", color: "#C62828", bgColor: "rgba(198,40,40,0.08)",
    triggers: [
      { label: "Bill shock", desc: "SCE bill $300–500+ in summer, peak ~70¢/kWh cited in sales", pct: "45%" },
      { label: "Neighbor installs solar", desc: "See panels → curiosity → ask around", pct: "25%" },
      { label: "Outage / wildfire", desc: "PSPS or multi-day outage", pct: "20%" },
      { label: "News / social", desc: "Rate hikes, ITC expiration headlines", pct: "10%" },
    ],
    caliBehavior: "California homeowners trigger stronger than other states: electricity ~2× national average and frequent wildfire-related events.",
  },
  {
    num: "02", title: "RESEARCH", subtitle: "Self-education", duration: "3–14 days",
    icon: "🔍", color: "#1565C0", bgColor: "rgba(21,101,192,0.08)",
    triggers: [
      { label: "Google search", desc: "'solar cost California', 'is solar worth it 2026', 'NEM 3.0'", pct: "72%" },
      { label: "YouTube / TikTok", desc: "'how solar works', myth-busting videos", pct: "38%" },
      { label: "Friends / neighbors", desc: "Word of mouth, real experiences", pct: "35%" },
      { label: "Blogs / news", desc: "SCE rate news, 2026 solar guides", pct: "28%" },
    ],
    caliBehavior: "Fully homeowner-driven. They avoid salespeople early. Content marketing and SEO decide who appears first.",
  },
  {
    num: "03", title: "COMPARE", subtitle: "Quote comparison", duration: "7–21 days",
    icon: "⚖️", color: "#6A1B9A", bgColor: "rgba(106,27,154,0.08)",
    triggers: [
      { label: "EnergySage marketplace", desc: "Compare 3–5 online quotes, often ~20% lower", pct: "45%" },
      { label: "Google 'solar near me'", desc: "Google Reviews, Yelp, BBB", pct: "35%" },
      { label: "SolarReviews.com", desc: "Installer ratings & detail", pct: "25%" },
      { label: "Direct referral", desc: "1–2 referred companies", pct: "20%" },
    ],
    caliBehavior: "Typically 3–5 quotes. ~88% trust online reviews like referrals (industry benchmark). No EnergySage/Google presence = invisible.",
  },
  {
    num: "04", title: "EVALUATE", subtitle: "Deep evaluation", duration: "3–10 days",
    icon: "📋", color: "#2E7D32", bgColor: "rgba(46,125,50,0.08)",
    triggers: [
      { label: "Total cost & monthly payment", desc: "#1 — 'What do I pay per month?'", pct: null },
      { label: "Long-term savings", desc: "ROI must be realistic, no overpromise", pct: null },
      { label: "Installer credibility", desc: "License, reviews, tenure, NABCEP", pct: null },
      { label: "Warranty & support", desc: "25-year product, transferable, monitoring", pct: null },
    ],
    caliBehavior: "Post-ITC: financing (PPA, $0 down) matters more than ever. Battery options weighed heavily under NEM 3.0.",
  },
  {
    num: "05", title: "DECIDE", subtitle: "Contract signing", duration: "1–5 days",
    icon: "✍️", color: "#1f4ab8", bgColor: "rgba(31,74,184,0.08)",
    triggers: [
      { label: "Financing fit", desc: "PPA $0 down or acceptable loan terms", pct: null },
      { label: "Trust threshold", desc: "Strong reviews + transparent rep", pct: null },
      { label: "Urgency", desc: "Rates rising, incentives ending", pct: null },
      { label: "Final validation", desc: "Last call — clear answers", pct: null },
    ],
    caliBehavior: "Trigger → decision: 2–8 weeks. Referral leads faster (1–3 weeks). Marketplace leads slower (4–8 weeks).",
  },
  {
    num: "06", title: "INSTALL", subtitle: "Install & PTO", duration: "3–12 weeks",
    icon: "🔧", color: "#00695C", bgColor: "rgba(0,105,92,0.08)",
    triggers: [
      { label: "Peak anxiety", desc: "Timeline, quality, roof concerns", pct: null },
      { label: "PTO wait", desc: "System built but not yet operating", pct: null },
      { label: "Proactive updates", desc: "Silence → regret and anger", pct: null },
      { label: "CaliSolar edge", desc: "Single point of contact + 24/7 monitoring", pct: null },
    ],
    caliBehavior: "Experience here drives reviews and referrals. Good install → advocacy. Bad → 1★ reviews and anti-referrals.",
  },
  {
    num: "07", title: "ADVOCATE", subtitle: "Referrals & reviews", duration: "Ongoing",
    icon: "📣", color: "#E65100", bgColor: "rgba(230,81,0,0.08)",
    triggers: [
      { label: "Write reviews", desc: "Google, Yelp, SolarReviews — first 7 days", pct: null },
      { label: "Refer neighbors", desc: "WOM = highest-quality leads", pct: null },
      { label: "Social sharing", desc: "Monitoring app, bill savings", pct: null },
      { label: "Referral program", desc: "Incentives close the growth loop", pct: null },
    ],
    caliBehavior: "Well-managed journey pushes customers into advocacy. Poor journey loses reviews and referrals.",
  },
];

export const TAM_CA_HOUSEHOLDS = 4.0;

export const segments = [
  { name: "The Bill Shocked", pct: "40–45%", sizeCA: "~1.6–1.8M households", tag: "PRIMARY", tagColor: "#1f4ab8", profile: "Homeowner 35–55, bills $200–500+/mo (SCE territory)", trigger: "Summer bill shock, TOU on-peak ~58¢/kWh", research: "Google 'why is my electric bill so high' → 'solar cost CA'", financing: "$0 down, PPA or loan — immediate savings", barrier: "Fear of sales tricks — needs reviews & transparent pricing", channel: "Google Ads, bill calculator, SCE rate content" },
  { name: "The Resilience Seeker", pct: "20–25%", sizeCA: "~0.8–1.0M households", tag: "GROWING", tagColor: "#2E7D32", profile: "40–65, PG&E/SCE PSPS/wildfire zones", trigger: "PSPS or multi-day outages", research: "'solar battery backup', SGIP, Tesla Powerwall", financing: "Cash/loan with battery; SGIP reduces capex", barrier: "Battery cost & technical complexity", channel: "Backup content, post-PSPS referrals" },
  { name: "The Smart Investor", pct: "15–20%", sizeCA: "~0.6–0.8M households", tag: "ANALYTICAL", tagColor: "#1565C0", profile: "30–50, compares ROI/NPV carefully", trigger: "Lock energy cost vs long-term utility inflation", research: "EnergySage 3–5 quotes, SolarReviews, LBNL home-value studies", financing: "Cash/loan solar-owned (literature ~4–7% home premium, market-dependent)", barrier: "Post-ITC needs honest financial models", channel: "EnergySage, SEO calculators, transparent proposals" },
  { name: "The Green Conscious", pct: "10–15%", sizeCA: "~0.4–0.6M households", tag: "VALUES", tagColor: "#00695C", profile: "25–45, often EV owners", trigger: "Sustainability + savings", research: "Green blogs, EV groups, social", financing: "Flexible; often bundle EV charger + solar", barrier: "Still needs viable ROI post-ITC", channel: "Social, EV dealer partnerships" },
  { name: "The New Homebuyer", pct: "5–10%", sizeCA: "~0.2–0.4M households", tag: "EMERGING", tagColor: "#6A1B9A", profile: "New CA homeowner (Title 24 / mandate awareness)", trigger: "First SCE bill + realtor/neighbor", research: "Realtor, Google; fast decision if trust is high", financing: "PPA/loan needs education", barrier: "Long-term commitment fear", channel: "Realtor partners, HOA communities" },
];

export const infoSources = [
  { rank: "01", name: "Google Search", importance: 5, desc: "Channel #1 — 72% start here", detail: "'solar cost California', 'best solar company near me', 'is solar worth it 2026'. Even with referrals, homeowners Google the brand + 'reviews' before submitting a form." },
  { rank: "02", name: "Online Reviews", importance: 5, desc: "Trust filter", detail: "Google Business (primary), Yelp, SolarReviews, EnergySage. ~88% trust on par with referrals (benchmark). Under 50 reviews = 'risky'. 50+ ≈ 3× leads. Respond to all reviews within 24h." },
  { rank: "03", name: "Referral / WOM", importance: 4.5, desc: "Highest conversion", detail: "Neighbors, friends, realtors. Referral starts the story; Google writes the middle. Weak digital presence undermines referrals." },
  { rank: "04", name: "EnergySage", importance: 4.5, desc: "#1 national marketplace", detail: "Sharp engagement growth. 10M+ users. Compare quotes from 500+ installers. Often ~20% below direct. Missing listing = lose Smart Investor & Bill Shocked segments." },
  { rank: "05", name: "YouTube / TikTok", importance: 3.5, desc: "Education & awareness", detail: "'How solar works', 'NEM 3.0 explained'. Long-term trust. Strong for Green Conscious & New Homebuyer." },
  { rank: "06", name: "Facebook / IG Ads", importance: 3, desc: "Lead volume", detail: "Higher cost-per-lead but scale. Target homeowners by location, income, ownership. Needs strong landing + calculator." },
  { rank: "07", name: "Door-to-door", importance: 3, desc: "Local trust", detail: "Short window when neighbors just went solar. 2026: data-driven canvassing + CRM. Industry reputation hurt by aggressive tactics." },
  { rank: "08", name: "Utility company", importance: 2, desc: "Passive influence", detail: "35% want utility installer recommendations. SCE/PG&E don't endorse, but rate pages are research entry points." },
];

export const caMarketSizingLabels = {
  title: "California market sizing",
  intro: "Figures below estimate segment scale (households/market), not CaliSolar revenue share.",
  rows: [
    ["Total CA housing units", "housingUnits"],
    ["Owner-occupied households", "ownerOccupied"],
    ["Rooftop-suitable households", "rooftopSuitable"],
    ["Homes with solar (interconnected)", "withSolar"],
    ["Remaining TAM (not yet solar)", "remainingTam"],
    ["U.S. residential (2025)", "annualResidentialMW"],
    ["U.S. residential forecast 2026", "forecast2026"],
  ],
};
