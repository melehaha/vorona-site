import { Inter, Montserrat, Oswald } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["800"], variable: "--font-montserrat" });
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald" });

export const metadata = {
  title: "Авто из Японии под заказ — привезти машину в РФ | ВОРОНАКАР",
  description:
    "Помогаю привезти авто из Японии под заказ: прозрачные расходы, договор, документы на этапах. Владивосток — работаю с заказами по РФ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
