"use client";
import "../../app/globals.css";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PaymentForm from "../../components/payment-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const navigation = useRouter()
  const {cartProducts,total} = useSelector((state:RootState) => state.cart)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if(cartProducts.length === 0) {
      navigation.back()
    }
  }, [cartProducts]);

  if (!isClient) {
    return null; // İlk başta SSR sırasında boş döndür
  }

  return (
    <div className="relative flex w-full mt-28 border-t border-gray-300">
      {/* Sol taraf - Beyaz arka plan */}
      <div className="left-0 sm:hidden md:absolute top-0 w-1/2 h-full bg-white -z-10"></div>

      {/* Sağ taraf - Gri arka plan */}
      <div className="absolute sm:hidden md:block right-0 top-0 w-1/2 h-full bg-gray-100 -z-10"></div>

      {/* İçerikler için container */}
      <div className="container mx-auto flex sm:flex-col-reverse md:flex-row w-full">
        {/* Sol taraftaki içerik */}
        <div className="md:w-1/2 sm:w-full">
          <PaymentForm />
        </div>

        {/* Sağ taraftaki içerik */}
        <div className="md:w-1/2 sm:w-full">
          {
            cartProducts.map((item, index) => (
              <div key={index} className="flex flex-row items-center p-6 w-full">
                <div className="relative h-16 w-12">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.product.images[0]?.url}`}
                    alt="product.jpg"
                  />
                  <span className="bg-gray-700 text-white w-6 h-6 rounded-full absolute -top-3 -right-3 items-center 
                      justify-center flex text-xs font-semibold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-col w-full ml-6">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-sm font-semibold">{item.product.name}</p>
                    <p className="text-sm font-medium">
                      ₺ {item.product.price * item.quantity}
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-semibold text-gray-700">Beden - {item.size}</p>
                    <p className="text-xs font-semibold text-gray-700">Renk - {item.color}</p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="flex flex-row justify-between items-center p-4 text-sm font-medium w-full">
            <p>Alt Toplam • {cartProducts.reduce((total,item)=> { return total + item.quantity;},0)} Ürün</p>
            <p>₺ {total}</p>
          </div>
          <div className="flex flex-row justify-between items-center p-4 text-sm font-medium w-full">
            <p>Kargo</p>
            <p>₺ {process.env.NEXT_PUBLIC_SHIP_PRICE}</p>
          </div>
          <div className="flex flex-row justify-between items-center p-4 text-2xl font-semibold w-full">
            <p>Toplam</p>
            <p>₺ {total + parseInt(process.env.NEXT_PUBLIC_SHIP_PRICE || '0')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
