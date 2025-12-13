import "./globals.css";

export const metadata = {
  title: "Vorona.car — авто из Японии под заказ",
  description: "Привоз авто из Японии под заказ. Прозрачные расходы по Японии, минимальная комиссия, без менеджеров.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
