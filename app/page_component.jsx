"use client";
import { useState, useEffect } from "react";
import { masterGlossary } from "./master-glossary";
import { reportSources, caMarketSizing } from "./report-sources";
import {
  sections,
  pestelData,
  porterData,
  competitorData,
  sectionHints,
  journeyStages,
  TAM_CA_HOUSEHOLDS,
  segments,
  infoSources,
  caMarketSizingLabels,
} from "./report-content-en";
import { calisolarTheme as t, fontStylesheet } from "./calisolar-theme";

const sourceById = Object.fromEntries(reportSources.map((s) => [s.id, s]));

function SourceRefs({ ids }) {
  if (!ids?.length) return null;
  return (
    <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(78, 99, 148, 0.85)", lineHeight: 1.6 }}>
      <span style={{ fontWeight: 700, letterSpacing: "0.3px" }}>Sources: </span>
      {ids.map((id, i) => {
        const s = sourceById[id];
        if (!s) return null;
        return (
          <span key={id}>
            {i > 0 && " · "}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: t.colors.accent, textDecoration: "none", fontWeight: 600 }}>
                {s.label} ({s.accessed})
              </a>
            ) : (
              <span>{s.label} — {s.note || s.title}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function SectionSources({ ids, title = "Sources — this section" }) {
  const items = ids.map((id) => sourceById[id]).filter(Boolean);
  if (!items.length) return null;
  return (
    <div style={{
      marginTop: "20px",
      padding: "14px 18px",
      borderRadius: "10px",
      background: t.colors.white,
      border: `1px solid ${t.colors.lineSoft}`,
      boxShadow: t.colors.cardShadow,
    }}>
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: t.colors.muted, marginBottom: "8px" }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: t.colors.muted, lineHeight: 1.65 }}>
        {items.map((s) => (
          <li key={s.id} style={{ marginBottom: "4px" }}>
            {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: t.colors.accent, textDecoration: "none", fontWeight: 600 }}>{s.title}</a> : s.title}
            <span style={{ color: "rgba(78, 99, 148, 0.65)" }}> — {s.label}, accessed {s.accessed}</span>
            {s.note && <span style={{ display: "block", fontSize: "11px", marginTop: "2px" }}>{s.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaMarketSizingPanel({ card, h3, body }) {
  const rows = caMarketSizingLabels.rows.map(([label, key]) => [label, caMarketSizing[key]]);
  return (
    <div style={{ ...card, borderLeft: `3px solid ${t.colors.accent}`, marginBottom: "28px" }}>
      <h3 style={{ ...h3, fontSize: "16px" }}>{caMarketSizingLabels.title} ({caMarketSizing.asOf})</h3>
      <p style={{ ...body, marginBottom: "16px" }}>
        Figures below estimate <strong style={{ color: t.colors.accent }}>segment scale</strong> (households/market), not CaliSolar revenue share.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
        {rows.map(([label, d]) => (
          <div key={label} style={{ padding: "12px 14px", borderRadius: "10px", background: t.colors.bgAlt, border: `1px solid ${t.colors.lineSoft}` }}>
            <div style={{ fontSize: "11px", color: t.colors.muted, marginBottom: "4px" }}>{label}</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: t.colors.ink }}>{d.value}</div>
            <div style={{ fontSize: "11px", color: t.colors.muted, marginTop: "4px", lineHeight: 1.5 }}>{d.note}</div>
          </div>
        ))}
      </div>
      <SourceRefs ids={["census-ca", "ca-dgstats", "seia-smi-2025"]} />
    </div>
  );
}

function Badge({ type, children }) {
  const c = { critical: "#C62828", high: "#E65100", opportunity: "#2E7D32", insight: "#1565C0" };
  return <span style={{ background: c[type] || c.high, color: "#fff", padding: "2px 10px", borderRadius: "3px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>{children}</span>;
}

function ForceBar({ level, color }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {[1,2,3,4,5].map(i => <div key={i} style={{ width: "28px", height: "10px", borderRadius: "2px", background: i <= Math.round(level) ? color : "rgba(14, 27, 71, 0.12)" }} />)}
      <span style={{ marginLeft: "8px", fontSize: "12px", fontWeight: 700, color }}>{level}/5</span>
    </div>
  );
}

function ThreatDots({ level }) {
  return <div style={{ display: "flex", gap: "3px" }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i <= level ? (level >= 4 ? "#C62828" : "#E65100") : "rgba(14, 27, 71, 0.12)" }} />)}</div>;
}

function SectionTermHint({ terms }) {
  const jumpToGlossary = () => document.getElementById("glossary")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <div style={{
      background: t.colors.white,
      border: `1px solid ${t.colors.lineSoft}`,
      borderRadius: t.radius.md,
      padding: "12px 16px",
      marginBottom: "20px",
      boxShadow: t.colors.cardShadow,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: t.colors.muted }}>Terms in this section</span>
        <button type="button" onClick={jumpToGlossary} style={{ background: "none", border: "none", color: t.colors.accent, fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>Full glossary →</button>
      </div>
      <div style={{ fontSize: "12px", color: t.colors.muted, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "4px" }}>
        {terms.map((term, i) => (
          <div key={i}><strong style={{ color: t.colors.accent, fontWeight: 600 }}>{term.term}</strong> — {term.def}</div>
        ))}
      </div>
    </div>
  );
}

function TermGlossary({ title = "Glossary — full report", terms }) {
  return (
    <div style={{
      background: "rgba(31, 74, 184, 0.06)",
      border: `1px solid rgba(31, 74, 184, 0.18)`,
      borderRadius: t.radius.md,
      padding: "20px 24px",
      marginBottom: "24px",
    }}>
      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: t.colors.accent, marginBottom: "14px" }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px 32px" }}>
        {terms.map((term, i) => (
          <div key={i} style={{ paddingBottom: "4px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: t.colors.accent }}>{term.term}</span>
            {term.en && <span style={{ fontSize: "11px", color: t.colors.muted, marginLeft: "6px" }}>{term.en}</span>}
            <p style={{ fontSize: "13px", color: t.colors.ink, lineHeight: 1.75, margin: "8px 0 0", opacity: 0.88 }}>{term.def}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("overview");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.1, 0.25] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sectionWrap = { scrollMarginTop: "88px", marginBottom: "64px", paddingTop: "8px" };
  const card = {
    background: t.colors.white,
    border: `1px solid ${t.colors.lineSoft}`,
    borderRadius: t.radius.md,
    padding: "24px",
    marginBottom: "16px",
    boxShadow: t.colors.cardShadow,
  };
  const h2 = { fontFamily: t.fonts.display, fontSize: "28px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px", color: t.colors.ink };
  const h3 = { fontFamily: t.fonts.display, fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: t.colors.ink };
  const body = { fontSize: "14px", lineHeight: 1.62, color: t.colors.muted };

  const pageBg = {
    fontFamily: t.fonts.body,
    color: t.colors.ink,
    minHeight: "100vh",
    background: `radial-gradient(circle at 12% -12%, rgba(31, 74, 184, 0.14), transparent 40%), radial-gradient(circle at 100% 16%, rgba(16, 47, 125, 0.12), transparent 44%), ${t.colors.bg}`,
  };

  return (
    <div style={pageBg}>
      <link href={fontStylesheet} rel="stylesheet" />

      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(11px)",
        background: "rgba(245, 248, 255, 0.92)",
        borderBottom: `1px solid ${t.colors.lineSoft}`,
      }}>
        <div style={{ maxWidth: t.maxWidth, margin: "0 auto", padding: "14px 28px" }}>
          <a href={t.siteUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", lineHeight: 0 }}>
            <img src={t.logoUrl} alt="CaliSolar" style={{ height: "40px", width: "auto" }} />
          </a>
        </div>
      </header>

      <div style={{ padding: "40px 28px 28px", borderBottom: `1px solid ${t.colors.lineSoft}` }}>
        <div style={{ maxWidth: t.maxWidth, margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: t.colors.accentSoft, margin: "0 0 12px" }}>
            Powering Homes with Better Solar · Industry Research
          </p>
          <h1 style={{ fontFamily: t.fonts.display, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.12, margin: "0 0 12px", color: t.colors.ink }}>
            California Residential Solar<br /><span style={{ color: t.colors.accent }}>Industry Analysis 2026</span>
          </h1>
          <p style={{ fontSize: "15px", color: t.colors.muted, margin: "0 0 8px", maxWidth: "640px" }}>
            Internal research: PESTEL, Porter, consumer deep dive, and path to purchase — aligned with the post-ITC California market.
          </p>
          <p style={{ fontSize: "12px", color: t.colors.accent, margin: 0, fontWeight: 500 }}>
            Data verified: June 2026 — SEIA, SCE, EnergySage, Census, California DGStats
          </p>
        </div>
      </div>

      <div style={{ position: "sticky", top: "68px", zIndex: 30, background: "rgba(245, 248, 255, 0.95)", borderBottom: `1px solid ${t.colors.lineSoft}`, padding: "0 28px", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: t.maxWidth, margin: "0 auto", display: "flex", gap: "4px", overflowX: "auto" }}>
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToSection(s.id)}
              style={{
                background: active === s.id ? "rgba(31, 74, 184, 0.1)" : "transparent",
                border: "none",
                color: active === s.id ? t.colors.accent : t.colors.muted,
                padding: "14px 14px",
                fontSize: "13px",
                fontWeight: active === s.id ? 700 : 500,
                cursor: "pointer",
                borderBottom: active === s.id ? `2px solid ${t.colors.accent}` : "2px solid transparent",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: t.maxWidth, margin: "0 auto", padding: "40px 28px 80px" }}>

        {/* ===== OVERVIEW ===== */}
        <section id="overview" style={sectionWrap}>
          <h2 style={h2}>CaliSolar Overview & Value Chain</h2>
          <SectionTermHint terms={sectionHints.overview} />
          <p style={{ ...body, marginBottom: "24px" }}>CaliSolar operates as an <strong style={{ color: "#1f4ab8" }}>authorized dealer</strong> — sales, design, financing, and customer support. Installations are performed by Simple Power (CA C-10 #1,111,652).</p>
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(14, 27, 71, 0.1)", background: "#ffffff" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(78, 99, 148, 0.85)" }}>Residential Solar Value Chain</span>
            </div>
            <div style={{ padding: "24px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "center" }}>
              {["Panel manufacturer", "Distribution", "Dealer/Installer", "Financing", "O&M"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, background: i === 2 ? "rgba(31,74,184,0.15)" : "rgba(14, 27, 71, 0.06)", border: i === 2 ? "1px solid #1f4ab8" : "1px solid rgba(14, 27, 71, 0.1)", color: i === 2 ? "#1f4ab8" : "rgba(78, 99, 148, 0.92)" }}>
                    {s}{i === 2 && <span style={{ display: "block", fontSize: "10px", fontWeight: 400, opacity: 0.7 }}>← CaliSolar</span>}
                  </div>
                  {i < 4 && <span style={{ color: "rgba(78, 99, 148, 0.55)", fontSize: "18px" }}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "24px" }}>
            {[{ n: "132+", l: "Installations", s: "CaliSolar internal" }, { n: "$2.53", l: "$/W CA (ES)", s: "vs $3.39 U.S. SEIA" }, { n: "34.5¢", l: "SCE avg/kWh", s: "TOU peak ~58¢" }, { n: "−19%", l: "US res. 2026", s: "SEIA forecast" }].map((x, i) => (
              <div key={i} style={card}><div style={{ fontSize: "28px", fontWeight: 800, color: i === 3 ? "#C62828" : t.colors.accent, letterSpacing: "-1px", fontFamily: t.fonts.display }}>{x.n}</div><div style={{ fontSize: "13px", fontWeight: 600, color: t.colors.ink, marginTop: "4px" }}>{x.l}</div><div style={{ fontSize: "11px", color: t.colors.muted, marginTop: "2px" }}>{x.s}</div></div>
            ))}
          </div>
          <SourceRefs ids={["cali-company", "energysage-ca", "seia-smi-2025", "sce-rates"]} />
        </section>

        {/* ===== PESTEL ===== */}
        <section id="pestel" style={sectionWrap}>
          <h2 style={h2}>PESTEL Analysis</h2>
          <SectionTermHint terms={sectionHints.pestel} />
          <p style={{ ...body, marginBottom: "24px" }}>Six macro factors shaping California residential solar in 2026.</p>
          {pestelData.map((cat, ci) => (
            <div key={ci} style={{ ...card, borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, flexShrink: 0 }}>{cat.letter}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: "16px", fontWeight: 700 }}>{cat.title}</div><div style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.75)" }}>{cat.items.length} factors</div></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{cat.items.map((it, ii) => (
                <div key={ii} style={{ padding: "16px", borderRadius: "10px", background: "rgba(14, 27, 71, 0.05)", border: "1px solid rgba(14, 27, 71, 0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}><Badge type={it.impact}>{it.impact === "critical" ? "Critical" : it.impact === "high" ? "High" : it.impact === "opportunity" ? "Opportunity" : "Insight"}</Badge><span style={{ fontSize: "14px", fontWeight: 700 }}>{it.headline}</span></div>
                  <p style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.7, margin: 0 }}>{it.detail}</p>
                  {it.sourceIds && <SourceRefs ids={it.sourceIds} />}
                </div>
              ))}</div>
              {cat.sourceIds && <SectionSources ids={cat.sourceIds} title={`Sources — ${cat.title}`} />}
            </div>
          ))}
        </section>

        {/* ===== PORTER ===== */}
        <section id="porter" style={sectionWrap}>
          <h2 style={h2}>Porter's Five Forces</h2>
          <SectionTermHint terms={sectionHints.porter} />
          <p style={{ ...body, marginBottom: "24px" }}>Five competitive forces in California residential solar.</p>
          {porterData.map((f, fi) => (
            <div key={fi} style={{ ...card, borderLeft: `3px solid ${f.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{f.force}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><ForceBar level={f.level} color={f.color} /><span style={{ fontSize: "11px", fontWeight: 700, color: f.color }}>{f.levelLabel}</span></div>
              </div>
              <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>{f.points.map((p, pi) => <li key={pi} style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.6 }}>{p}</li>)}</ul>
            </div>
          ))}
          <SectionSources ids={["seia-smi-2025", "energysage-ca", "energysage-marketplace", "solarreviews"]} />
        </section>

        {/* ===== COMPETITORS ===== */}
        <section id="competitors" style={sectionWrap}>
          <h2 style={h2}>Competitive Landscape</h2>
          <SectionTermHint terms={sectionHints.competitors} />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {competitorData.map((c, ci) => (
              <div key={ci} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div><div style={{ fontSize: "16px", fontWeight: 700 }}>{c.name}</div><div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}><span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "3px", background: "rgba(14, 27, 71, 0.1)", color: "rgba(78, 99, 148, 0.85)", fontWeight: 600 }}>{c.type}</span><span style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.75)" }}>{c.rating}</span></div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: "10px", color: "rgba(78, 99, 148, 0.75)", marginBottom: "4px" }}>Threat level</div><ThreatDots level={c.threat} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#2E7D32", letterSpacing: "0.5px", marginBottom: "4px" }}>STRENGTHS</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.6 }}>{c.strengths}</div></div>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#C62828", letterSpacing: "0.5px", marginBottom: "4px" }}>WEAKNESSES</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.6 }}>{c.weaknesses}</div></div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(78, 99, 148, 0.7)", marginTop: "8px" }}>Ratings/threat levels: Q2/2026 snapshot — verify on SolarReviews/Google before sales battlecards.</p>
          <SectionSources ids={["solarreviews", "energysage-marketplace", "seia-smi-2025"]} />
        </section>

        {/* ===== CONSUMER DEEP DIVE ===== */}
        <section id="consumer" style={sectionWrap}>
          <h2 style={h2}>Consumer Deep Dive</h2>
          <SectionTermHint terms={sectionHints.consumer} />
          <CaMarketSizingPanel card={card} h3={h3} body={body} />

          {/* INFO SOURCES */}
          <h3 style={{ ...h3, marginTop: "8px" }}>Information sources (ranked)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
            {infoSources.map((src, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "14px", background: "rgba(31,74,184,0.1)", border: "1px solid rgba(31,74,184,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#1f4ab8", flexShrink: 0 }}>{src.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#0e1b47" }}>{src.name}</span>
                      <span style={{ fontSize: "12px", color: "#1f4ab8" }}>{"★".repeat(src.importance)}{"☆".repeat(5 - src.importance)}</span>
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(78, 99, 148, 0.85)", marginBottom: "6px" }}>{src.desc}</div>
                    <div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.88)", lineHeight: 1.6 }}>{src.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DECISION FACTORS */}
          <h3 style={h3}>Decision factors when choosing an installer</h3>
          <div style={{ ...card, marginBottom: "32px" }}>
            {[
              { rank: 1, factor: "Total cost & monthly payment", detail: "'What do I pay per month?' often beats sticker price. Post-ITC: PPA/TPO $0 down wins.", pct: 92 },
              { rank: 2, factor: "Credible long-term savings", detail: "ROI must be realistic. Overpromise = #1 driver of bad reviews and industry distrust.", pct: 87 },
              { rank: 3, factor: "Installer credibility", detail: "CSLB license, years in business, NABCEP, 4.5+★ reviews. Below 4.0★ = red flag.", pct: 83 },
              { rank: 4, factor: "Warranty & after-sales support", detail: "25-year panel, 10-year workmanship. Fully transferable on home sale = strong hook.", pct: 78 },
              { rank: 5, factor: "Financing flexibility", detail: "PPA vs loan vs cash vs prepaid TPO. More options → higher close rate.", pct: 74 },
              { rank: 6, factor: "Install timeline", detail: "3–6 weeks vs 3–6 months. Fast proposals = clear edge.", pct: 65 },
              { rank: 7, factor: "Battery / storage", detail: "~73% want, ~40% buy (industry benchmark). NEM 3.0 makes storage nearly mandatory. SGIP when eligible.", pct: 60 },
              { rank: 8, factor: "Home value impact", detail: "Solar-owned: LBNL/Berkeley literature shows premiums (%, market-dependent). TPO/lease usually no asset transfer. Key for Smart Investor.", pct: 45 },
            ].map((f, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 7 ? "1px solid rgba(14, 27, 71, 0.06)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: i < 3 ? "#1f4ab8" : "rgba(14, 27, 71, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: i < 3 ? "#f5f8ff" : "rgba(78, 99, 148, 0.75)", flexShrink: 0 }}>{f.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0e1b47" }}>{f.factor}</div>
                    <div style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.85)", lineHeight: 1.5, marginTop: "2px" }}>{f.detail}</div>
                  </div>
                  <div style={{ width: "60px", textAlign: "right" }}>
                    <div style={{ height: "6px", borderRadius: "3px", background: "rgba(14, 27, 71, 0.1)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${f.pct}%`, background: i < 3 ? "#1f4ab8" : "rgba(31,74,184,0.4)", borderRadius: "3px" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "rgba(78, 99, 148, 0.65)", marginTop: "2px" }}>{f.pct}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEGMENTS */}
          <h3 style={h3}>California customer segments 2026</h3>
          <p style={{ ...body, marginBottom: "16px" }}>
            <strong style={{ color: "#1f4ab8" }}>%</strong> = persona share of TAM ~{TAM_CA_HOUSEHOLDS}M households without solar.
            <strong style={{ color: "#1f4ab8" }}> CA size</strong> = % × TAM (rounded; may not sum to 100% due to behavioral overlap).
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {segments.map((seg, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "3px", background: seg.tagColor, fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px" }}>{seg.tag}</span>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#0e1b47" }}>{seg.name}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: seg.tagColor, marginLeft: "auto" }}>{seg.pct} · {seg.sizeCA}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {[{ l: "Profile", v: seg.profile }, { l: "Trigger", v: seg.trigger }, { l: "Research behavior", v: seg.research }, { l: "Financing preference", v: seg.financing }, { l: "Main barrier", v: seg.barrier }, { l: "Best channel", v: seg.channel }].map((f, fi) => (
                    <div key={fi}><div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(78, 99, 148, 0.7)", letterSpacing: "0.5px", marginBottom: "3px", textTransform: "uppercase" }}>{f.l}</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.5 }}>{f.v}</div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* POST INSTALL HABITS */}
          <h3 style={h3}>Post-install behavior</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", marginBottom: "32px" }}>
            {[
              { title: "Monitoring obsession", desc: "Daily app checks (Enphase/SolarEdge/Tesla) for 1–3 months. Top question: 'Is it working?' Fades after ~6 months." },
              { title: "Usage shifting", desc: "Run loads midday (laundry, EV, AC) when solar produces. Avoid 4–9 PM peak. Saves ~$100–250/mo." },
              { title: "Battery becomes lifeline", desc: "Under NEM 3.0: no battery = export ~$0.04–0.10/kWh. With battery = self-use at ~70¢/kWh peak. Gap: ~73% want, ~40% buy (benchmark)." },
              { title: "Whole-home thinking", desc: "Solar → battery → heat pump → EV charger → induction. Winners treat the home as one energy system." },
              { title: "Review window: 7 days", desc: "Peak satisfaction right after PTO. Ask for reviews within 7 days for best 5★ rate. After 30 days is too late." },
              { title: "Referral happens naturally", desc: "Neighbors ask → show monitoring app → refer. Incentives speed it up. Highest conversion of all lead sources." },
            ].map((h, i) => (
              <div key={i} style={card}><div style={{ fontSize: "14px", fontWeight: 700, color: "#0e1b47", marginBottom: "6px" }}>{h.title}</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.88)", lineHeight: 1.6 }}>{h.desc}</div></div>
            ))}
          </div>

          {/* WHAT THEY HATE / LOVE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={card}>
              <h3 style={{ ...h3, color: "#C62828" }}>❌ Homeowners hate</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...body }}>
                <div>• <strong>Aggressive sales:</strong> deceptive door-knocking, cold calls, pressure</div>
                <div>• <strong>Overpromise:</strong> misrepresent ITC, inflate savings, fake urgency</div>
                <div>• <strong>Hidden fees:</strong> bait-and-switch pricing, unclear contracts</div>
                <div>• <strong>Ghost post-sale:</strong> disappear after signing, no support</div>
                <div>• <strong>Slow timeline:</strong> promised 4 weeks → drags 4 months</div>
              </div>
            </div>
            <div style={card}>
              <h3 style={{ ...h3, color: "#2E7D32" }}>✅ Homeowners want</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...body }}>
                <div>• <strong>Transparency:</strong> clear pricing, no surprises, realistic savings</div>
                <div>• <strong>Single point of contact</strong> start to finish (CaliSolar offers this)</div>
                <div>• <strong>Clear timeline</strong> with proactive updates</div>
                <div>• <strong>Post-install support:</strong> 24/7 monitoring, responsive (CaliSolar offers this)</div>
                <div>• <strong>Validation:</strong> proof the system performs as promised</div>
              </div>
            </div>
          </div>
          <SectionSources ids={["census-ca", "ca-dgstats", "energysage-marketplace", "brightlocal", "berkeley-lbnl", "sgip"]} />
        </section>

        {/* ===== PATH TO PURCHASE INFOGRAPHIC ===== */}
        <section id="journey" style={sectionWrap}>
          <h2 style={h2}>Path to Purchase</h2>
          <SectionTermHint terms={sectionHints.journey} />
          <p style={{ ...body, marginBottom: "8px" }}>Seven stages from need activation to advocate. Total timeline: 2–8 weeks (trigger → decision) + 3–12 weeks (install → PTO).</p>
          <p style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.7)", marginBottom: "32px" }}>Scroll for stage detail — or use the nav above to jump.</p>

          {/* VISUAL JOURNEY LINE */}
          <div style={{ position: "relative", marginBottom: "40px" }}>
            <div style={{ position: "absolute", top: "24px", left: "24px", right: "24px", height: "2px", background: "linear-gradient(90deg, #C62828, #1565C0, #6A1B9A, #2E7D32, #1f4ab8, #00695C, #E65100)", opacity: 0.3 }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {journeyStages.map((s, i) => (
                <div key={i} style={{ textAlign: "center", flex: 1, padding: "0 2px" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%", margin: "0 auto 8px",
                    background: `${s.color}22`,
                    border: `2px solid ${s.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px",
                  }}>{s.icon}</div>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: s.color, letterSpacing: "0.5px" }}>{s.num}</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "#0e1b47", marginTop: "2px" }}>{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          {journeyStages.map((stage, si) => (
            <div key={si} style={{ ...card, borderLeft: `3px solid ${stage.color}`, background: stage.bgColor }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "32px" }}>{stage.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: stage.color, letterSpacing: "1px" }}>{stage.num}</span>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#0e1b47" }}>{stage.title}</h3>
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.85)", marginTop: "2px" }}>{stage.subtitle}</div>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: "20px", background: "rgba(14, 27, 71, 0.1)", fontSize: "12px", fontWeight: 600, color: "rgba(78, 99, 148, 0.85)" }}>⏱ {stage.duration}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                {stage.triggers.map((t, ti) => (
                  <div key={ti} style={{ padding: "14px", borderRadius: "10px", background: "rgba(14, 27, 71, 0.04)", border: "1px solid rgba(14, 27, 71, 0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0e1b47" }}>{t.label}</span>
                      {t.pct && <span style={{ fontSize: "12px", fontWeight: 800, color: stage.color }}>{t.pct}</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.85)", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "12px 16px", borderRadius: "10px", background: `${stage.color}15`, border: `1px solid ${stage.color}30` }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: stage.color, letterSpacing: "0.5px", marginBottom: "4px" }}>CALIFORNIA INSIGHT</div>
                <div style={{ fontSize: "13px", color: "#4e6394", lineHeight: 1.6 }}>{stage.caliBehavior}</div>
              </div>
            </div>
          ))}

          {/* TIMELINE SUMMARY */}
          <div style={{ ...card, marginTop: "24px" }}>
            <h3 style={{ ...h3, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(78, 99, 148, 0.85)" }}>Combined timeline</h3>
            <div style={{ display: "flex", gap: "4px", alignItems: "stretch", marginTop: "12px" }}>
              {[
                { label: "Trigger→Research", w: "15%", color: "#C62828", time: "0–2 weeks" },
                { label: "Compare", w: "20%", color: "#6A1B9A", time: "1–3 weeks" },
                { label: "Evaluate→Decide", w: "15%", color: "#2E7D32", time: "1–2 weeks" },
                { label: "Install→PTO", w: "35%", color: "#00695C", time: "3–12 weeks" },
                { label: "Advocate", w: "15%", color: "#E65100", time: "Ongoing" },
              ].map((b, i) => (
                <div key={i} style={{ flex: b.w, padding: "12px 8px", borderRadius: "4px", background: `${b.color}20`, borderTop: `3px solid ${b.color}`, textAlign: "center" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: b.color, letterSpacing: "0.3px" }}>{b.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(78, 99, 148, 0.75)", marginTop: "4px" }}>{b.time}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", display: "flex", gap: "16px", justifyContent: "center", fontSize: "11px", color: "rgba(78, 99, 148, 0.7)" }}>
              <span>🏷 Referral leads: 1–3 weeks total</span>
              <span>🏷 Marketplace leads: 4–8 weeks total</span>
              <span>🏷 Cold leads: 6–12 weeks total</span>
            </div>
          </div>
          <SectionSources ids={["energysage-marketplace", "brightlocal", "sce-rates", "cpuc-nbt"]} />
        </section>

        {/* ===== STRATEGY ===== */}
        <section id="strategy" style={sectionWrap}>
          <h2 style={h2}>Strategy Summary</h2>
          <SectionTermHint terms={sectionHints.strategy} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            <div style={card}><h3 style={{ ...h3, color: "#2E7D32" }}>✅ CaliSolar strengths</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Capital-light dealer model, easier to scale</li><li>Diverse financing (PPA, loan, purchase)</li><li>24/7 monitoring, transferable warranties</li><li>Single point of contact</li><li>$0 down for qualified homeowners</li></ul></div>
            <div style={card}><h3 style={{ ...h3, color: "#C62828" }}>⚠️ Gaps to address</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Small scale (132 installs) → weak social proof</li><li>Single EPC dependency (Simple Power)</li><li>Weak digital presence / SEO</li><li>Not on EnergySage marketplace</li><li>Few online reviews</li></ul></div>
          </div>

          <div style={card}>
            <h3 style={{ ...h3, color: "#1f4ab8" }}>🎯 Priority action items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Build social proof now", desc: "Target 50+ Google reviews. Ask within 7 days post-PTO. Respond to 100% within 24h. 4.5+ rating ≈ 3× organic leads (benchmark)." },
                { title: "Join EnergySage marketplace", desc: "~45% of Compare-stage shoppers use EnergySage. No listing = lose Smart Investor & Bill Shocked segments." },
                { title: "TPO/PPA messaging post-ITC", desc: "TPO still qualifies for commercial ITC + safe harbor (SEIA: support through ~mid-2030). Message: partner-owned system, savings from day one without 25D." },
                { title: "Solar + battery bundling", desc: "NEM 3.0: cheap hourly export; self-use at SCE peak ~58¢+ (TOU-D). Close interest-vs-purchase gap; stack SGIP when eligible." },
                { title: "SCE rate messaging", desc: "Lead with TOU on-peak & ~34.5¢/kWh average — do not use false 2026 % hikes (SCE Jan 2026 ~−5%, Jun ~−0.1%). ROI = lock energy cost vs long bill history." },
                { title: "Referral program", desc: "Referrals = highest conversion. Incentive $250–500 per referral; partner with realtors/roofers." },
              ].map((o, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: "10px", background: "rgba(14, 27, 71, 0.05)", border: "1px solid rgba(14, 27, 71, 0.06)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0e1b47", marginBottom: "6px" }}>{o.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.88)", lineHeight: 1.7 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, marginTop: "24px", borderLeft: "3px solid rgba(31,74,184,0.5)" }}>
            <h3 style={{ ...h3, fontSize: "15px" }}>Data audit notes (June 2026)</h3>
            <ul style={{ margin: 0, paddingLeft: "18px", ...body, fontSize: "13px" }}>
              <li><strong>Updated:</strong> CA $/W $2.53 (EnergySage); U.S. $3.39 Q4/2025 (SEIA); SCE avg 34.5¢ & 2026 adjustments; ITC 25D ended + −19% 2026 forecast.</li>
              <li><strong>Corrected:</strong> Removed “SCE +12.9% in 2026” — inconsistent with SCE Rate Advisory (Jan 2026 ~−5%, Jun ~−0.1%).</li>
              <li><strong>Estimates / track:</strong> Persona % splits, 73/40% battery interest, 3× leads from 50+ reviews — industry benchmarks; reconcile CaliSolar 132+ installs with CRM.</li>
              <li><strong>Competitors:</strong> Rating snapshot — verify live before pitches.</li>
            </ul>
          </div>
          <SectionSources ids={reportSources.map((s) => s.id)} title="Full source list — entire report" />
        </section>

        {/* ===== GLOSSARY ===== */}
        <section id="glossary" style={{ ...sectionWrap, marginBottom: "32px" }}>
          <h2 style={h2}>Glossary</h2>
          <p style={{ ...body, marginBottom: "20px" }}>Detailed definitions for acronyms and concepts in this report (California, CaliSolar, post-ITC strategy). Earlier sections show short hints — use &quot;Full glossary&quot; at the top of each section to return here.</p>
          <TermGlossary terms={masterGlossary} />
        </section>

      </div>

      <footer style={{
        borderTop: `1px solid ${t.colors.lineSoft}`,
        background: t.colors.dark,
        color: "rgba(255,255,255,0.85)",
        padding: "40px 28px",
        marginTop: "24px",
      }}>
        <div style={{ maxWidth: t.maxWidth, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <a href={t.siteUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff", marginBottom: "12px" }}>
              <img src={t.logoUrl} alt="CaliSolar" style={{ height: "36px", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: t.fonts.display, fontWeight: 700 }}>CaliSolar</span>
            </a>
            <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0, maxWidth: "320px", opacity: 0.8 }}>
              Affordable home solar for California homeowners. Installations by Simple Power, CA C-10 License #1,111,652.
            </p>
          </div>
          <div style={{ fontSize: "13px" }}>
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>Contact</div>
            <a href="tel:+17146433226" style={{ color: t.colors.accentSoft, textDecoration: "none", display: "block", marginBottom: "4px" }}>(714) 643-3226</a>
            <a href="mailto:calisolar.sale@gmail.com" style={{ color: t.colors.accentSoft, textDecoration: "none", display: "block" }}>calisolar.sale@gmail.com</a>
          </div>
        </div>
        <p style={{ fontSize: "11px", opacity: 0.5, margin: "24px 0 0", textAlign: "center" }}>
          © {new Date().getFullYear()} CaliSolar · Industry research report · <a href={t.siteUrl} style={{ color: t.colors.accentSoft }}>calisolars.com</a>
        </p>
      </footer>
    </div>
  );
}
