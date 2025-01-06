import Image from "next/image";
import React from "react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";


const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`py-6 border-t rounded-t-3xl`}>
      <div className="container grid md:grid-cols-3 sm:grid-cols-1 sm:gap-y-6 md:gap-y-0">
        <ul className="flex flex-col items-center justify-start gap-y-4">
          <Image
            src="/images/akya-logo.png"
            alt="akya-logo.png"
            width={150}
            height={150}
          />
          <h1 className={`${dancing_script.className} text-4xl`}>Akya Butik</h1>
          <p className="max-w-64 text-sm text-center">
            Erenköy Mah. 4875 sok. no:78 7 nolu dükkan (B) KEPEZ / ANTALYA
          </p>
        </ul>

        <ul className="flex flex-col items-center justify-start gap-y-4">
          <h1 className="text-2xl font-[700]">Sosyal Medya</h1>
          <li>
            <Link href="https://www.instagram.com/akyabutik/" target="_blank" className="hover:text-indigo-600">
              <BsInstagram size={24} />
            </Link>
          </li>
          <li>
            <Link href="https://wa.me/905541471715" target="_blank"><SiWhatsapp size={24} /></Link>
          </li>
        </ul>
        <ul className="flex flex-col items-center justify-start gap-y-4 ">
          <li className="hover:text-blue-600"><Link href='/iptal-iade-politikasi'>İptal ve İade Politikası</Link></li>
          <li className="hover:text-blue-600"><Link href='/mesafeli-satis-sozlesmesi'>Mesafeli Satış Sözleşmesi</Link></li>
          <li className="hover:text-blue-600"><Link href='/kvkk'>KVKK</Link></li>
          <li><Image src='/images/logo_band_colored@1X.png' alt="logo_band_colored@1X.png" width={500} height={500} layout="responsive" /></li>
        </ul>
        
      </div>
    </footer>
  );
}
