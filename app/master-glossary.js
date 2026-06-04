/** Định nghĩa đầy đủ cho bảng thuật ngữ cuối báo cáo */
export const masterGlossary = [
  {
    term: "$/W",
    en: "Dollar per Watt",
    def: "Chỉ số chuẩn để so sánh giá lắp đặt solar: tổng chi phí hệ thống (thiết bị + lao động + permit) chia cho công suất DC (W). California thường ~$2.39/W — thấp hơn trung bình Mỹ ~$3.00/W vì cạnh tranh installer dày. Khi ITC hết hạn, homeowner nhìn $/W và payback thay vì chỉ % giảm thuế.",
  },
  {
    term: "APR",
    en: "Annual Percentage Rate",
    def: "Lãi suất năm thực tế trên khoản vay solar (bao gồm phí), thường quanh ~5.5% trong báo cáo. APR cao làm tăng thanh toán hàng tháng và kéo dài thời gian hoàn vốn — đối thủ dùng PPA/TPO để tránh vay ngân hàng. Sales cần minh bạch APR vs tiết kiệm hóa đơn để tránh overpromise.",
  },
  {
    term: "Authorized dealer",
    en: "Đại lý ủy quyền",
    def: "Đơn vị được hãng panel/inverter hoặc thương hiệu quốc gia chỉ định bán và tư vấn, thường không tự thi công mà giao EPC có license. Mô hình CaliSolar: giảm capex license C-10, tập trung sales + CRM, nhưng phụ thuộc chất lượng EPC và warranty chuyển nhượng.",
  },
  {
    term: "Bill Shock",
    en: "Sốc hóa đơn",
    def: "Khoảnh khắc homeowner thấy hóa đơn SCE/PG&E tăng đột biến (ví dụ $300–500+ mùa hè) và bắt đầu tìm solar. Đây là trigger chính ở giai đoạn Awareness trong Path to Purchase — marketing nên bám TOU peak và lịch sử tiêu thụ, không chỉ slogan chung.",
  },
  {
    term: "Bundling",
    en: "Gói sản phẩm",
    def: "Bán solar kèm pin lưu trữ, EV charger, hoặc hiệu quả năng lượng trong một proposal. Sau NEM 3.0, bundling battery là cách tối đa giá trị vì export điện dư rẻ; 73% quan tâm pin nhưng chỉ ~40% mua — cơ hội educate và financing gói.",
  },
  {
    term: "C-10 / C-46",
    en: "CSLB licenses",
    def: "C-10: license thầu điện (Electrical) — bắt buộc cho installer tự lắp tại CA. C-46: license solar chuyên biệt. Dealer không có license vẫn bán được nhưng phải thuê EPC có C-10/C-46; vi phạm = rủi ro pháp lý và mất PTO.",
  },
  {
    term: "Close rate",
    en: "Tỷ lệ chốt",
    def: "Tỷ lệ % lead hoặc appointment chuyển thành hợp đồng ký. Phụ thuộc financing (APR), social proof (reviews), và độ tin installer. Post-ITC, close rate thường giảm nếu không điều chỉnh ROI messaging sang payback + giá điện tăng.",
  },
  {
    term: "Community solar",
    en: "Solar cộng đồng",
    def: "Khách thuê hoặc mua quota điện từ farm solar từ xa, không lắp trên mái nhà. Thay thế yếu cho homeowner có mái phù hợp và muốn sở hữu tài sản; Porter ghi nhận áp lực thấp–trung bình vì không giải quyết backup/PSPS như hệ onsite.",
  },
  {
    term: "Consolidation",
    en: "Tập trung ngành",
    def: "Giai đoạn công ty nhỏ phá sản, rời thị trường, hoặc M&A khi margin bị nén và ITC residential hết. Tạo cơ hội cho dealer có review tốt giành thị phần organic; đồng thời tăng cạnh tranh từ national brand còn sót.",
  },
  {
    term: "CPUC",
    en: "CA Public Utilities Commission",
    def: "Cơ quan điều tiết utility tại California: phê duyệt biểu giá, NEM/Net Billing, Fixed Charge, và chương trình SGIP. Quyết định CPUC ảnh hưởng trực tiếp ROI solar — SEIA thường lobby chống phí cố định tăng làm giảm incentive khách mới.",
  },
  {
    term: "CRM",
    en: "Customer Relationship Management",
    def: "Phần mềm theo dõi lead → appointment → proposal → install → referral. Với sales cycle dài (vài tuần đến vài tháng), CRM giúp nurture sau bill shock và không mất lead khi homeowner so sánh 3–5 báo giá trên EnergySage.",
  },
  {
    term: "CSLB",
    en: "Contractors State License Board",
    def: "Cơ quan cấp và giám sát license thầu (gồm C-10, C-46) tại CA. Khách nên verify license trước ký HĐ; đối thủ uy tín nhấn mạnh điều này trong Evaluation. Dealer phải hiển thị EPC partner có license hợp lệ.",
  },
  {
    term: "Dealer",
    en: "Đại lý / nhà phân phối",
    def: "Tổ chức tập trung bán hàng, marketing, financing — thường outsource lắp đặt cho EPC. Rào cản gia nhập thấp hơn installer tích hợp; rủi ro là chất lượng thi công phụ thuộc đối tác và reputation dính vào một EPC yếu.",
  },
  {
    term: "EPC",
    en: "Engineering, Procurement, Construction",
    def: "Đối tác thiết kế hệ thống, mua panel/inverter, xin permit, thi công và bàn giao PTO. Quyền lực nhà cung cấp cao nếu dealer chỉ có một EPC; đa EPC theo vùng giúp giảm bottleneck và cải thiện timeline install.",
  },
  {
    term: "EnergySage",
    en: "Solar marketplace",
    def: "Nền tảng so sánh báo giá online — engagement tăng mạnh, làm minh bạch giá và tăng quyền lực khách (Porter: buyer power cao). CaliSolar cần profile đầy đủ, phản hồi nhanh quote request, và proposal cạnh tranh vì switching cost ≈ 0 trước ký HĐ.",
  },
  {
    term: "EV",
    en: "Electric Vehicle",
    def: "Xe điện tăng tiêu thụ điện nhà — segment khách quan tâm năng lượng xanh, thường open với solar + battery + charger bundle. TOU peak 4–9 PM trùng với về nhà sạc EV → pin lưu trữ giải thích dễ hơn chỉ với panel.",
  },
  {
    term: "Financing",
    en: "Tài trợ",
    def: "Các hình thức trả cho hệ solar: cash, loan (solar-owned), lease, PPA, TPO. Chi phí vốn (APR) và ITC eligibility quyết định sản phẩm bán được. Post-ITC residential, TPO/PPA thương mại ITC đến 2027 vẫn là vũ khí đối thủ national.",
  },
  {
    term: "Fixed Charge",
    en: "Phí cố định hàng tháng",
    def: "Khoản phí trên hóa đơn điện không phụ thuộc kWh tiêu thụ, do CPUC cho phép utility thu. Làm giảm phần tiết kiệm từ offset điện — homeowner mới cần mô hình tài chính tính cả Fixed Charge + NEM 3.0 + battery.",
  },
  {
    term: "GWdc",
    en: "Gigawatt DC",
    def: "Đơn vị công suất lắp đặt solar quy mô lớn (1 GW = 1 tỷ watt DC). Dùng trong báo cáo ngành/SEIA; giúp so sánh tăng trưởng thị trường CA vs quốc gia, không dùng trực tiếp trong proposal residential.",
  },
  {
    term: "Headwinds",
    en: "Gió ngược",
    def: "Yếu tố kìm tăng trưởng: ITC hết, NEM 3.0, thuế quan, consolidation. Chiến lược CaliSolar cần offset bằng tailwinds (giá điện, PSPS, mandate) và differentiation (review, local EPC).",
  },
  {
    term: "Homeowner",
    en: "Chủ nhà",
    def: "Khách hàng cuối sở hữu nhà ở — quyết định mua dựa trên chi phí ban đầu, tiết kiệm dài hạn, và uy tín installer hơn slogan môi trường. Persona trong Consumer Deep Dive: bill shock, so sánh 3+ quote, cần social proof.",
  },
  {
    term: "Installer",
    en: "Nhà lắp đặt",
    def: "Công ty thi công trực tiếp, giữ license C-10/C-46, chịu trách nhiệm permit và workmanship. So với dealer: margin thấp hơn trên $/W nhưng kiểm soát chất lượng tốt hơn; national installer thường scale financing + brand.",
  },
  {
    term: "ITC",
    en: "Investment Tax Credit",
    def: "Tín dụng thuế liên bang khấu trừ % chi phí hệ solar. Residential Section 25D 30% đã hết 31/12/2025 — SEIA dự báo residential sụt ~19% năm 2026. Commercial ITC vẫn hỗ trợ TPO/PPA; messaging sales phải chuyển sang payback và giá utility.",
  },
  {
    term: "kWh",
    en: "Kilowatt-hour",
    def: "Đơn vị năng lượng điện trên hóa đơn (tiêu thụ và export). NEM 3.0 định giá export kWh rất thấp so với kWh mua từ lưới — thiết kế hệ và battery sizing dựa trên profile kWh theo giờ (TOU), không chỉ tổng kWh năm.",
  },
  {
    term: "Lease / TPO",
    en: "Thuê / Third-Party Ownership",
    def: "Công ty thứ ba (thường Sunrun) sở hữu hệ trên mái khách; khách trả tiền thuê hoặc PPA rate. Khách không nhận residential ITC nhưng có thể có payment thấp hơn vay; khi bán nhà cần hiểu điều khoản chuyển nhượng lease.",
  },
  {
    term: "Loan / Cash",
    en: "Vay / Trả tiền mặt",
    def: "Homeowner sở hữu hệ (solar-owned) — tăng giá trị nhà (~6.8% theo nghiên cứu thường trích), transferable warranty quan trọng. Cash có ROI nhanh nhất; loan phổ biến nhất nhưng nhạy APR và thời gian sống loan vs payback.",
  },
  {
    term: "MW",
    en: "Megawatt",
    def: "1 triệu watt — đơn vị công suất cho commercial/utility hoặc thống kê thị trường. Residential thường 4–12 kW (kilowatt); MW dùng khi nói quy mô lắp đặt cả bang hoặc pipeline EPC lớn.",
  },
  {
    term: "NABCEP",
    en: "North American Board of Certified Energy Practitioners",
    def: "Chứng chỉ lắp đặt solar uy tín Bắc Mỹ — signal chất lượng trong giai đoạn Evaluation. Đối thủ regional (NRG Clean Power) nhấn certification; dealer có thể liệt kê NABCEP của foreman/EPC partner.",
  },
  {
    term: "NEM 2.0",
    en: "Net Energy Metering 2.0",
    def: "Chính sách cũ: điện dư từ solar offset hóa đơn gần tỷ lệ 1:1 theo kWh (trong hạn mức). Đã thay bởi NEM 3.0 từ 4/2023 — khách cũ trên NEM 2.0 có switching cost cao hơn khi nói về giá trị pin cho prospect mới.",
  },
  {
    term: "NEM 3.0",
    en: "Net Billing Tariff",
    def: "Chính sách hiện hành CA: export solar về lưới được trả ~$0.04–0.10/kWh theo giờ, thấp hơn nhiều so với giá mua điện. Buộc thiết kế self-consumption + battery; sales pitch “bán điện cho lưới” không còn đúng như NEM 2.0.",
  },
  {
    term: "NPV",
    en: "Net Present Value",
    def: "Giá trị hiện tại thuần của dòng tiền tiết kiệm điện trừ chi phí hệ — discount theo lãi suất. Công cụ so sánh cash vs loan vs PPA; post-ITC NPV giảm nên cần input giá điện tăng 83%/10 năm và Fixed Charge thực tế.",
  },
  {
    term: "O&M",
    en: "Operations & Maintenance",
    def: "Vận hành và bảo trì sau PTO: monitor inverter, vệ sinh panel, thay thiết bị hỏng. Solar-owned thường ít O&M cost; lease/TPO có thể gói O&M trong hợp đồng. Warranty workmanship ~10 năm khác với O&M dài hạn.",
  },
  {
    term: "Organic leads",
    en: "Lead tự nhiên",
    def: "Khách đến từ SEO, Google Business, SolarReviews, referral — không trả cost-per-lead ads. Công ty 50+ reviews có thể nhận ~3x organic leads; review dưới 30 ngày signal “đang hoạt động”.",
  },
  {
    term: "Overpromise",
    en: "Hứa quá mức",
    def: "Phóng đại tiết kiệm, timeline ITC, hoặc % offset — gây distrust và chargeback. LA Solar Group, Momentum bị chỉ trích trong competitive scan; CaliSolar differentiation = conservative ROI + giấy tờ rõ.",
  },
  {
    term: "Path to Purchase",
    en: "Hành trình mua",
    def: "Khung 7 giai đoạn: Trigger → Research → Evaluation → Proposal → Decision → Install/PTO → Advocate. Mỗi giai đoạn có touchpoint khác (bill shock, EnergySage, site survey, financing sign, review request).",
  },
  {
    term: "PERC",
    en: "Passivated Emitter Rear Cell",
    def: "Công nghệ cell thế hệ trước, vẫn phổ biến trên hệ giá rẻ. Đang bị TOPCon/HJT thay vì hiệu suất cao hơn trên cùng diện tích mái — quan trọng với nhà mái nhỏ tại CA.",
  },
  {
    term: "PESTEL",
    en: "Political·Economic·Social·Technological·Environmental·Legal",
    def: "Khung phân tích môi trường vĩ mô 6 chiều áp dụng cho ngành solar CA. Báo cáo map ITC, NEM, giá điện, review behavior, battery tech, climate mandate, CSLB vào từng chữ cái.",
  },
  {
    term: "PG&E / SCE / SDG&E",
    en: "Investor-owned utilities CA",
    def: "Ba IOU phục vụ phần lớn CA: Pacific Gas & Electric, Southern California Edison, San Diego Gas & Electric. Biểu giá, TOU, PSPS, và Net Billing khác nhẹ theo vùng — proposal phải dùng tariff đúng utility.",
  },
  {
    term: "Porter's Five Forces",
    en: "Five Forces",
    def: "Khung Michael Porter: rivalry, new entrants, supplier power, buyer power, substitutes. Báo cáo chấm điểm 1–5 cho solar CA — rivalry và buyer power rất cao, substitutes thấp–TB.",
  },
  {
    term: "Post-ITC",
    en: "Sau kỳ residential ITC",
    def: "Giai đoạn sau 31/12/2025 khi Section 25D không còn — thị trường residential co lại, messaging chuyển sang giá điện, battery, VPP. Một số đối thủ rời, một số national vẫn dùng commercial ITC qua TPO.",
  },
  {
    term: "PPA",
    en: "Power Purchase Agreement",
    def: "Khách trả theo kWh điện sản xuất từ hệ do bên thứ ba sở hữu — giống “mua điện rẻ hơn utility” nhưng không sở hữu asset. So sánh với loan: PPA ít capex upfront, ít tăng giá nhà, cần đọc escalator rate trong HĐ.",
  },
  {
    term: "PSPS",
    en: "Public Safety Power Shutoff",
    def: "Utility cố ý cắt điện khi nguy cơ cháy rừng cao — đặc thù CA. Thúc đẩy nhu cầu battery backup; pitch “energy independence” mạnh hơn ở vùng PG&E/SCE wildfire zone.",
  },
  {
    term: "PTO",
    en: "Permission to Operate",
    def: "Giấy phép utility cho phép bật hệ và export lưới sau khi inspection pass. Delay PTO là pain point Journey — CRM nên track timeline permit → install → PTO để giữ trust.",
  },
  {
    term: "Residential Solar",
    en: "Solar dân dụng",
    def: "Hệ PV lắp trên mái nhà ở hoặc carport gắn với nhà, thường 4–12 kW. Trọng tâm báo cáo CaliSolar; khác commercial (ROI khác, ITC khác) và community solar.",
  },
  {
    term: "ROI",
    en: "Return on Investment",
    def: "Lợi tức hoặc số năm hoàn vốn = chi phí hệ / tiết kiệm điện hàng năm (đơn giản). Post-ITC và NEM 3.0, ROI phải tính battery và Fixed Charge — tránh ROI “ảo” chỉ dựa trên NEM 2.0.",
  },
  {
    term: "Section 25D",
    en: "Residential ITC (IRC)",
    def: "Điều khoản Internal Revenue Code cho tín dụng thuế residential solar 30% — đã sunset 31/12/2025. Sales không được gọi “30% ITC” cho HĐ ký sau ngày này trừ khi có tư vấn thuế rõ ràng về điều kiện khác.",
  },
  {
    term: "SEIA",
    en: "Solar Energy Industries Association",
    def: "Hiệp hội solar Hoa Kỳ — xuất báo cáo thị trường, forecast -19% residential 2026, lobby CPUC/ITC. Nguồn macro credible cho slide PESTEL và lifecycle.",
  },
  {
    term: "SGIP",
    en: "Self-Generation Incentive Program",
    def: "Chương trình rebate pin lưu trữ của CA (admin qua CPUC/utility), giảm capex battery. Quan trọng trong bundling proposal sau NEM 3.0 — eligibility và step-down rebate cần check theo utility và budget đợt.",
  },
  {
    term: "SEO",
    en: "Search Engine Optimization",
    def: "Tối ưu website và Google Business để rank “solar installer + city”. Chi phí thấp hơn paid lead dài hạn; kết hợp review velocity (SolarReviews, Yelp) vì 88% tin review ngang referral.",
  },
  {
    term: "Social proof",
    en: "Bằng chứng xã hội",
    def: "Reviews, số install, chứng chỉ, case study — giảm perceived risk ở Evaluation. 50+ reviews → ~3x organic leads; rating 4.9★ (NRG) vs 3.1★ (LA Solar) minh họa ảnh hưởng đến conversion.",
  },
  {
    term: "Solar Mandate",
    en: "California solar mandate",
    def: "Từ 2020, nhà mới xây tại CA phải có solar PV (Title 24). Mở rộng pipeline nhưng khách mandat e nhạy giá hơn — upsell battery theo code 2025 hiệu lực 1/2026.",
  },
  {
    term: "Solar-owned",
    en: "Homeowner owns system",
    def: "Khách sở hữu panel/inverter (cash hoặc loan đã trả). Tăng giá trị chuyển nhượng (~6.8%), cần transferable warranty và clear lien release. Đối lập TPO/lease trên mái.",
  },
  {
    term: "SolarReviews",
    en: "Review platform",
    def: "Trang đánh giá chuyên solar installer — nguồn lead và so sánh đối thủ. CaliSolar nên duy trì profile, phản hồi review âm trong 48h, và nhắc khách hài lòng post-PTO để tăng WOM + organic.",
  },
  {
    term: "Switching cost",
    en: "Chi phí chuyển đổi",
    def: "Rào cản khi đổi nhà cung cấp. Trước ký HĐ ≈ 0 (so sánh quote dễ); sau install cao (đã đầu tư, PTO, habit). Chiến lược: chốt trust trước Decision vì khách vẫn có thể chọn competitor đến phút cuối.",
  },
  {
    term: "Tailwinds",
    en: "Gió thuận",
    def: "Yếu tố đẩy demand: giá điện +83%/10 năm, PSPS, Solar Mandate, battery + VPP, climate 2045. CaliSolar align messaging với tailwinds khi headwinds (ITC, NEM) làm ROI khó hơn.",
  },
  {
    term: "TOU",
    en: "Time-of-Use",
    def: "Biểu giá điện theo giờ — peak thường 4–9 PM khi solar không sản xuất. Pin shift load ra off-peak và giảm export rẻ; giải thích TOU giúp justify battery hơn chỉ nói “free electricity”.",
  },
  {
    term: "TOPCon / HJT",
    en: "Tunnel oxide / Heterojunction",
    def: "Công nghệ cell thế hệ mới, hiệu suất module 450W+ phổ biến — ít panel hơn trên mái nhỏ. Premium brand (SunPower/Maxeon) vs value installer; dealer cần spec sheet rõ khi compete trên $/W.",
  },
  {
    term: "TPO",
    en: "Third-Party Ownership",
    def: "Mô hình công ty thứ ba sở hữu hệ và hưởng commercial ITC (đến ~2027 theo báo cáo), khách trả lease/PPA. National players mạnh TPO; local dealer cần partnership financing hoặc nhấn solar-owned + SGIP.",
  },
  {
    term: "Transferable warranty",
    en: "Bảo hành chuyển nhượng",
    def: "Bảo hành panel/inverter/workmanship chuyển sang chủ nhà mới khi bán — critical cho solar-owned resale. Lease/TPO có điều khoản takeover riêng; thiếu transferable warranty là objection Evaluation.",
  },
  {
    term: "VPP",
    en: "Virtual Power Plant",
    def: "Mạng pin nhà phối hợp dispatch vào lưới giờ cao điểm — nguồn thu mới cho homeowner. CA mục tiêu 52,000 MW storage 2045; utility program (vd. SCE) có thể stack với SGIP trong proposal.",
  },
  {
    term: "Wholesale",
    en: "Giá điện bán buôn",
    def: "Giá utility mua/generate điện ở cấp bulk — AI data centers và nhu cầu load làm wholesale tăng (~23% trong báo cáo), kéo retail rate. Giải thích cho homeowner vì sao hóa đơn SCE tăng dù họ “ít dùng điện hơn”.",
  },
  {
    term: "WOM",
    en: "Word of Mouth",
    def: "Giới thiệu từ hàng xóm, gia đình, contractor — giai đoạn Advocate trong Journey. 88% tin online review ngang WOM; kết hợp referral incentive sau PTO để nhân hóa organic.",
  },
  {
    term: "Workmanship warranty",
    en: "Bảo hành thi công",
    def: "Bảo hành lỗi lắp đặt (roof leak, wiring) thường ~10 năm — do installer/EPC, khác product warranty 25 năm panel. Dealer phải đảm bảo EPC đứng sau workmanship để không reputational risk.",
  },
  {
    term: "YoY",
    en: "Year over Year",
    def: "So sánh cùng kỳ năm trước — ví dụ pin residential +51% YoY 2025. Dùng trong macro narrative (growth storage) không nhầm với MoM seasonal bill shock mùa hè.",
  },
  {
    term: "Yelp / BBB",
    en: "Review & accreditation",
    def: "Yelp: review local service; BBB: accreditation và complaint history. Bổ sung SolarReviews/Google — khách CA thường check cả ba; phản hồi BBB complaint nhanh giảm risk cho regional dealer.",
  },
];
