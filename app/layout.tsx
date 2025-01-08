import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Root from "./root";
import { Jost } from 'next/font/google';

const inter = Jost({ subsets: ["latin"], weight:['400','200','300','600','700','900'] });

export const metadata: Metadata = {
  title: "Akya Butik",
  description: "İyi giyimin tek adresi!",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
      <meta name="description" content="Akyabutik: Kadın ve erkek giyiminde en şık trendler. Elbiseler, ayakkabılar ve aksesuarlar için hemen keşfet!"/>
      <meta name="keywords" content="butik, kadın giyim, erkek giyim, elbiseler, ayakkabılar, aksesuarlar, online butik"/>
      <meta name="author" content="Akyabutik"/>
      <meta property="og:title" content="Akyabutik - En Şık Giyim ve Aksesuarlar"/>
      <meta property="og:description" content="En kaliteli ve trend giyim ürünlerini Akyabutik'de bul. İndirimleri kaçırma!"/>
      <meta property="og:image" content="https://example.com/images/featured-product.jpg"/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://akyabutik.com" />
      </head>
      <body suppressHydrationWarning={true} className={`${inter.className} antialiased`}>
        <Root> {children} </Root>
      </body>
    </html>
  );
}
