import Image from "next/image";
import React from "react";
import { Dancing_Script } from "next/font/google";

const dancing_script = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
  });

export default function page() {
  return (
    <div className="md:h-[60vh] sm:h-full sm:my-12 container">
      <div className="flex md:flex-row sm:flex-col md:mt-44 sm:mt-24 gap-x-12 items-center">
        <Image
          width={400}
          height={400}
          objectFit="cover"
          className="rounded-xl"
          src={"/images/akyabutik.jpeg"}
          alt="akyabutik.jpeg"
        />
        <div className="flex flex-col sm:mt-12 font-medium gap-y-6">
            <h1 className={`${dancing_script.className} md:text-5xl md:text-start sm:text-5xl sm:text-center`}>Akyabutik</h1>
          <p>
            Küçük yaşlardan itibaren kadınlara istihdam sağlayabilecek bir
            girişim kurma hayali olan kurucumuz Kübra Dursun, 2024 yılında ilk
            adımını atmıştır. Aileye, değerlerine bağlı olan Kübra Dursun,
            Akya’yı ailesinin baş harflerinden oluşan özel bir anlamı ile
            kurmuştur. Kadın giyim üzerinde kaliteye önem veren, Türkiye’de ve
            dünyada Akya ismini duyurmayı hedefleyen, bir kadın girişimci
            markasıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
