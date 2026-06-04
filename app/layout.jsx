import "./globals.css";

export const metadata = {
  title: "CaliSolar — California Residential Solar Industry Analysis 2026",
  description: "PESTEL, Porter's Five Forces, competitive analysis, consumer behavior, and path to purchase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
