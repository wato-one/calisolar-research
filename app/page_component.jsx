"use client";
import { useState, useEffect } from "react";
import { masterGlossary } from "./master-glossary";
import { reportSources, caMarketSizing } from "./report-sources";
import { calisolarTheme as t, fontStylesheet } from "./calisolar-theme";

const sourceById = Object.fromEntries(reportSources.map((s) => [s.id, s]));

function SourceRefs({ ids }) {
  if (!ids?.length) return null;
  return (
    <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(78, 99, 148, 0.85)", lineHeight: 1.6 }}>
      <span style={{ fontWeight: 700, letterSpacing: "0.3px" }}>Nguồn: </span>
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

function SectionSources({ ids, title = "Nguồn tham khảo — phần này" }) {
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
            <span style={{ color: "rgba(78, 99, 148, 0.65)" }}> — {s.label}, truy cập {s.accessed}</span>
            {s.note && <span style={{ display: "block", fontSize: "11px", marginTop: "2px" }}>{s.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaMarketSizingPanel({ card, h3, body }) {
  const rows = [
    ["Tổng housing units CA", caMarketSizing.housingUnits],
    ["Hộ owner-occupied", caMarketSizing.ownerOccupied],
    ["Hộ mái phù hợp rooftop solar", caMarketSizing.rooftopSuitable],
    ["Hộ đã có solar (interconnect)", caMarketSizing.withSolar],
    ["TAM còn lại (chưa lắp)", caMarketSizing.remainingTam],
    ["Residential Mỹ (2025)", caMarketSizing.annualResidentialMW],
    ["Dự báo residential Mỹ 2026", caMarketSizing.forecast2026],
  ];
  return (
    <div style={{ ...card, borderLeft: `3px solid ${t.colors.accent}`, marginBottom: "28px" }}>
      <h3 style={{ ...h3, fontSize: "16px" }}>Quy mô thị trường California ({caMarketSizing.asOf})</h3>
      <p style={{ ...body, marginBottom: "16px" }}>
        Các con số dưới đây dùng để ước lượng <strong style={{ color: t.colors.accent }}>quy mô phân khúc</strong> (hộ/thị trường), không phải % doanh thu CaliSolar.
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

const sections = [
  { id: "overview", label: "Tổng Quan" },
  { id: "pestel", label: "PESTEL" },
  { id: "porter", label: "Porter's 5 Forces" },
  { id: "competitors", label: "Đối Thủ" },
  { id: "consumer", label: "Consumer Deep Dive" },
  { id: "journey", label: "Path to Purchase" },
  { id: "strategy", label: "Chiến Lược" },
  { id: "glossary", label: "Thuật Ngữ" },
];

const pestelData = [
  {
    letter: "P", title: "Political", color: "#C62828",
    sourceIds: ["seia-smi-2025", "irs-itc", "cpuc-nbt"],
    items: [
      { headline: "ITC Section 25D hết hạn 31/12/2025", detail: "OBBBA xác nhận loại bỏ ITC sở hữu residential. Năm 2025 lắp 4,647 MWdc (−2% YoY). SEIA/Wood Mackenzie dự báo residential Mỹ −19% năm 2026.", impact: "critical", sourceIds: ["seia-smi-2025", "irs-itc"] },
      { headline: "Thuế & chi phí thiết bị 2025–2026", detail: "SEIA 2025 YiR: thép/đồng/nhôm +35% sau Section 232 50%; chi phí thiết bị cơ điện/cấu trúc thương mại +60% Q4/2025. Áp lực giá module và BOS vẫn là headwind cho margin installer.", impact: "high", sourceIds: ["seia-smi-2025"] },
      { headline: "NEM 3.0 (Net Billing Tariff)", detail: "Hiệu lực từ 4/2023 tại IOU CA. Export điện dư theo giờ, thường thấp hơn nhiều so với giá mua lưới — thúc đẩy self-consumption + pin.", impact: "high", sourceIds: ["cpuc-nbt", "sce-tou"] },
    ],
  },
  {
    letter: "E", title: "Economic", color: "#1565C0",
    sourceIds: ["sce-rates", "sce-tou", "energysage-ca", "seia-smi-2025"],
    items: [
      { headline: "Giá điện SCE & TOU peak", detail: "Bình quân residential SCE ~34.5¢/kWh (Rate Advisory 6/2026); điều chỉnh 1/2026 giảm ~5% và 6/2026 giảm nhẹ. Xu hướng dài hạn vẫn cao; TOU-D on-peak summer weekdays ~58¢/kWh (4–9 PM) — đây là đòn bẩy sales thực tế hơn chỉ nhìn average rate.", impact: "opportunity", sourceIds: ["sce-rates", "sce-tou"] },
      { headline: "Giá lắp California: ~$2.53/W", detail: "EnergySage (6/2026): ~$2.53/W cho hệ 8.7 kW (~$22,018 trước incentive). SEIA Q4/2025: bình quân residential Mỹ $3.39/W — CA vẫn rẻ hơn nhờ cạnh tranh dày.", impact: "high", sourceIds: ["energysage-ca", "seia-smi-2025"] },
      { headline: "Financing & TPO sau ITC", detail: "Vay solar phụ thuộc APR thị trường (~5–7% tùy tín dụng). TPO/PPA vẫn dùng ITC thương mại + safe harbor — SEIA: hoạt động safe harbor hỗ trợ qualify ITC TPO đến giữa 2030.", impact: "high", sourceIds: ["seia-smi-2025"] },
    ],
  },
  {
    letter: "S", title: "Social", color: "#2E7D32",
    sourceIds: ["brightlocal", "energysage-marketplace", "mckinsey-solar"],
    items: [
      { headline: "Top 3 ưu tiên khi mua solar", detail: "(1) Chi phí ban đầu / monthly payment, (2) Tiết kiệm dài hạn đáng tin, (3) Uy tín installer — thường quan trọng hơn slogan môi trường (tổng hợp khảo sát ngành & sales insight CA).", impact: "insight", sourceIds: ["mckinsey-solar"] },
      { headline: "Tâm lý 'kiểm soát hóa đơn'", detail: "Bill shock SCE + PSPS thúc đẩy tìm hiểu solar/battery. Chi phí hạ tầng lưới và wildfire mitigation vẫn được phản ánh qua biểu giá dài hạn dù có kỳ điều chỉnh giảm ngắn hạn.", impact: "opportunity", sourceIds: ["sce-rates"] },
      { headline: "Review online = cửa vào trust", detail: "BrightLocal: đa số người tiêu dùng đọc review trước khi mua dịch vụ local (mức ~80–90% tùy năm khảo sát). Mục tiêu vận hành: 50+ review Google, phản hồi trong 24h — benchmark ngành, chưa phải số liệu bắt buộc.", impact: "insight", sourceIds: ["brightlocal", "solarreviews"] },
    ],
  },
  {
    letter: "T", title: "Technological", color: "#6A1B9A",
    sourceIds: ["seia-smi-2025", "cpuc-nbt", "ca-energy-2045"],
    items: [
      { headline: "Solar + Storage", detail: "2025: solar + storage = 79% capacity mới trên lưới Mỹ. NEM 3.0 làm pin gần như phần cốt lõi proposal CA. Khảo sát ngành: ~73% quan tâm pin, ~40% chốt mua — gap educate/financing.", impact: "critical", sourceIds: ["seia-smi-2025", "cpuc-nbt"] },
      { headline: "Module 450W+ & TOPCon/HJT", detail: "Module wattage cao giúp giảm footprint mái — quan trọng nhà CA diện tích vừa. Giá module Q4/2025 giảm ~10% YoY (SEIA) nhưng BOS/vật liệu kim loại tăng.", impact: "opportunity", sourceIds: ["seia-smi-2025"] },
      { headline: "VPP & mục tiêu lưu trữ CA", detail: "Chương trình VPP utility (vd. SCE) + mục tiêu quy hoạch năng lượng CA hướng tới hàng chục nghìn MW storage vào 2045.", impact: "opportunity", sourceIds: ["ca-energy-2045", "sce-rates"] },
    ],
  },
  {
    letter: "E", title: "Environmental", color: "#00695C",
    sourceIds: ["ca-energy-2045", "seia-5m"],
    items: [
      { headline: "100% clean electricity 2045", detail: "California tiếp tục chính sách khí hậu dẫn đầu. Solar đã là nguồn điện chủ lực — SEIA: ~13.9 triệu hộ tương đương từ capacity CA (ước tính ngành).", impact: "opportunity", sourceIds: ["ca-energy-2045", "seia-5m"] },
      { headline: "Cháy rừng & PSPS", detail: "PSPS và wildfire liability là driver backup power tại SCE/PG&E territory — chi phí mitigation được CPUC phê duyệt qua biểu giá.", impact: "opportunity", sourceIds: ["sce-rates"] },
    ],
  },
  {
    letter: "L", title: "Legal", color: "#E65100",
    sourceIds: ["cpuc-fixed", "cslb", "title24-solar"],
    items: [
      { headline: "CPUC fixed charge & rate design", detail: "Thiết kế biểu giá (fixed charge, baseline) ảnh hưởng ROI solar mới. SEIA và trade groups tiếp tục advocacy — theo dõi quyết định CPUC từng kỳ.", impact: "critical", sourceIds: ["cpuc-fixed", "seia-smi-2025"] },
      { headline: "License C-10 / C-46", detail: "Installer tự thi công cần license CSLB. Dealer outsource cho EPC có C-10 (mô hình CaliSolar).", impact: "high", sourceIds: ["cslb", "cali-company"] },
      { headline: "Solar mandate & Title 24", detail: "Nhà mới CA bắt buộc solar từ chu kỳ Title 24 trước; bản cập nhật 2025 nhấn mạnh hiệu năng + khuyến khích pin (hiệu lực theo lịch CEC).", impact: "opportunity", sourceIds: ["title24-solar"] },
    ],
  },
];

const porterData = [
  { force: "Cạnh tranh nội bộ ngành", level: 5, levelLabel: "RẤT CAO", color: "#C62828", points: ["Hàng trăm installer tại California, cạnh tranh khốc liệt", "CA ~$2.53/W vs ~$3.39/W bình quân Mỹ (Q4/2025, SEIA)", "ITC 25D hết → SEIA dự báo −19% residential 2026, consolidation", "EnergySage, SolarReviews làm minh bạch giá"] },
  { force: "Đe dọa đối thủ mới", level: 3.5, levelLabel: "TB-CAO", color: "#E65100", points: ["Dealer (không cần license): rào cản thấp", "Installer (cần C-10): rào cản cao", "Roofing, HVAC, electrical đang mở rộng sang solar", "Post-ITC: một số rời, nhưng một số mới nhảy vào"] },
  { force: "Quyền lực nhà cung cấp", level: 3, levelLabel: "TRUNG BÌNH", color: "#1565C0", points: ["Panel/inverter: nhiều supplier → quyền lực thấp", "EPC partner: quyền lực cao nếu phụ thuộc 1 EPC", "Financing partners: ảnh hưởng trực tiếp close rate", "Lao động có license: khan hiếm → quyền lực cao"] },
  { force: "Quyền lực khách hàng", level: 4.5, levelLabel: "CAO", color: "#6A1B9A", points: ["Rất nhiều lựa chọn, EnergySage tăng 205% engagement", "Switching cost = 0 trước ký hợp đồng", "Post-ITC: homeowner mặc cả mạnh hơn", "Review online trao quyền thông tin cho khách"] },
  { force: "Sản phẩm thay thế", level: 2, levelLabel: "THẤP-TB", color: "#2E7D32", points: ["Lưới điện: mặc định; SCE TOU on-peak ~58¢ summer", "Community solar: cho thuê/mái không phù hợp", "Generator: backup nhưng không tiết kiệm dài hạn", "Hiệu quả năng lượng: bổ sung chứ không thay thế"] },
];

const competitorData = [
  { name: "Sunrun", type: "National", installs: "1M+", rating: "3.5★", strengths: "Brand #1 quốc gia, financing mạnh nhất, TPO/PPA leader", weaknesses: "Review mixed, sales pressure cao", threat: 5 },
  { name: "NRG Clean Power", type: "Regional CA", installs: "N/A", rating: "4.9★", strengths: "#1 California 2026, certifications hàng đầu", weaknesses: "Đang mở rộng nhanh → risk chất lượng", threat: 5 },
  { name: "SunPower/Maxeon", type: "National", installs: "500K+", rating: "3.8★", strengths: "Premium panel, brand uy tín", weaknesses: "Giá cao nhất, biến động tài chính", threat: 3 },
  { name: "Stellar Solar", type: "Regional SD", installs: "15,000+", rating: "4.99★", strengths: "Rating cao nhất CA, 25+ năm", weaknesses: "Chủ yếu San Diego", threat: 3 },
  { name: "LA Solar Group", type: "Regional LA", installs: "N/A", rating: "3.1★", strengths: "INC.500, Tesla-certified, tự SX panel", weaknesses: "Rating thấp, overpromising", threat: 4 },
  { name: "Momentum Solar", type: "National", installs: "50K+", rating: "3.8★", strengths: "Warranty 20 năm, marketing mạnh", weaknesses: "Misrepresenting ITC, aggressive", threat: 3 },
];

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
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: t.colors.muted }}>Thuật ngữ trong phần này</span>
        <button type="button" onClick={jumpToGlossary} style={{ background: "none", border: "none", color: t.colors.accent, fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>Bảng thuật ngữ đầy đủ →</button>
      </div>
      <div style={{ fontSize: "12px", color: t.colors.muted, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "4px" }}>
        {terms.map((term, i) => (
          <div key={i}><strong style={{ color: t.colors.accent, fontWeight: 600 }}>{term.term}</strong> — {term.def}</div>
        ))}
      </div>
    </div>
  );
}

function TermGlossary({ title = "Bảng thuật ngữ — toàn báo cáo", terms }) {
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

const sectionHints = {
  overview: [
    { term: "Authorized dealer", def: "CaliSolar bán & tư vấn, Simple Power (C-10) lắp đặt." },
    { term: "EPC", def: "Đối tác thi công — thiết kế, mua thiết bị, lắp hệ thống." },
    { term: "$/W", def: "Giá lắp ~$2.53/W tại CA (EnergySage 6/2026)." },
    { term: "SCE", def: "Utility Southern CA — avg ~34.5¢/kWh; TOU peak ~58¢ (2026 advisory)." },
  ],
  pestel: [
    { term: "PESTEL", def: "Khung phân tích 6 yếu tố vĩ mô." },
    { term: "ITC / Section 25D", def: "Tín dụng thuế 30% residential — đã hết 12/2025." },
    { term: "NEM 3.0", def: "Export điện dư giá rất thấp (~4–10¢/kWh)." },
    { term: "CPUC", def: "Cơ quan điều tiết biểu giá & NEM tại CA." },
    { term: "PPA / TPO", def: "Bên thứ ba sở hữu hệ thống — vẫn hưởng ITC thương mại." },
  ],
  porter: [
    { term: "Porter's Five Forces", def: "5 lực lượng đánh giá áp lực cạnh tranh ngành." },
    { term: "Consolidation", def: "Tập trung thị trường sau ITC hết hạn." },
    { term: "EnergySage", def: "Marketplace so giá — tăng quyền lực khách hàng." },
    { term: "Switching cost", def: "≈ 0 trước khi ký hợp đồng." },
  ],
  competitors: [
    { term: "TPO", def: "Third-Party Ownership — công ty thứ ba (vd. Sunrun) sở hữu hệ trên mái; khách trả tiền thuê, thường hưởng ITC thương mại, không solar-owned." },
    { term: "PPA", def: "Power Purchase Agreement — khách trả theo kWh điện hệ sản xuất do bên thứ ba sở hữu; ít vốn ban đầu, cần đọc escalator trong HĐ." },
    { term: "National vs Regional", def: "National: scale, financing, brand toàn quốc. Regional: uy tín địa phương, reviews, phạm vi lắp (vd. NRG CA, Stellar SD)." },
    { term: "Overpromising", def: "Sales hứa quá mức ITC hoặc % tiết kiệm — gây distrust; benchmark đối thủ yếu (rating thấp)." },
  ],
  journey: [
    { term: "Path to Purchase", def: "7 giai đoạn: Trigger → … → Advocate." },
    { term: "Bill Shock / PSPS", def: "Trigger chính: hóa đơn cao & mất điện." },
    { term: "PTO", def: "Chờ utility bật hệ thống sau lắp (3–12 tuần)." },
    { term: "EnergySage", def: "So 3–5 quotes online ở giai đoạn Compare." },
    { term: "WOM", def: "Giới thiệu hàng xóm — conversion cao nhất." },
  ],
  consumer: [
    { term: "EnergySage / SolarReviews", def: "Kênh research & so sánh giá." },
    { term: "PPA / TPO vs Loan", def: "Không sở hữu vs solar-owned (premium giá nhà theo LBNL, tùy market)." },
    { term: "SGIP", def: "Rebate pin lưu trữ tại CA." },
    { term: "Social proof", def: "Reviews quyết định trust trước khi ký." },
    { term: "NEM 3.0", def: "Pin lưu trữ gần như bắt buộc." },
  ],
  strategy: [
    { term: "Social proof", def: "Mục tiêu 50+ Google reviews." },
    { term: "Post-ITC messaging", def: "Nhấn TPO/PPA & giá điện SCE, không chỉ ITC." },
    { term: "Bundling", def: "Gói solar + pin theo NEM 3.0." },
    { term: "EnergySage", def: "Đăng ký marketplace — action ưu tiên." },
    { term: "WOM / Referral", def: "Chương trình giới thiệu $250–500." },
  ],
};

// ---- PATH TO PURCHASE INFOGRAPHIC DATA ----
const journeyStages = [
  {
    num: "01", title: "TRIGGER", subtitle: "Kích hoạt nhu cầu", duration: "Tức thì",
    icon: "⚡", color: "#C62828", bgColor: "rgba(198,40,40,0.08)",
    triggers: [
      { label: "Bill Shock", desc: "Mở hóa đơn SCE $300-500+ mùa hè, peak rate 70¢/kWh", pct: "45%" },
      { label: "Hàng xóm lắp solar", desc: "Thấy panel lên mái → tò mò → hỏi thăm", pct: "25%" },
      { label: "Mất điện / Cháy rừng", desc: "Trải qua PSPS, mất điện nhiều ngày", pct: "20%" },
      { label: "Tin tức / Social", desc: "Đọc về giá điện tăng, ITC hết hạn", pct: "10%" },
    ],
    caliBehavior: "Homeowner California có trigger mạnh hơn các bang khác vì giá điện gấp đôi national average và wildfire events thường xuyên.",
  },
  {
    num: "02", title: "RESEARCH", subtitle: "Tự tìm hiểu", duration: "3-14 ngày",
    icon: "🔍", color: "#1565C0", bgColor: "rgba(21,101,192,0.08)",
    triggers: [
      { label: "Google Search", desc: "'solar cost California', 'is solar worth it 2026', 'NEM 3.0'", pct: "72%" },
      { label: "YouTube / TikTok", desc: "Video 'how solar works', 'solar myths busted'", pct: "38%" },
      { label: "Hỏi bạn bè/hàng xóm", desc: "Word-of-mouth, kinh nghiệm thực tế", pct: "35%" },
      { label: "Blog / News articles", desc: "Tin SCE tăng giá, hướng dẫn solar 2026", pct: "28%" },
    ],
    caliBehavior: "Giai đoạn này HOÀN TOÀN do homeowner chủ động. Họ chưa muốn nói chuyện với salesperson. Content marketing và SEO quyết định ai xuất hiện trước.",
  },
  {
    num: "03", title: "COMPARE", subtitle: "So sánh quotes", duration: "7-21 ngày",
    icon: "⚖️", color: "#6A1B9A", bgColor: "rgba(106,27,154,0.08)",
    triggers: [
      { label: "EnergySage marketplace", desc: "So sánh 3-5 quotes online, giá thấp hơn 20%", pct: "45%" },
      { label: "Google 'solar company near me'", desc: "Đọc Google Reviews, Yelp, BBB", pct: "35%" },
      { label: "SolarReviews.com", desc: "Rating & review chi tiết từng installer", pct: "25%" },
      { label: "Referral trực tiếp", desc: "Liên hệ 1-2 công ty được giới thiệu", pct: "20%" },
    ],
    caliBehavior: "Trung bình so sánh 3-5 quotes. 88% tin review online ngang referral. Công ty không có mặt trên EnergySage/Google Reviews = invisible.",
  },
  {
    num: "04", title: "EVALUATE", subtitle: "Đánh giá chi tiết", duration: "3-10 ngày",
    icon: "📋", color: "#2E7D32", bgColor: "rgba(46,125,50,0.08)",
    triggers: [
      { label: "Tổng chi phí & monthly payment", desc: "Yếu tố #1 — 'Tôi trả bao nhiêu/tháng?'", pct: null },
      { label: "Tiết kiệm dài hạn", desc: "ROI projection phải realistic, không overpromise", pct: null },
      { label: "Uy tín installer", desc: "License, reviews, năm KN, NABCEP cert", pct: null },
      { label: "Warranty & hậu mãi", desc: "25-year warranty, transferable, monitoring", pct: null },
    ],
    caliBehavior: "Post-ITC: financing terms (PPA, $0 down) quan trọng hơn bao giờ hết. Homeowner cũng đánh giá battery options vì NEM 3.0.",
  },
  {
    num: "05", title: "DECIDE", subtitle: "Ký hợp đồng", duration: "1-5 ngày",
    icon: "✍️", color: "#1f4ab8", bgColor: "rgba(31,74,184,0.08)",
    triggers: [
      { label: "Financing phù hợp", desc: "PPA $0 down hoặc loan terms chấp nhận được", pct: null },
      { label: "Trust đã đủ", desc: "Reviews tốt + salesperson transparent", pct: null },
      { label: "Urgency", desc: "Giá điện sắp tăng, incentive sắp hết", pct: null },
      { label: "Final validation", desc: "Gọi hỏi lần cuối → nhận câu trả lời rõ ràng", pct: null },
    ],
    caliBehavior: "Tổng thời gian từ Trigger đến Decision: 2-8 tuần. Referral leads quyết định nhanh hơn (1-3 tuần). Marketplace leads chậm hơn (4-8 tuần).",
  },
  {
    num: "06", title: "INSTALL", subtitle: "Lắp đặt & PTO", duration: "3-12 tuần",
    icon: "🔧", color: "#00695C", bgColor: "rgba(0,105,92,0.08)",
    triggers: [
      { label: "Anxiety cao nhất", desc: "Lo lắng về timeline, chất lượng, mái nhà", pct: null },
      { label: "Chờ PTO là 'tra tấn'", desc: "Hệ thống lắp xong nhưng chưa bật được", pct: null },
      { label: "Cần cập nhật chủ động", desc: "Thiếu communication → hối tiếc → bực bội", pct: null },
      { label: "CaliSolar edge", desc: "1 đầu mối liên lạc + 24/7 monitoring", pct: null },
    ],
    caliBehavior: "Giai đoạn quyết định REVIEW và REFERRAL. Trải nghiệm tốt → advocacy. Trải nghiệm tệ → review 1★ và anti-referral.",
  },
  {
    num: "07", title: "ADVOCATE", subtitle: "Giới thiệu & review", duration: "Ongoing",
    icon: "📣", color: "#E65100", bgColor: "rgba(230,81,0,0.08)",
    triggers: [
      { label: "Viết review", desc: "Google, Yelp, SolarReviews — trong 7 ngày đầu", pct: null },
      { label: "Giới thiệu hàng xóm", desc: "Word-of-mouth = lead chất lượng cao nhất", pct: null },
      { label: "Share trên social", desc: "Khoe monitoring app, tiết kiệm bill", pct: null },
      { label: "Referral program", desc: "Incentive → tạo vòng lặp tăng trưởng", pct: null },
    ],
    caliBehavior: "Nếu hành trình được quản lý tốt, niềm hào hứng đẩy khách thẳng vào advocacy. Nếu không — mất cả review lẫn referral.",
  },
];

/** % = ước lượng phân khúc trên TAM ~4.0M hộ CA chưa lắp solar (xem CaMarketSizingPanel) */
const TAM_CA_HOUSEHOLDS = 4.0;
const segments = [
  { name: "The Bill Shocked", pct: "40–45%", sizeCA: "~1.6–1.8 triệu hộ", tag: "PRIMARY", tagColor: "#1f4ab8", profile: "Homeowner 35–55 tuổi, hóa đơn $200–500+/tháng (SCE territory)", trigger: "Mở bill mùa hè, shock TOU on-peak ~58¢/kWh", research: "Google 'why is my electric bill so high' → 'solar cost CA'", financing: "$0 down, PPA hoặc loan — muốn savings ngay", barrier: "Sợ sales trick → cần review & minh bạch giá", channel: "Google Ads, calculator landing, SCE rate content" },
  { name: "The Resilience Seeker", pct: "20–25%", sizeCA: "~0.8–1.0 triệu hộ", tag: "GROWING", tagColor: "#2E7D32", profile: "40–65 tuổi, PG&E/SCE vùng PSPS/wildfire", trigger: "PSPS hoặc mất điện nhiều ngày", research: "'solar battery backup', SGIP, Tesla Powerwall", financing: "Cash/loan gói pin; SGIP giảm capex", barrier: "Giá pin + hiểu biết kỹ thuật", channel: "Backup content, post-PSPS referral" },
  { name: "The Smart Investor", pct: "15–20%", sizeCA: "~0.6–0.8 triệu hộ", tag: "ANALYTICAL", tagColor: "#1565C0", profile: "30–50 tuổi, so sánh ROI/NPV kỹ", trigger: "Lock chi phí năng lượng vs giá điện dài hạn", research: "EnergySage 3–5 quotes, SolarReviews, LBNL home-value studies", financing: "Cash/loan solar-owned (literature ~4–7% premium giá nhà, tùy market)", barrier: "Post-ITC cần model tài chính thật", channel: "EnergySage, SEO calculator, transparent proposal" },
  { name: "The Green Conscious", pct: "10–15%", sizeCA: "~0.4–0.6 triệu hộ", tag: "VALUES", tagColor: "#00695C", profile: "25–45 tuổi, thường có EV", trigger: "Giá trị bền vững + tiết kiệm", research: "Blog xanh, EV groups, social", financing: "Linh hoạt; hay bundle EV charger + solar", barrier: "Vẫn cần ROI hợp lý sau ITC", channel: "Social, EV dealer partnerships" },
  { name: "The New Homebuyer", pct: "5–10%", sizeCA: "~0.2–0.4 triệu hộ", tag: "EMERGING", tagColor: "#6A1B9A", profile: "Mới mua nhà CA (Title 24 / mandate awareness)", trigger: "Bill SCE đầu tiên + realtor/hàng xóm", research: "Realtor, Google, quyết nhanh nếu trust cao", financing: "PPA/loan cần education", barrier: "Sợ cam kết dài hạn", channel: "Realtor partners, community HOA" },
];

const infoSources = [
  { rank: "01", name: "Google Search", importance: 5, desc: "Kênh #1 — 72% bắt đầu ở đây", detail: "'solar cost California', 'best solar company near me', 'is solar worth it 2026'. Dù có referral, homeowner vẫn Google thương hiệu + 'reviews' trước khi gửi form." },
  { rank: "02", name: "Online Reviews", importance: 5, desc: "Bộ lọc tin cậy quyết định", detail: "Google Business (primary), Yelp, SolarReviews, EnergySage. 88% tin ngang referral. Dưới 50 reviews = 'rủi ro'. 50+ = gấp 3x leads. Cần respond ALL reviews trong 24h." },
  { rank: "03", name: "Referral / WOM", importance: 4.5, desc: "Conversion cao nhất", detail: "Hàng xóm, bạn bè, realtor. Referral 'bắt đầu câu chuyện' nhưng Google 'viết chương giữa'. Referral yếu nếu digital presence mỏng." },
  { rank: "04", name: "EnergySage", importance: 4.5, desc: "Marketplace #1 quốc gia", detail: "205% tăng engagement. 10M+ users. So sánh quotes từ 500+ installer. Giá thấp hơn 20% so với direct. Không có mặt = mất segment 'Smart Investor'." },
  { rank: "05", name: "YouTube / TikTok", importance: 3.5, desc: "Education & awareness", detail: "Video 'how solar works', 'NEM 3.0 explained'. Xây dựng trust dài hạn. Đặc biệt hiệu quả với segment Green Conscious và New Homebuyer." },
  { rank: "06", name: "Facebook / IG Ads", importance: 3, desc: "Lead gen volume", detail: "Cost-per-lead cao nhưng volume lớn. Targeting homeowner theo location, income, home ownership. Cần landing page + calculator tốt." },
  { rank: "07", name: "Door-to-door", importance: 3, desc: "Trust-building local", detail: "Khi hàng xóm vừa lắp solar → cửa sổ ngắn. 2026: canvassing data-driven, tích hợp CRM. Nhưng reputation ngành xấu do aggressive tactics." },
  { rank: "08", name: "Utility company", importance: 2, desc: "Passive influence", detail: "35% muốn utility recommend installer. SCE/PG&E không endorse nhưng homeowner check utility website cho rate info → link opportunity." },
];

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
            Phân Tích Ngành Solar<br /><span style={{ color: t.colors.accent }}>Residential California 2026</span>
          </h1>
          <p style={{ fontSize: "15px", color: t.colors.muted, margin: "0 0 8px", maxWidth: "640px" }}>
            Báo cáo nội bộ: PESTEL, Porter, Consumer Deep Dive, Path to Purchase — căn chỉnh chiến lược với thị trường CA sau ITC.
          </p>
          <p style={{ fontSize: "12px", color: t.colors.accent, margin: 0, fontWeight: 500 }}>
            Kiểm chứng dữ liệu: tháng 6/2026 — SEIA, SCE, EnergySage, Census, California DGStats
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
          <h2 style={h2}>Tổng Quan CaliSolar & Chuỗi Giá Trị</h2>
          <SectionTermHint terms={sectionHints.overview} />
          <p style={{ ...body, marginBottom: "24px" }}>CaliSolar hoạt động với mô hình <strong style={{ color: "#1f4ab8" }}>authorized dealer</strong> — tư vấn, thiết kế, financing, hỗ trợ khách hàng. Lắp đặt do Simple Power (CA C-10 #1,111,652) thực hiện.</p>
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(14, 27, 71, 0.1)", background: "#ffffff" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(78, 99, 148, 0.85)" }}>Chuỗi Giá Trị Solar Residential</span>
            </div>
            <div style={{ padding: "24px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "center" }}>
              {["Nhà SX Panel", "Phân phối", "Dealer/Installer", "Financing", "O&M"].map((s, i) => (
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
            {[{ n: "132+", l: "Installations", s: "Nội bộ CaliSolar" }, { n: "$2.53", l: "$/W CA (ES)", s: "vs $3.39 Mỹ SEIA" }, { n: "34.5¢", l: "SCE avg/kWh", s: "TOU peak ~58¢" }, { n: "−19%", l: "US res. 2026", s: "SEIA forecast" }].map((x, i) => (
              <div key={i} style={card}><div style={{ fontSize: "28px", fontWeight: 800, color: i === 3 ? "#C62828" : t.colors.accent, letterSpacing: "-1px", fontFamily: t.fonts.display }}>{x.n}</div><div style={{ fontSize: "13px", fontWeight: 600, color: t.colors.ink, marginTop: "4px" }}>{x.l}</div><div style={{ fontSize: "11px", color: t.colors.muted, marginTop: "2px" }}>{x.s}</div></div>
            ))}
          </div>
          <SourceRefs ids={["cali-company", "energysage-ca", "seia-smi-2025", "sce-rates"]} />
        </section>

        {/* ===== PESTEL ===== */}
        <section id="pestel" style={sectionWrap}>
          <h2 style={h2}>Phân Tích PESTEL</h2>
          <SectionTermHint terms={sectionHints.pestel} />
          <p style={{ ...body, marginBottom: "24px" }}>6 yếu tố vĩ mô ảnh hưởng ngành solar residential California 2026.</p>
          {pestelData.map((cat, ci) => (
            <div key={ci} style={{ ...card, borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, flexShrink: 0 }}>{cat.letter}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: "16px", fontWeight: 700 }}>{cat.title}</div><div style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.75)" }}>{cat.items.length} yếu tố</div></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{cat.items.map((it, ii) => (
                <div key={ii} style={{ padding: "16px", borderRadius: "10px", background: "rgba(14, 27, 71, 0.05)", border: "1px solid rgba(14, 27, 71, 0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}><Badge type={it.impact}>{it.impact === "critical" ? "Nghiêm trọng" : it.impact === "high" ? "Cao" : it.impact === "opportunity" ? "Cơ hội" : "Insight"}</Badge><span style={{ fontSize: "14px", fontWeight: 700 }}>{it.headline}</span></div>
                  <p style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.7, margin: 0 }}>{it.detail}</p>
                  {it.sourceIds && <SourceRefs ids={it.sourceIds} />}
                </div>
              ))}</div>
              {cat.sourceIds && <SectionSources ids={cat.sourceIds} title={`Nguồn — ${cat.title}`} />}
            </div>
          ))}
        </section>

        {/* ===== PORTER ===== */}
        <section id="porter" style={sectionWrap}>
          <h2 style={h2}>Porter's Five Forces</h2>
          <SectionTermHint terms={sectionHints.porter} />
          <p style={{ ...body, marginBottom: "24px" }}>5 lực lượng cạnh tranh trong ngành solar residential California.</p>
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
          <h2 style={h2}>Đối Thủ Cạnh Tranh</h2>
          <SectionTermHint terms={sectionHints.competitors} />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {competitorData.map((c, ci) => (
              <div key={ci} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div><div style={{ fontSize: "16px", fontWeight: 700 }}>{c.name}</div><div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}><span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "3px", background: "rgba(14, 27, 71, 0.1)", color: "rgba(78, 99, 148, 0.85)", fontWeight: 600 }}>{c.type}</span><span style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.75)" }}>{c.rating}</span></div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: "10px", color: "rgba(78, 99, 148, 0.75)", marginBottom: "4px" }}>Mức đe dọa</div><ThreatDots level={c.threat} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#2E7D32", letterSpacing: "0.5px", marginBottom: "4px" }}>THẾ MẠNH</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.6 }}>{c.strengths}</div></div>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#C62828", letterSpacing: "0.5px", marginBottom: "4px" }}>ĐIỂM YẾU</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.6 }}>{c.weaknesses}</div></div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(78, 99, 148, 0.7)", marginTop: "8px" }}>Rating/đe dọa: snapshot Q2/2026 — xác minh trên SolarReviews/Google trước khi dùng sales battlecard.</p>
          <SectionSources ids={["solarreviews", "energysage-marketplace", "seia-smi-2025"]} />
        </section>

        {/* ===== CONSUMER DEEP DIVE ===== */}
        <section id="consumer" style={sectionWrap}>
          <h2 style={h2}>Consumer Deep Dive</h2>
          <SectionTermHint terms={sectionHints.consumer} />
          <CaMarketSizingPanel card={card} h3={h3} body={body} />

          {/* INFO SOURCES */}
          <h3 style={{ ...h3, marginTop: "8px" }}>Nguồn thông tin tham khảo (xếp hạng)</h3>
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
          <h3 style={h3}>Yếu tố quyết định chọn công ty solar</h3>
          <div style={{ ...card, marginBottom: "32px" }}>
            {[
              { rank: 1, factor: "Tổng chi phí & monthly payment", detail: "'Tôi trả bao nhiêu/tháng?' quan trọng hơn tổng giá hệ thống. Post-ITC: PPA/TPO $0 down là king.", pct: 92 },
              { rank: 2, factor: "Tiết kiệm dài hạn đáng tin cậy", detail: "ROI projection phải realistic. Overpromise = #1 reason for bad reviews và distrust cả ngành.", pct: 87 },
              { rank: 3, factor: "Uy tín & trình độ installer", detail: "CSLB License, years in business, NABCEP cert, review rating 4.5+. Dưới 4.0★ = red flag.", pct: 83 },
              { rank: 4, factor: "Warranty & hỗ trợ hậu mãi", detail: "25-year panel warranty, 10-year workmanship. 100% transferable khi bán nhà = strong selling point.", pct: 78 },
              { rank: 5, factor: "Financing flexibility", detail: "PPA vs Loan vs Cash vs Prepaid TPO. Công ty nào offer nhiều options hơn = close rate cao hơn.", pct: 74 },
              { rank: 6, factor: "Timeline lắp đặt", detail: "3-6 tuần vs 3-6 tháng. Fast proposal turnaround = competitive advantage rõ ràng.", pct: 65 },
              { rank: 7, factor: "Battery / storage options", detail: "73% muốn nhưng chỉ 40% mua. NEM 3.0 làm battery gần bắt buộc. SGIP rebate available.", pct: 60 },
              { rank: 8, factor: "Home value impact", detail: "Solar-owned: literature LBNL/ Berkeley Lab thường ghi nhận premium (mức % tùy bang & thời điểm — không dùng một số cố định). TPO/lease thường không chuyển asset. Quan trọng với Smart Investor.", pct: 45 },
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
          <h3 style={h3}>Phân khúc khách hàng California 2026</h3>
          <p style={{ ...body, marginBottom: "16px" }}>
            Cột <strong style={{ color: "#1f4ab8" }}>%</strong> = tỷ trọng persona trên TAM ~{TAM_CA_HOUSEHOLDS} triệu hộ chưa lắp solar.
            Cột <strong style={{ color: "#1f4ab8" }}>Quy mô CA</strong> = % × TAM (làm tròn; không cộng chính xác 100% vì overlap hành vi).
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
                  {[{ l: "Hồ sơ", v: seg.profile }, { l: "Trigger", v: seg.trigger }, { l: "Hành vi research", v: seg.research }, { l: "Financing preference", v: seg.financing }, { l: "Rào cản chính", v: seg.barrier }, { l: "Kênh hiệu quả", v: seg.channel }].map((f, fi) => (
                    <div key={fi}><div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(78, 99, 148, 0.7)", letterSpacing: "0.5px", marginBottom: "3px", textTransform: "uppercase" }}>{f.l}</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.92)", lineHeight: 1.5 }}>{f.v}</div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* POST INSTALL HABITS */}
          <h3 style={h3}>Thói quen sau khi lắp đặt</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", marginBottom: "32px" }}>
            {[
              { title: "Monitoring obsession", desc: "Check app (Enphase/SolarEdge/Tesla) hàng ngày trong 1-3 tháng đầu. Câu hỏi #1: 'Hệ thống hoạt động tốt không?' Giảm dần sau 6 tháng." },
              { title: "Usage shifting", desc: "Học chạy appliances ban ngày (máy giặt, sạc EV, AC) khi solar đang produce. Tránh peak 4-9 PM. Tiết kiệm $100-250/tháng." },
              { title: "Battery becomes lifeline", desc: "Dưới NEM 3.0: không có pin = export chỉ $0.04-0.10/kWh. Có pin = tự dùng giờ peak 70¢/kWh. Gap: 73% muốn nhưng chỉ 40% mua." },
              { title: "Whole-home thinking", desc: "Solar → Battery → Heat pump → EV charger → Induction. Homeowner thắng là người coi nhà như một hệ thống năng lượng hoàn chỉnh." },
              { title: "Review window: 7 ngày", desc: "Cảm xúc tích cực cao nhất ngay sau PTO. Yêu cầu review trong 7 ngày đầu = tỷ lệ 5★ cao nhất. Sau 30 ngày = quá muộn." },
              { title: "Referral happens naturally", desc: "Hàng xóm hỏi → khoe monitoring app → giới thiệu. Referral program với incentive tăng tốc. Conversion rate cao nhất trong tất cả lead sources." },
            ].map((h, i) => (
              <div key={i} style={card}><div style={{ fontSize: "14px", fontWeight: 700, color: "#0e1b47", marginBottom: "6px" }}>{h.title}</div><div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.88)", lineHeight: 1.6 }}>{h.desc}</div></div>
            ))}
          </div>

          {/* WHAT THEY HATE / LOVE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={card}>
              <h3 style={{ ...h3, color: "#C62828" }}>❌ Homeowner GHÉT</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...body }}>
                <div>• <strong>Aggressive sales:</strong> door-knock lừa, cold calls, pressure tactics</div>
                <div>• <strong>Overpromise:</strong> misrepresent ITC, inflate savings, fake urgency</div>
                <div>• <strong>Hidden fees:</strong> bait-and-switch pricing, unclear contracts</div>
                <div>• <strong>Ghost post-sale:</strong> ký xong biến mất, không support</div>
                <div>• <strong>Slow timeline:</strong> hứa 4 tuần → kéo 4 tháng</div>
              </div>
            </div>
            <div style={card}>
              <h3 style={{ ...h3, color: "#2E7D32" }}>✅ Homeowner MUỐN</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...body }}>
                <div>• <strong>Transparency:</strong> giá rõ ràng, no surprises, realistic savings</div>
                <div>• <strong>1 đầu mối liên lạc</strong> từ đầu đến cuối (CaliSolar có!)</div>
                <div>• <strong>Timeline rõ ràng</strong> với updates chủ động</div>
                <div>• <strong>Post-install support:</strong> 24/7 monitoring, responsive (CaliSolar có!)</div>
                <div>• <strong>Validation:</strong> xác nhận hệ thống hoạt động đúng</div>
              </div>
            </div>
          </div>
          <SectionSources ids={["census-ca", "ca-dgstats", "energysage-marketplace", "brightlocal", "berkeley-lbnl", "sgip"]} />
        </section>

        {/* ===== PATH TO PURCHASE INFOGRAPHIC ===== */}
        <section id="journey" style={sectionWrap}>
          <h2 style={h2}>Path to Purchase</h2>
          <SectionTermHint terms={sectionHints.journey} />
          <p style={{ ...body, marginBottom: "8px" }}>Hành trình 7 giai đoạn từ kích hoạt nhu cầu đến trở thành người giới thiệu. Tổng timeline: 2-8 tuần (Trigger → Decision) + 3-12 tuần (Install → PTO).</p>
          <p style={{ fontSize: "12px", color: "rgba(78, 99, 148, 0.7)", marginBottom: "32px" }}>Cuộn xuống để xem chi tiết từng giai đoạn — hoặc dùng menu phía trên để nhảy nhanh.</p>

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
            <h3 style={{ ...h3, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(78, 99, 148, 0.85)" }}>Timeline tổng hợp</h3>
            <div style={{ display: "flex", gap: "4px", alignItems: "stretch", marginTop: "12px" }}>
              {[
                { label: "Trigger→Research", w: "15%", color: "#C62828", time: "0-2 tuần" },
                { label: "Compare", w: "20%", color: "#6A1B9A", time: "1-3 tuần" },
                { label: "Evaluate→Decide", w: "15%", color: "#2E7D32", time: "1-2 tuần" },
                { label: "Install→PTO", w: "35%", color: "#00695C", time: "3-12 tuần" },
                { label: "Advocate", w: "15%", color: "#E65100", time: "Ongoing" },
              ].map((b, i) => (
                <div key={i} style={{ flex: b.w, padding: "12px 8px", borderRadius: "4px", background: `${b.color}20`, borderTop: `3px solid ${b.color}`, textAlign: "center" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: b.color, letterSpacing: "0.3px" }}>{b.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(78, 99, 148, 0.75)", marginTop: "4px" }}>{b.time}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", display: "flex", gap: "16px", justifyContent: "center", fontSize: "11px", color: "rgba(78, 99, 148, 0.7)" }}>
              <span>🏷 Referral leads: 1-3 tuần total</span>
              <span>🏷 Marketplace leads: 4-8 tuần total</span>
              <span>🏷 Cold leads: 6-12 tuần total</span>
            </div>
          </div>
          <SectionSources ids={["energysage-marketplace", "brightlocal", "sce-rates", "cpuc-nbt"]} />
        </section>

        {/* ===== STRATEGY ===== */}
        <section id="strategy" style={sectionWrap}>
          <h2 style={h2}>Tóm Tắt Chiến Lược</h2>
          <SectionTermHint terms={sectionHints.strategy} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            <div style={card}><h3 style={{ ...h3, color: "#2E7D32" }}>✅ Điểm mạnh CaliSolar</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Mô hình dealer nhẹ vốn, dễ scale</li><li>Financing đa dạng (PPA, Loan, Purchase)</li><li>24/7 monitoring, 100% transferable</li><li>Một đầu mối liên lạc</li><li>$0 down for qualified homeowners</li></ul></div>
            <div style={card}><h3 style={{ ...h3, color: "#C62828" }}>⚠️ Cần khắc phục</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Quy mô nhỏ (132 installs) → thiếu social proof</li><li>Phụ thuộc 1 EPC (Simple Power)</li><li>Digital presence / SEO yếu</li><li>Chưa có trên EnergySage marketplace</li><li>Review online ít</li></ul></div>
          </div>

          <div style={card}>
            <h3 style={{ ...h3, color: "#1f4ab8" }}>🎯 Action Items ưu tiên</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Build social proof ngay", desc: "Mục tiêu 50+ Google reviews. Yêu cầu review trong 7 ngày sau PTO. Respond 100% reviews trong 24h. Rating 4.5+ = 3x organic leads." },
                { title: "Đăng ký EnergySage marketplace", desc: "45% segment 'Compare' dùng EnergySage. Không có mặt = mất khách Smart Investor và Bill Shocked." },
                { title: "TPO/PPA messaging post-ITC", desc: "TPO vẫn đủ điều kiện ITC thương mại + safe harbor (SEIA: hỗ trợ qualify đến ~giữa 2030). Messaging: sở hữu hệ thống bởi đối tác financing — tiết kiệm từ ngày 1 không cần 25D." },
                { title: "Solar + Battery bundling", desc: "NEM 3.0: export rẻ theo giờ; self-use giờ peak SCE ~58¢+ (TOU-D). Educate gap quan tâm pin vs thực mua; stack SGIP khi đủ điều kiện." },
                { title: "SCE rate messaging", desc: "Nhấn TOU on-peak & bình quân ~34.5¢/kWh — không dùng % tăng 2026 sai (SCE 1/2026 −5%, 6/2026 −0.1%). ROI = lock năng lượng vs lịch sử bill tăng dài hạn." },
                { title: "Referral program", desc: "Referral = highest conversion rate. Tạo incentive program: $250-500/referral cho khách hiện tại. Kết hợp realtor/roofer partnerships." },
              ].map((o, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: "10px", background: "rgba(14, 27, 71, 0.05)", border: "1px solid rgba(14, 27, 71, 0.06)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0e1b47", marginBottom: "6px" }}>{o.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(78, 99, 148, 0.88)", lineHeight: 1.7 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, marginTop: "24px", borderLeft: "3px solid rgba(31,74,184,0.5)" }}>
            <h3 style={{ ...h3, fontSize: "15px" }}>Ghi chú kiểm chứng (audit 06/2026)</h3>
            <ul style={{ margin: 0, paddingLeft: "18px", ...body, fontSize: "13px" }}>
              <li><strong>Đã cập nhật:</strong> $/W CA $2.53 (EnergySage); Mỹ $3.39 Q4/2025 (SEIA); SCE avg 34.5¢ & điều chỉnh 2026; ITC 25D hết + forecast −19% 2026.</li>
              <li><strong>Đã sửa:</strong> Bỏ claim “SCE +12.9% năm 2026” — không khớp Rate Advisory SCE (1/2026 giảm ~5%, 6/2026 giảm ~0.1%).</li>
              <li><strong>Ước tính / cần theo dõi:</strong> % phân khúc persona, 73/40% pin interest, 3× leads từ 50+ reviews — benchmark ngành; số CaliSolar 132+ installs cần đồng bộ CRM.</li>
              <li><strong>Đối thủ:</strong> Rating snapshot — verify live trước pitch.</li>
            </ul>
          </div>
          <SectionSources ids={reportSources.map((s) => s.id)} title="Danh mục nguồn tham khảo — toàn báo cáo" />
        </section>

        {/* ===== GLOSSARY ===== */}
        <section id="glossary" style={{ ...sectionWrap, marginBottom: "32px" }}>
          <h2 style={h2}>Bảng Thuật Ngữ</h2>
          <p style={{ ...body, marginBottom: "20px" }}>Giải thích chi tiết từng viết tắt và khái niệm trong báo cáo (ngữ cảnh California, CaliSolar và chiến lược sau ITC). Các phần phía trên chỉ tóm tắt 3–5 dòng — dùng nút &quot;Bảng thuật ngữ đầy đủ&quot; ở đầu mỗi section để quay lại đây.</p>
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
