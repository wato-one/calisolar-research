import "./globals.css";

export const metadata = {
  title: "CaliSolar - Phân Tích Ngành Solar Residential California 2026",
  description: "PESTEL, Porter's Five Forces, Competitive Analysis, Consumer Behavior",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
