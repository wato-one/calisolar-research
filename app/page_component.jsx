"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "overview", label: "Tổng Quan" },
  { id: "pestel", label: "PESTEL" },
  { id: "porter", label: "Porter's 5 Forces" },
  { id: "lifecycle", label: "Giai Đoạn Ngành" },
  { id: "competitors", label: "Đối Thủ" },
  { id: "journey", label: "Path to Purchase" },
  { id: "consumer", label: "Consumer Deep Dive" },
  { id: "strategy", label: "Chiến Lược" },
];

const pestelData = [
  {
    letter: "P", title: "Political", color: "#C62828",
    items: [
      { headline: "ITC Section 25D hết hạn 31/12/2025", detail: "Tín dụng thuế liên bang 30% cho solar dân dụng đã kết thúc. SEIA dự báo thị trường residential solar sụt giảm 19% trong 2026.", impact: "critical" },
      { headline: "Thuế quan Trump 2025-2026", detail: "Thuế suất lên đến 3,500% nhắm vào nhà sản xuất Đông Nam Á. Thuế thép/nhôm tăng gấp đôi lên 50% từ tháng 6/2025, ảnh hưởng đến giá racking và mounting.", impact: "high" },
      { headline: "NEM 3.0 (Net Billing Tariff)", detail: "Từ tháng 4/2023, giá mua điện dư từ solar xuống rất thấp ($0.04–0.10/kWh), buộc homeowner phải kèm pin lưu trữ để maximize giá trị.", impact: "high" },
    ],
  },
  {
    letter: "E", title: "Economic", color: "#1565C0",
    items: [
      { headline: "Giá điện tăng 83% trong 10 năm", detail: "SCE tăng từ ~18.9¢/kWh (2014) lên ~34.5¢/kWh (2024), gấp đôi mức trung bình quốc gia. Dự kiến tăng thêm 12.9% năm 2026.", impact: "opportunity" },
      { headline: "Giá lắp đặt California: $2.39/W", detail: "Thấp hơn 20% so với mức trung bình quốc gia $3.00/W. Cạnh tranh installer đã bóp nghẹt biên lợi nhuận. Chi phí lao động vẫn khó giảm.", impact: "high" },
      { headline: "Lãi suất vay ~5.5% APR", detail: "Chi phí financing là rào cản. Mô hình PPA và TPO (bên thứ ba sở hữu) có lợi thế — vẫn được hưởng ITC thương mại đến 2027.", impact: "high" },
    ],
  },
  {
    letter: "S", title: "Social", color: "#2E7D32",
    items: [
      { headline: "Top 3 ưu tiên khi mua solar", detail: "(1) Chi phí ban đầu, (2) Tiết kiệm dài hạn, (3) Trình độ installer — cao hơn cả ưu đãi chính phủ và tác động môi trường.", impact: "insight" },
      { headline: "Tâm lý 'giành lại quyền kiểm soát'", detail: "Homeowner bất mãn với hóa đơn tăng. AI data centers đẩy nhu cầu → giá wholesale tăng 23%. Homeowner tìm cách 'cắt dây' khỏi rủi ro.", impact: "opportunity" },
      { headline: "88% tin review online ngang referral", detail: "Công ty có 50+ reviews nhận gấp 3x organic leads. Review dưới 30 ngày = 'active business', trên 90 ngày = 'có thể đóng cửa'.", impact: "insight" },
    ],
  },
  {
    letter: "T", title: "Technological", color: "#6A1B9A",
    items: [
      { headline: "Solar + Storage là tiêu chuẩn mới", detail: "Pin residential tăng 51% YoY (2025). 73% homeowner quan tâm battery nhưng chỉ 40% thực sự mua → gap lớn cần educate.", impact: "critical" },
      { headline: "Panel hiệu suất 450W+ phổ biến", detail: "TOPCon và HJT thay thế PERC. Cần ít panel hơn, phù hợp mái nhỏ.", impact: "opportunity" },
      { headline: "Virtual Power Plant (VPP)", detail: "Homeowner bán điện từ pin vào lưới trong giờ cao điểm, tạo nguồn thu mới. CA mục tiêu 52,000 MW lưu trữ vào 2045.", impact: "opportunity" },
    ],
  },
  {
    letter: "E", title: "Environmental", color: "#00695C",
    items: [
      { headline: "Mục tiêu 100% sạch 2045", detail: "CA dẫn đầu chính sách năng lượng tái tạo. Solar đã đủ cung cấp cho 14.6 triệu ngôi nhà.", impact: "opportunity" },
      { headline: "Cháy rừng & mất điện", detail: "Nhu cầu backup power tăng mạnh. SCE chi hàng tỷ USD wildfire mitigation — chuyển vào hóa đơn khách hàng.", impact: "opportunity" },
    ],
  },
  {
    letter: "L", title: "Legal", color: "#E65100",
    items: [
      { headline: "CPUC Fixed Charge mới", detail: "Phí cố định hàng tháng ảnh hưởng lớn đến incentive khách mới đi solar. SEIA đang đấu tranh chống tăng phí này.", impact: "critical" },
      { headline: "License C-10/C-46", detail: "Rào cản cho đối thủ mới tự thi công. Mô hình dealer thì rào cản thấp.", impact: "high" },
      { headline: "Solar Mandate nhà mới", detail: "Nhà mới phải có solar từ 2020. Code 2025 (hiệu lực 1/2026) cập nhật sizing + khuyến khích battery.", impact: "opportunity" },
    ],
  },
];

const porterData = [
  { force: "Cạnh tranh nội bộ ngành", level: 5, levelLabel: "RẤT CAO", color: "#C62828", points: ["Hàng trăm installer tại California, cạnh tranh khốc liệt", "Giá CA thấp hơn 20% so với national avg do cạnh tranh", "ITC hết hạn → consolidation đang xảy ra", "EnergySage, SolarReviews tạo minh bạch giá"] },
  { force: "Đe dọa đối thủ mới", level: 3.5, levelLabel: "TB-CAO", color: "#E65100", points: ["Dealer (không cần license): rào cản thấp", "Installer (cần C-10): rào cản cao", "Roofing, HVAC, electrical đang mở rộng sang solar", "Post-ITC: một số rời, nhưng một số mới nhảy vào"] },
  { force: "Quyền lực nhà cung cấp", level: 3, levelLabel: "TRUNG BÌNH", color: "#1565C0", points: ["Panel/inverter: nhiều supplier → quyền lực thấp", "EPC partner: quyền lực cao nếu phụ thuộc 1 EPC", "Financing partners: ảnh hưởng trực tiếp close rate", "Lao động có license: khan hiếm → quyền lực cao"] },
  { force: "Quyền lực khách hàng", level: 4.5, levelLabel: "CAO", color: "#6A1B9A", points: ["Rất nhiều lựa chọn, EnergySage tăng 205% engagement", "Switching cost = 0 trước ký hợp đồng", "Post-ITC: homeowner mặc cả mạnh hơn", "Review online trao quyền thông tin cho khách"] },
  { force: "Sản phẩm thay thế", level: 2, levelLabel: "THẤP-TB", color: "#2E7D32", points: ["Lưới điện: mặc định nhưng giá tăng 83%/10 năm", "Community solar: cho thuê/mái không phù hợp", "Generator: backup nhưng không tiết kiệm dài hạn", "Hiệu quả năng lượng: bổ sung chứ không thay thế"] },
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
      {[1,2,3,4,5].map(i => <div key={i} style={{ width: "28px", height: "10px", borderRadius: "2px", background: i <= Math.round(level) ? color : "rgba(150,150,150,0.15)" }} />)}
      <span style={{ marginLeft: "8px", fontSize: "12px", fontWeight: 700, color }}>{level}/5</span>
    </div>
  );
}

function ThreatDots({ level }) {
  return <div style={{ display: "flex", gap: "3px" }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i <= level ? (level >= 4 ? "#C62828" : "#E65100") : "rgba(150,150,150,0.15)" }} />)}</div>;
}

function TermGlossary({ title = "Thuật ngữ trong section này", terms }) {
  return (
    <div style={{
      background: "rgba(244,166,35,0.06)",
      border: "1px solid rgba(244,166,35,0.22)",
      borderRadius: "8px",
      padding: "20px 24px",
      marginBottom: "24px",
    }}>
      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#F4A623", marginBottom: "14px" }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px 24px" }}>
        {terms.map((t, i) => (
          <div key={i}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#F4A623" }}>{t.term}</span>
              {t.en && <span style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", marginLeft: "6px" }}>{t.en}</span>}
            </div>
            <p style={{ fontSize: "13px", color: "rgba(245,240,232,0.62)", lineHeight: 1.65, margin: "4px 0 0" }}>{t.def}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const glossaryBySection = {
  overview: [
    { term: "Authorized dealer", en: "Đại lý ủy quyền", def: "CaliSolar bán & tư vấn dưới thương hiệu nhà sản xuất/đối tác, không nhất thiết tự thi công — khác installer có license C-10." },
    { term: "Residential Solar", en: "Solar dân dụng", def: "Hệ điện mặt trời lắp mái nhà ở; báo cáo dự báo residential CA giảm ~19% năm 2026 sau ITC hết hạn." },
    { term: "Homeowner", en: "Chủ nhà", def: "Khách hàng cuối sở hữu nhà — đối tượng mua solar residential tại California." },
    { term: "Dealer / Installer", en: "Đại lý / Lắp đặt", def: "Dealer: bán & financing. Installer: thi công (cần C-10). CaliSolar = dealer; Simple Power = EPC thi công." },
    { term: "EPC", en: "Engineering, Procurement, Construction", def: "Thiết kế, mua panel/inverter, lắp đặt. CaliSolar dùng Simple Power (CA C-10 #1,111,652)." },
    { term: "C-10", en: "Electrical Contractor License", def: "Giấy phép thầu điện CA (CSLB) — bắt buộc nếu công ty tự lắp solar." },
    { term: "Financing", en: "Tài trợ", def: "PPA, loan, cash, TPO — hạ rào chi phí ban đầu cho homeowner." },
    { term: "O&M", en: "Operations & Maintenance", def: "Vận hành & bảo trì sau lắp: monitoring, sửa chữa, thay thiết bị." },
    { term: "$/W", en: "Dollar per Watt", def: "Giá lắp đặt trên watt-peak. CA ~$2.39/W, thấp ~20% so với national ~$3.00/W." },
    { term: "kWh", en: "Kilowatt-hour", def: "Đơn vị điện năng tiêu thụ; SCE ~34.5¢/kWh (2024), tăng ~83% trong 10 năm." },
    { term: "SCE", en: "Southern California Edison", def: "Utility phục vụ Southern CA — hóa đơn & biểu giá ảnh hưởng trực tiếp ROI solar." },
  ],
  pestel: [
    { term: "PESTEL", en: "P·E·S·T·E·L", def: "Khung phân tích vĩ mô: Political, Economic, Social, Technological, Environmental, Legal." },
    { term: "ITC", en: "Investment Tax Credit", def: "Tín dụng thuế liên bang năng lượng sạch. Section 25D residential 30% hết 31/12/2025; ITC thương mại (TPO/PPA) còn đến ~2027." },
    { term: "Section 25D", en: "Residential ITC", def: "Điều khoản ITC cho homeowner sở hữu hệ thống — đã hết hạn, làm ROI mua outright yếu hơn." },
    { term: "NEM 3.0", en: "Net Billing Tariff", def: "Từ 4/2023: điện dư export ~$0.04–0.10/kWh; khác NEM 2.0 (offset gần 1:1)." },
    { term: "NEM 2.0", en: "Net Energy Metering", def: "Chính sách cũ: credit điện dư gần tương đương giá mua — đã thay bằng NEM 3.0 tại CA." },
    { term: "SEIA", en: "Solar Energy Industries Association", def: "Hiệp hội solar Mỹ; dự báo residential sụt 19% năm 2026, lobby ITC & CPUC." },
    { term: "CPUC", en: "CA Public Utilities Commission", def: "Điều tiết utility; quyết định NEM, fixed charge, biểu giá." },
    { term: "Fixed Charge", en: "Phí cố định", def: "Phí hàng tháng trên hóa đơn điện (đề xuất CPUC) — giảm incentive đi solar mới." },
    { term: "PPA", en: "Power Purchase Agreement", def: "Khách trả theo kWh điện từ hệ thống do công ty sở hữu; thường $0 down." },
    { term: "TPO", en: "Third-Party Ownership", def: "Bên thứ ba sở hữu hệ thống — hưởng ITC thương mại, khách không cần tax credit." },
    { term: "APR", en: "Annual Percentage Rate", def: "Lãi suất vay solar ~5.5% — ảnh hưởng monthly payment & close rate." },
    { term: "SCE", en: "Southern California Edison", def: "Utility trong phân tích giá điện & wildfire mitigation." },
    { term: "TOU", en: "Time-of-Use", def: "Giá điện theo giờ; peak 4–9 PM có thể ~70¢/kWh mùa hè SCE." },
    { term: "kWh", en: "Kilowatt-hour", def: "Đơn vị đo điện năng trên hóa đơn và khi export solar dư." },
    { term: "Wholesale", en: "Giá điện bán buôn", def: "Giá điện lưới bán buôn — tăng ~23% do nhu cầu data center, đẩy giá retail." },
    { term: "YoY", en: "Year over Year", def: "So sánh cùng kỳ năm trước; pin residential +51% YoY (2025)." },
    { term: "TOPCon / HJT", en: "Công nghệ cell", def: "Kiểu pin thế hệ mới thay PERC — hiệu suất cao, ít panel hơn trên mái nhỏ." },
    { term: "PERC", en: "Passivated Emitter Rear Cell", def: "Công nghệ cell phổ biến thế hệ trước, đang được TOPCon/HJT thay thế." },
    { term: "VPP", en: "Virtual Power Plant", def: "Mạng pin nhà phối hợp bán điện giờ cao điểm; CA mục tiêu 52,000 MW storage 2045." },
    { term: "MW", en: "Megawatt", def: "1 MW = 1 triệu watt; đơn vị quy mô lưu trữ / công suất lưới." },
    { term: "C-10 / C-46", en: "CSLB licenses", def: "C-10: thầu điện. C-46: thầu solar — rào cản cho đối thủ tự lắp; dealer không bắt buộc." },
    { term: "Solar Mandate", en: "Bắt buộc solar nhà mới", def: "CA yêu cầu solar trên nhà mới từ 2020; Title 24/2025 khuyến khích thêm battery." },
    { term: "Dealer", en: "Đại lý", def: "Mô hình CaliSolar — rào cản vào ngành thấp hơn installer có license." },
  ],
  porter: [
    { term: "Porter's Five Forces", en: "5 lực lượng Porter", def: "Khung đánh giá áp lực cạnh tranh: nội bộ ngành, đối thủ mới, nhà cung cấp, khách hàng, thay thế." },
    { term: "ITC", en: "Investment Tax Credit", def: "Hết hạn residential → consolidation; TPO/PPA vẫn hưởng ITC thương mại." },
    { term: "Consolidation", en: "Tập trung ngành", def: "Công ty nhỏ rời thị trường hoặc M&A khi margin bị ép & incentive giảm." },
    { term: "Dealer vs Installer", en: "Đại lý vs Lắp đặt", def: "Dealer: không cần C-10, rào cản thấp. Installer: cần license, rào cản cao." },
    { term: "C-10", en: "Electrical license", def: "License CA cho công ty tự thi công — rào cản đối thủ mới (lực lượng 2)." },
    { term: "EPC", en: "Engineering, Procurement, Construction", def: "Đối tác thi công; phụ thuộc 1 EPC → quyền lực nhà cung cấp cao (lực lượng 3)." },
    { term: "Panel / Inverter", en: "Thiết bị chính", def: "Nhiều nhà cung cấp → quyền lực supplier thấp với thiết bị; cao hơn với lao động có license." },
    { term: "Close rate", en: "Tỷ lệ chốt", def: "Tỷ lệ lead thành hợp đồng — financing partner ảnh hưởng trực tiếp." },
    { term: "Switching cost", en: "Chi phí chuyển đổi", def: "= 0 trước ký hợp đồng → quyền lực khách hàng cao (lực lượng 4)." },
    { term: "EnergySage", en: "Marketplace", def: "So sánh quotes online; engagement +205% — minh bạch giá, ép margin." },
    { term: "SolarReviews", en: "Review platform", def: "Trang đánh giá installer — cùng EnergySage tăng áp lực minh bạch giá." },
    { term: "National avg", en: "Trung bình quốc gia", def: "Giá $/W trung bình Mỹ ~$3.00; CA ~$2.39 do cạnh tranh địa phương." },
    { term: "Community solar", en: "Solar cộng đồng", def: "Thuê quota từ farm solar — thay thế yếu cho chủ nhà có mái riêng tại CA." },
    { term: "HVAC / Roofing", en: "Ngành lân cận", def: "Đối thủ mới mở rộng sang solar — rào cản trung bình-cao tùy license." },
    { term: "Post-ITC", en: "Sau ITC", def: "Giai đoạn sau khi residential ITC hết — khách mặc cả mạnh, một số đối thủ rời ngành." },
  ],
  lifecycle: [
    { term: "Industry Lifecycle", en: "Vòng đời ngành", def: "Introduction → Growth → Maturity → Declation/Consolidation." },
    { term: "Mature Growth", en: "Tăng trưởng trưởng thành", def: "Giai đoạn hiện tại: thị trường lớn nhưng tốc độ chậm, margin thấp." },
    { term: "Turbulent Consolidation", en: "Hợp nhất đầy biến động", def: "Sụt 19% năm 2026 rồi phục hồi — công ty yếu rời, công ty mạnh gom thị phần." },
    { term: "Headwinds", en: "Gió ngược", def: "ITC hết, NEM 3.0, thuế quan, fixed charge CPUC, residential -19% (2026)." },
    { term: "Tailwinds", en: "Gió thuận", def: "Giá điện +83%/10 năm, TPO/PPA + ITC thương mại, battery +51% YoY, +7%/năm từ 2027." },
    { term: "ITC", en: "Investment Tax Credit", def: "Hết residential → ROI yếu; ITC thương mại vẫn hỗ trợ TPO/PPA." },
    { term: "NEM 3.0", en: "Net Billing", def: "Giảm giá trị export điện dư — headwind cho chỉ lắp panel không pin." },
    { term: "CPUC / Fixed charge", en: "Phí cố định", def: "Phí hàng tháng mới — headwind cho economics solar mới." },
    { term: "TPO / PPA", en: "Sở hữu bên thứ ba", def: "Tailwind vì vẫn hưởng ITC thương mại đến ~2027." },
    { term: "Residential solar", en: "Solar dân dụng", def: "Phân khúc báo cáo giảm 19% năm 2026 (SEIA/Wood Mackenzie)." },
    { term: "ROI", en: "Return on Investment", def: "Lợi tức đầu tư — yếu hơn post-ITC nếu mua outright không có tax credit." },
    { term: "Battery storage", en: "Pin lưu trữ", def: "Tăng 51% YoY — tailwind cho solar+battery bundle." },
    { term: "Consolidation", en: "Tập trung", def: "Ít đối thủ hơn sau 2026 — cơ hội cho công ty sống sót." },
    { term: "GWdc", en: "Gigawatt DC", def: "Dự báo thêm 60+ GWdc lắp đặt solar Mỹ 2026–2036." },
    { term: "YoY", en: "Year over Year", def: "So sánh theo năm — dùng trong thống kê pin & thị trường." },
  ],
  competitors: [
    { term: "National installer", en: "Công ty quốc gia", def: "Sunrun, Momentum — scale, financing, marketing toàn Mỹ." },
    { term: "Regional installer", en: "Công ty khu vực", def: "NRG Clean Power, Stellar, LA Solar — mạnh uy tín địa phương CA/SD/LA." },
    { term: "TPO / PPA", en: "Cho thuê / mua điện", def: "Khách không sở hữu hệ thống; Sunrun dẫn đầu mô hình này." },
    { term: "ITC", en: "Investment Tax Credit", def: "Đối thủ bị phàn nàn misrepresenting ITC (Momentum) — rủi uy tín ngành." },
    { term: "Threat level", en: "Mức đe dọa (1–5)", def: "Đánh giá nội bộ mức độ ảnh hưởng tới CaliSolar." },
    { term: "Installer", en: "Nhà lắp đặt", def: "Đơn vị thi công & bán trực tiếp — khác dealer như CaliSolar." },
    { term: "Warranty", en: "Bảo hành", def: "25-year panel, 20-year workmanship — tiêu chí so sánh đối thủ." },
    { term: "Tesla-certified", en: "Chứng nhận Tesla", def: "LA Solar Group — lắp Powerwall/panel Tesla." },
    { term: "Overpromising", en: "Hứa quá mức", def: "Phóng đại tiết kiệm/ITC — điểm yếu LA Solar, Momentum." },
    { term: "Lease", en: "Thuê hệ thống", def: "Tương tự TPO — không tăng giá trị nhà khi bán (vs solar-owned)." },
  ],
  journey: [
    { term: "Path to Purchase", en: "Hành trình mua", def: "7 giai đoạn: Trigger → Research → Compare → Evaluate → Decide → Install → Advocate." },
    { term: "Bill Shock", en: "Sốc hóa đơn", def: "Trigger #1 (~45%): hóa đơn SCE $300–500+ mùa hè." },
    { term: "TOU / Peak rate", en: "Giờ cao điểm", def: "Giá điện peak có thể ~70¢/kWh — thúc đẩy solar + pin." },
    { term: "PSPS", en: "Public Safety Power Shutoff", def: "Cắt điện phòng cháy rừng — trigger resilience (~20%)." },
    { term: "ITC", en: "Investment Tax Credit", def: "Tin ITC hết hạn kích hoạt urgency trong giai đoạn Trigger/Research." },
    { term: "NEM 3.0", en: "Net Billing", def: "Homeowner search & evaluate battery vì export điện dư rẻ." },
    { term: "SCE", en: "Southern California Edison", def: "Utility trên bill shock và tin tức tăng giá." },
    { term: "SEO", en: "Search Engine Optimization", def: "Quyết định ai xuất hiện khi Google 'solar cost California'." },
    { term: "Content marketing", en: "Marketing nội dung", def: "Blog/video giáo dục — quan trọng giai đoạn Research." },
    { term: "Quote", en: "Báo giá", def: "Homeowner so 3–5 quotes trong giai đoạn Compare (7–21 ngày)." },
    { term: "EnergySage", en: "Marketplace", def: "So sánh quotes online, giá thường thấp ~20% vs direct." },
    { term: "SolarReviews", en: "Review site", def: "Đánh giá installer chi tiết — giai đoạn Compare." },
    { term: "Yelp / BBB", en: "Review & rating", def: "Nền tảng uy tín khi Google 'solar company near me'." },
    { term: "NABCEP", en: "Certification", def: "Tiêu chí đánh giá installer trong giai đoạn Evaluate." },
    { term: "ROI", en: "Return on Investment", def: "Projection tiết kiệm phải realistic — tránh overpromise." },
    { term: "PPA", en: "Power Purchase Agreement", def: "Financing $0 down — quan trọng post-ITC khi Decide." },
    { term: "Loan", en: "Vay mua hệ thống", def: "Homeowner sở hữu hệ thống; cần terms chấp nhận được." },
    { term: "PTO", en: "Permission to Operate", def: "Chờ utility bật hệ thống sau lắp — pain point Install (3–12 tuần)." },
    { term: "WOM / Referral", en: "Truyền miệng", def: "Advocate: review & giới thiệu hàng xóm — conversion cao nhất." },
    { term: "Close rate", en: "Tỷ lệ chốt", def: "Phụ thuộc financing & trust ở giai đoạn Decide." },
    { term: "Homeowner", en: "Chủ nhà", def: "Chủ thể toàn bộ hành trình — chủ động đến khi gặp salesperson." },
  ],
  consumer: [
    { term: "Google Business", en: "Hồ sơ Google", def: "Kênh review chính — 50+ reviews ≈ 3x organic leads." },
    { term: "Yelp", en: "Review platform", def: "Một trong các nền tảng homeowner kiểm tra trước khi ký." },
    { term: "SolarReviews", en: "Review site", def: "Chuyên solar — trong top nguồn thông tin (rank #2 online reviews)." },
    { term: "EnergySage", en: "Marketplace", def: "So sánh quotes; không có mặt = mất Smart Investor & Bill Shocked." },
    { term: "WOM / Referral", en: "Truyền miệng", def: "88% tin ngang referral; referral bắt đầu câu chuyện, Google viết tiếp." },
    { term: "NEM 3.0", en: "Net Billing", def: "Làm battery gần bắt buộc; export không pin ~$0.04–0.10/kWh." },
    { term: "ITC", en: "Investment Tax Credit", def: "Post-ITC: PPA/TPO $0 down quan trọng hơn; overpromise ITC gây distrust." },
    { term: "PPA / TPO", en: "Không sở hữu hệ thống", def: "PPA trả theo kWh; TPO/lease — không tăng giá trị nhà khi bán." },
    { term: "Loan / Cash", en: "Sở hữu hệ thống", def: "Loan hoặc trả cash — solar-owned, tăng giá nhà ~6.8%." },
    { term: "Prepaid TPO", en: "Trả trước TPO", def: "Một trong các lựa chọn financing trong decision factors." },
    { term: "ROI", en: "Return on Investment", def: "Yếu tố #2 quyết định; projection phải realistic." },
    { term: "NPV", en: "Net Present Value", def: "Smart Investor dùng NPV calculator khi research." },
    { term: "CSLB", en: "License board", def: "Tra license C-10/C-46 — yếu tố #3 uy tín installer." },
    { term: "NABCEP", en: "Certification", def: "Chứng chỉ lắp đặt — tiêu chí trust trong Evaluate." },
    { term: "SGIP", en: "Battery rebate", def: "Chương trình rebate pin CA — giảm $10–15K battery." },
    { term: "Workmanship warranty", en: "Bảo hành thi công", def: "Thường 10 năm; transferable khi bán nhà." },
    { term: "Solar-owned", en: "Sở hữu hệ thống", def: "Tăng ~6.8% giá nhà; khác lease/TPO." },
    { term: "Close rate", en: "Tỷ lệ chốt", def: "Công ty offer nhiều financing options → close rate cao hơn." },
    { term: "PTO", en: "Permission to Operate", def: "Cửa sổ 7 ngày sau PTO — thời điểm tốt nhất xin review." },
    { term: "TOU", en: "Time-of-Use", def: "Usage shifting: dùng máy ban ngày, tránh peak 4–9 PM." },
    { term: "Enphase / SolarEdge / Tesla", en: "Monitoring brands", def: "App theo dõi production — thói quen sau lắp đặt." },
    { term: "EV", en: "Electric Vehicle", def: "Green Conscious segment — sạc xe, whole-home electrification." },
    { term: "CRM", en: "Customer Relationship Management", def: "Door-to-door 2026 tích hợp CRM, data-driven canvassing." },
    { term: "Cost-per-lead", en: "Chi phí mỗi lead", def: "Facebook/IG ads: CPL cao nhưng volume lớn." },
    { term: "PG&E / SCE", en: "Utilities", def: "Utility không endorse installer nhưng homeowner tra rate info." },
    { term: "Social proof", en: "Bằng chứng xã hội", def: "Bill Shocked segment cần proof trước khi tin sales." },
    { term: "Overpromise", en: "Hứa quá mức", def: "#1 lý do bad reviews & distrust toàn ngành." },
  ],
  strategy: [
    { term: "Social proof", en: "Bằng chứng xã hội", def: "Mục tiêu 50+ Google reviews, rating 4.5+, respond trong 24h." },
    { term: "Organic leads", en: "Lead tự nhiên", def: "Khách đến từ SEO/review — 50+ reviews ≈ 3x organic." },
    { term: "EnergySage", en: "Marketplace", def: "Action item: đăng ký — 45% segment Compare dùng platform." },
    { term: "ITC", en: "Investment Tax Credit", def: "TPO vẫn hưởng ITC thương mại đến 2027 — messaging 'không cần tax credit'." },
    { term: "TPO / PPA", en: "Sở hữu bên thứ ba", def: "Post-ITC messaging chính cho homeowner không đủ tax liability." },
    { term: "NEM 3.0", en: "Net Billing", def: "Bundling solar+battery: export vs self-use peak 70¢/kWh." },
    { term: "SCE", en: "Southern California Edison", def: "Messaging giá điện +83%/10 năm thay vì chỉ ITC." },
    { term: "ROI", en: "Return on Investment", def: "Xoay messaging quanh lock giá điện, không overpromise ITC." },
    { term: "Bundling", en: "Solar + Battery", def: "Educate gap 73% muốn pin vs 40% mua." },
    { term: "SGIP", en: "Battery rebate", def: "Hỗ trợ giảm chi phí pin trong gói bundling." },
    { term: "PTO", en: "Permission to Operate", def: "Xin review trong 7 ngày đầu sau PTO." },
    { term: "Referral program", en: "Chương trình giới thiệu", def: "$250–500/referral; kết hợp realtor & roofer." },
    { term: "WOM", en: "Word of Mouth", def: "Referral = conversion rate cao nhất — ưu tiên sau trải nghiệm tốt." },
    { term: "EPC", en: "Engineering, Procurement, Construction", def: "Phụ thuộc 1 EPC (Simple Power) — rủi ro cần khắc phục." },
    { term: "Dealer", en: "Mô hình đại lý", def: "Điểm mạnh: nhẹ vốn, scale; financing đa dạng." },
    { term: "SEO", en: "Search optimization", def: "Điểm yếu hiện tại — cần cải thiện digital presence." },
    { term: "kWh", en: "Kilowatt-hour", def: "Đơn vị trong messaging export $0.04–0.10 vs self-use peak." },
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
    icon: "✍️", color: "#F4A623", bgColor: "rgba(244,166,35,0.08)",
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

const segments = [
  { name: "The Bill Shocked", pct: "40-45%", tag: "PRIMARY", tagColor: "#F4A623", profile: "Homeowner 35-55 tuổi, hóa đơn $200-500+/tháng", trigger: "Mở bill mùa hè, shock bởi TOU peak rate", research: "Google 'why is my electric bill so high' → 'solar cost CA'", financing: "$0 down, PPA hoặc loan — muốn savings ngay ngày 1", barrier: "'Có thật không hay sales trick?' → cần social proof", channel: "Google Ads bill keywords, Facebook savings calculator" },
  { name: "The Resilience Seeker", pct: "20-25%", tag: "GROWING", tagColor: "#2E7D32", profile: "Homeowner 40-65 tuổi, khu vực hay mất điện", trigger: "Trải qua PSPS event hoặc mất điện nhiều ngày", research: "Tìm 'solar battery backup', Tesla Powerwall", financing: "Sẵn sàng trả premium cho battery system", barrier: "Giá battery cao ($10-15K thêm), phức tạp kỹ thuật", channel: "Content marketing backup power, referral sau mất điện" },
  { name: "The Smart Investor", pct: "15-20%", tag: "ANALYTICAL", tagColor: "#1565C0", profile: "Homeowner 30-50, research-heavy, tính ROI kỹ", trigger: "So sánh ROI solar vs các khoản đầu tư khác", research: "EnergySage 5+ quotes, forum, NPV calculator", financing: "Cash hoặc loan — muốn sở hữu để tăng giá trị nhà (+6.8%)", barrier: "Post-ITC ROI yếu hơn → cần data convincing", channel: "EnergySage marketplace, SEO content với calculator" },
  { name: "The Green Conscious", pct: "10-15%", tag: "VALUES", tagColor: "#00695C", profile: "Homeowner 25-45 tuổi, có EV, quan tâm môi trường", trigger: "Giá trị cá nhân, cam kết bền vững", research: "Blog xanh, cộng đồng EV, social media", financing: "Linh hoạt — sẵn sàng trả thêm cho 'clean' option", barrier: "Ít nhạy cảm giá nhưng vẫn cần ROI hợp lý", channel: "Instagram/TikTok, partnership EV dealers" },
  { name: "The New Homebuyer", pct: "5-10%", tag: "EMERGING", tagColor: "#6A1B9A", profile: "Mới mua nhà tại CA, shock giá điện lần đầu", trigger: "Hóa đơn SCE đầu tiên + neighbor/realtor recommend", research: "Hỏi realtor, search online, quyết định nhanh", financing: "Cần education về options, thường chọn PPA", barrier: "Thiếu hiểu biết, sợ commitment dài hạn", channel: "Realtor partnerships, local community groups" },
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

  const sectionWrap = { scrollMarginTop: "72px", marginBottom: "64px", paddingTop: "8px" };
  const card = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "24px", marginBottom: "16px" };
  const h2 = { fontSize: "28px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px", color: "#F5F0E8" };
  const h3 = { fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#F5F0E8" };
  const body = { fontSize: "14px", lineHeight: "1.7", color: "rgba(245,240,232,0.75)" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0D0D0D", color: "#F5F0E8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F4A623" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>CaliSolar · Industry Research</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, margin: "0 0 8px" }}>
            Phân Tích Ngành Solar<br /><span style={{ color: "#F4A623" }}>Residential California 2026</span>
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(245,240,232,0.45)", margin: 0 }}>PESTEL · Porter's 5 Forces · Path to Purchase · Consumer Deep Dive</p>
        </div>
      </div>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#0D0D0D", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", gap: "4px", overflowX: "auto" }}>
          {sections.map(s => (
            <button key={s.id} type="button" onClick={() => scrollToSection(s.id)} style={{ background: active === s.id ? "rgba(244,166,35,0.12)" : "transparent", border: "none", color: active === s.id ? "#F4A623" : "rgba(245,240,232,0.4)", padding: "14px 14px", fontSize: "13px", fontWeight: active === s.id ? 700 : 500, cursor: "pointer", borderBottom: active === s.id ? "2px solid #F4A623" : "2px solid transparent", whiteSpace: "nowrap", fontFamily: "inherit" }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* ===== OVERVIEW ===== */}
        <section id="overview" style={sectionWrap}>
          <h2 style={h2}>Tổng Quan CaliSolar & Chuỗi Giá Trị</h2>
          <TermGlossary terms={glossaryBySection.overview} />
          <p style={{ ...body, marginBottom: "24px" }}>CaliSolar hoạt động với mô hình <strong style={{ color: "#F4A623" }}>authorized dealer</strong> — tư vấn, thiết kế, financing, hỗ trợ khách hàng. Lắp đặt do Simple Power (CA C-10 #1,111,652) thực hiện.</p>
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Chuỗi Giá Trị Solar Residential</span>
            </div>
            <div style={{ padding: "24px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "center" }}>
              {["Nhà SX Panel", "Phân phối", "Dealer/Installer", "Financing", "O&M"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, background: i === 2 ? "rgba(244,166,35,0.15)" : "rgba(255,255,255,0.04)", border: i === 2 ? "1px solid #F4A623" : "1px solid rgba(255,255,255,0.06)", color: i === 2 ? "#F4A623" : "rgba(245,240,232,0.6)" }}>
                    {s}{i === 2 && <span style={{ display: "block", fontSize: "10px", fontWeight: 400, opacity: 0.7 }}>← CaliSolar</span>}
                  </div>
                  {i < 4 && <span style={{ color: "rgba(245,240,232,0.2)", fontSize: "18px" }}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "24px" }}>
            {[{ n: "132+", l: "Installations", s: "CA verified" }, { n: "$2.39", l: "$/Watt CA avg", s: "20% dưới national" }, { n: "34.5¢", l: "SCE rate/kWh", s: "+83% trong 10 năm" }, { n: "-19%", l: "Dự báo 2026", s: "Sụt giảm residential" }].map((x, i) => (
              <div key={i} style={card}><div style={{ fontSize: "28px", fontWeight: 800, color: i === 3 ? "#C62828" : "#F4A623", letterSpacing: "-1px" }}>{x.n}</div><div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F0E8", marginTop: "4px" }}>{x.l}</div><div style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", marginTop: "2px" }}>{x.s}</div></div>
            ))}
          </div>
        </section>

        {/* ===== PESTEL ===== */}
        <section id="pestel" style={sectionWrap}>
          <h2 style={h2}>Phân Tích PESTEL</h2>
          <TermGlossary terms={glossaryBySection.pestel} />
          <p style={{ ...body, marginBottom: "24px" }}>6 yếu tố vĩ mô ảnh hưởng ngành solar residential California 2026.</p>
          {pestelData.map((cat, ci) => (
            <div key={ci} style={{ ...card, borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, flexShrink: 0 }}>{cat.letter}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: "16px", fontWeight: 700 }}>{cat.title}</div><div style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>{cat.items.length} yếu tố</div></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{cat.items.map((it, ii) => (
                <div key={ii} style={{ padding: "16px", borderRadius: "6px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}><Badge type={it.impact}>{it.impact === "critical" ? "Nghiêm trọng" : it.impact === "high" ? "Cao" : it.impact === "opportunity" ? "Cơ hội" : "Insight"}</Badge><span style={{ fontSize: "14px", fontWeight: 700 }}>{it.headline}</span></div>
                  <p style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)", lineHeight: 1.7, margin: 0 }}>{it.detail}</p>
                </div>
              ))}</div>
            </div>
          ))}
        </section>

        {/* ===== PORTER ===== */}
        <section id="porter" style={sectionWrap}>
          <h2 style={h2}>Porter's Five Forces</h2>
          <TermGlossary terms={glossaryBySection.porter} />
          <p style={{ ...body, marginBottom: "24px" }}>5 lực lượng cạnh tranh trong ngành solar residential California.</p>
          {porterData.map((f, fi) => (
            <div key={fi} style={{ ...card, borderLeft: `3px solid ${f.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{f.force}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><ForceBar level={f.level} color={f.color} /><span style={{ fontSize: "11px", fontWeight: 700, color: f.color }}>{f.levelLabel}</span></div>
              </div>
              <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>{f.points.map((p, pi) => <li key={pi} style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{p}</li>)}</ul>
            </div>
          ))}
        </section>

        {/* ===== LIFECYCLE ===== */}
        <section id="lifecycle" style={sectionWrap}>
          <h2 style={h2}>Giai Đoạn Vòng Đời Ngành</h2>
          <TermGlossary terms={glossaryBySection.lifecycle} />
          <div style={{ ...card, borderLeft: "3px solid #F4A623" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#F4A623", marginBottom: "8px" }}>Kết luận</div>
            <h3 style={{ ...h3, fontSize: "20px" }}>Mature Growth → Turbulent Consolidation</h3>
            <p style={body}>2026 sụt giảm 19%. Phục hồi 7%/năm từ 2027-2030. Dài hạn: thêm 60+ GWdc tại Mỹ từ 2026-2036. Ai sống sót qua 2026 sẽ hưởng lợi lớn.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={card}><h3 style={{ ...h3, color: "#C62828" }}>Headwinds</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>ITC hết hạn → ROI yếu hơn</li><li>Thuế quan tăng giá thiết bị</li><li>NEM 3.0 giảm giá trị export</li><li>Fixed charge CPUC mới</li><li>Residential giảm 19% năm 2026</li></ul></div>
            <div style={card}><h3 style={{ ...h3, color: "#2E7D32" }}>Tailwinds</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Giá điện +83%/10 năm, +12.9% năm 2026</li><li>TPO/PPA vẫn được hưởng ITC</li><li>Battery storage +51% YoY</li><li>Consolidation → ít đối thủ hơn</li><li>Phục hồi 7%/năm từ 2027</li></ul></div>
          </div>
        </section>

        {/* ===== COMPETITORS ===== */}
        <section id="competitors" style={sectionWrap}>
          <h2 style={h2}>Đối Thủ Cạnh Tranh</h2>
          <TermGlossary terms={glossaryBySection.competitors} />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {competitorData.map((c, ci) => (
              <div key={ci} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div><div style={{ fontSize: "16px", fontWeight: 700 }}>{c.name}</div><div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}><span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "3px", background: "rgba(255,255,255,0.06)", color: "rgba(245,240,232,0.5)", fontWeight: 600 }}>{c.type}</span><span style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>{c.rating}</span></div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: "10px", color: "rgba(245,240,232,0.4)", marginBottom: "4px" }}>Mức đe dọa</div><ThreatDots level={c.threat} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#2E7D32", letterSpacing: "0.5px", marginBottom: "4px" }}>THẾ MẠNH</div><div style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{c.strengths}</div></div>
                  <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#C62828", letterSpacing: "0.5px", marginBottom: "4px" }}>ĐIỂM YẾU</div><div style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{c.weaknesses}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PATH TO PURCHASE INFOGRAPHIC ===== */}
        <section id="journey" style={sectionWrap}>
          <h2 style={h2}>Path to Purchase</h2>
          <TermGlossary terms={glossaryBySection.journey} />
          <p style={{ ...body, marginBottom: "8px" }}>Hành trình 7 giai đoạn từ kích hoạt nhu cầu đến trở thành người giới thiệu. Tổng timeline: 2-8 tuần (Trigger → Decision) + 3-12 tuần (Install → PTO).</p>
          <p style={{ fontSize: "12px", color: "rgba(245,240,232,0.35)", marginBottom: "32px" }}>Cuộn xuống để xem chi tiết từng giai đoạn — hoặc dùng menu phía trên để nhảy nhanh.</p>

          {/* VISUAL JOURNEY LINE */}
          <div style={{ position: "relative", marginBottom: "40px" }}>
            <div style={{ position: "absolute", top: "24px", left: "24px", right: "24px", height: "2px", background: "linear-gradient(90deg, #C62828, #1565C0, #6A1B9A, #2E7D32, #F4A623, #00695C, #E65100)", opacity: 0.3 }} />
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
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "#F5F0E8", marginTop: "2px" }}>{s.title}</div>
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
                    <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#F5F0E8" }}>{stage.title}</h3>
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.5)", marginTop: "2px" }}>{stage.subtitle}</div>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", fontSize: "12px", fontWeight: 600, color: "rgba(245,240,232,0.5)" }}>⏱ {stage.duration}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                {stage.triggers.map((t, ti) => (
                  <div key={ti} style={{ padding: "14px", borderRadius: "6px", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#F5F0E8" }}>{t.label}</span>
                      {t.pct && <span style={{ fontSize: "12px", fontWeight: 800, color: stage.color }}>{t.pct}</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.5)", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "12px 16px", borderRadius: "6px", background: `${stage.color}15`, border: `1px solid ${stage.color}30` }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: stage.color, letterSpacing: "0.5px", marginBottom: "4px" }}>CALIFORNIA INSIGHT</div>
                <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{stage.caliBehavior}</div>
              </div>
            </div>
          ))}

          {/* TIMELINE SUMMARY */}
          <div style={{ ...card, marginTop: "24px" }}>
            <h3 style={{ ...h3, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Timeline tổng hợp</h3>
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
                  <div style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", marginTop: "4px" }}>{b.time}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", display: "flex", gap: "16px", justifyContent: "center", fontSize: "11px", color: "rgba(245,240,232,0.35)" }}>
              <span>🏷 Referral leads: 1-3 tuần total</span>
              <span>🏷 Marketplace leads: 4-8 tuần total</span>
              <span>🏷 Cold leads: 6-12 tuần total</span>
            </div>
          </div>
        </section>

        {/* ===== CONSUMER DEEP DIVE ===== */}
        <section id="consumer" style={sectionWrap}>
          <h2 style={h2}>Consumer Deep Dive</h2>
          <TermGlossary terms={glossaryBySection.consumer} />

          {/* INFO SOURCES */}
          <h3 style={{ ...h3, marginTop: "8px" }}>Nguồn thông tin tham khảo (xếp hạng)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
            {infoSources.map((src, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(244,166,35,0.1)", border: "1px solid rgba(244,166,35,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#F4A623", flexShrink: 0 }}>{src.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#F5F0E8" }}>{src.name}</span>
                      <span style={{ fontSize: "12px", color: "#F4A623" }}>{"★".repeat(src.importance)}{"☆".repeat(5 - src.importance)}</span>
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(245,240,232,0.5)", marginBottom: "6px" }}>{src.desc}</div>
                    <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>{src.detail}</div>
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
              { rank: 8, factor: "Home value impact", detail: "Solar-owned tăng 6.8% giá nhà. TPO/lease thì KHÔNG tăng. Rất quan trọng cho segment 'Smart Investor'.", pct: 45 },
            ].map((f, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: i < 3 ? "#F4A623" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: i < 3 ? "#0D0D0D" : "rgba(245,240,232,0.4)", flexShrink: 0 }}>{f.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#F5F0E8" }}>{f.factor}</div>
                    <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.5)", lineHeight: 1.5, marginTop: "2px" }}>{f.detail}</div>
                  </div>
                  <div style={{ width: "60px", textAlign: "right" }}>
                    <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${f.pct}%`, background: i < 3 ? "#F4A623" : "rgba(244,166,35,0.4)", borderRadius: "3px" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "rgba(245,240,232,0.3)", marginTop: "2px" }}>{f.pct}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEGMENTS */}
          <h3 style={h3}>Phân khúc khách hàng California 2026</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {segments.map((seg, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "3px", background: seg.tagColor, fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px" }}>{seg.tag}</span>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#F5F0E8" }}>{seg.name}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: seg.tagColor, marginLeft: "auto" }}>{seg.pct}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {[{ l: "Hồ sơ", v: seg.profile }, { l: "Trigger", v: seg.trigger }, { l: "Hành vi research", v: seg.research }, { l: "Financing preference", v: seg.financing }, { l: "Rào cản chính", v: seg.barrier }, { l: "Kênh hiệu quả", v: seg.channel }].map((f, fi) => (
                    <div key={fi}><div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(245,240,232,0.35)", letterSpacing: "0.5px", marginBottom: "3px", textTransform: "uppercase" }}>{f.l}</div><div style={{ fontSize: "13px", color: "rgba(245,240,232,0.6)", lineHeight: 1.5 }}>{f.v}</div></div>
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
              <div key={i} style={card}><div style={{ fontSize: "14px", fontWeight: 700, color: "#F5F0E8", marginBottom: "6px" }}>{h.title}</div><div style={{ fontSize: "13px", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>{h.desc}</div></div>
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
        </section>

        {/* ===== STRATEGY ===== */}
        <section id="strategy" style={sectionWrap}>
          <h2 style={h2}>Tóm Tắt Chiến Lược</h2>
          <TermGlossary terms={glossaryBySection.strategy} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            <div style={card}><h3 style={{ ...h3, color: "#2E7D32" }}>✅ Điểm mạnh CaliSolar</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Mô hình dealer nhẹ vốn, dễ scale</li><li>Financing đa dạng (PPA, Loan, Purchase)</li><li>24/7 monitoring, 100% transferable</li><li>Một đầu mối liên lạc</li><li>$0 down for qualified homeowners</li></ul></div>
            <div style={card}><h3 style={{ ...h3, color: "#C62828" }}>⚠️ Cần khắc phục</h3><ul style={{ margin: 0, paddingLeft: "16px", ...body }}><li>Quy mô nhỏ (132 installs) → thiếu social proof</li><li>Phụ thuộc 1 EPC (Simple Power)</li><li>Digital presence / SEO yếu</li><li>Chưa có trên EnergySage marketplace</li><li>Review online ít</li></ul></div>
          </div>

          <div style={card}>
            <h3 style={{ ...h3, color: "#F4A623" }}>🎯 Action Items ưu tiên</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Build social proof ngay", desc: "Mục tiêu 50+ Google reviews. Yêu cầu review trong 7 ngày sau PTO. Respond 100% reviews trong 24h. Rating 4.5+ = 3x organic leads." },
                { title: "Đăng ký EnergySage marketplace", desc: "45% segment 'Compare' dùng EnergySage. Không có mặt = mất khách Smart Investor và Bill Shocked." },
                { title: "TPO/PPA messaging post-ITC", desc: "TPO vẫn hưởng ITC đến 2027. Messaging: 'Bạn không cần tax credit — chúng tôi sở hữu hệ thống, bạn hưởng tiết kiệm từ ngày 1'." },
                { title: "Solar + Battery bundling", desc: "NEM 3.0: không pin = export $0.04-0.10/kWh. Có pin = self-use $0.70/kWh peak. Educate gap 73% muốn → 40% mua." },
                { title: "SCE rate messaging", desc: "'Giá điện tăng 83% trong 10 năm. Lock giá năng lượng hôm nay.' Messaging ROI xoay quanh giá điện, không phải ITC." },
                { title: "Referral program", desc: "Referral = highest conversion rate. Tạo incentive program: $250-500/referral cho khách hiện tại. Kết hợp realtor/roofer partnerships." },
              ].map((o, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: "6px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#F5F0E8", marginBottom: "6px" }}>{o.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "32px", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", color: "rgba(245,240,232,0.25)" }}>
            Nguồn: SEIA/Wood Mackenzie 2025 YiR, McKinsey, EnergySage H2 2025, OhmSnap CA Market Data, SCE Rate Advisory, CPUC, SurgePV, Bodhi Solar, WebFX, Solar.com. Phân tích cho CaliSolar — Tháng 6/2026.
          </div>
        </section>

      </div>
    </div>
  );
}
