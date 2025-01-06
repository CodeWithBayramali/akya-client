"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CartProduct } from "../../types";
import CartProductCard from "./cart-product-card";
import { useRouter } from "next/navigation";

interface OpenCartModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function OpenCartModal({
  isOpen,
  closeModal,
}: OpenCartModalProps) {
  const {
    cartProducts,
    total,
  }: { cartProducts: CartProduct[]; total: number } = useSelector(
    (state: RootState) => state.cart
  );
  const navigation = useRouter()
  const [isClosing, setIsClosing] = useState(false);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal-overlay") {
      startClosingAnimation();
    }
  };

  const startClosingAnimation = () => {
    setIsClosing(true);
    // Animasyon süresi kadar bekleyip modalı kapat
    setTimeout(() => {
      setIsClosing(false);
      closeModal(); // Modalı tamamen kapatma
    }, 300); // Animasyon süresi
  };

  const goToPaymenyPage = () => {
      navigation.push('/payment')
      closeModal()
  }

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className={`fixed inset-0 z-50 flex bg-black items-center justify-end transition-opacity 
        duration-300 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-opacity-25`}
    >
      {/* Modal İçeriği */}
      <div
        className={`w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
        } relative`}
      >
        {/* Modal Kapatma Butonu */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={startClosingAnimation} // Kapatma butonuna basınca kapanma animasyonu başlatılır
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-2">
          <h2 className="text-xl font-bold mb-4">Sepetiniz</h2>
          {cartProducts?.map((item, index) => (
            <CartProductCard key={index} cartProduct={item} />
          ))}
          {cartProducts.length === 0 && (
            <>
              <span className="text-red-600 flex items-center font-bold justify-center mt-24 text-center">
                Sepetiniz boş
              </span>
            </>
          )}
          
        </div>
        <span className="text-xl fixed border-t w-full bottom-0">
          <p className="py-6 px-4 font-semibold">Toplam: {total.toFixed(2)} ₺</p>
          {
            cartProducts.length !== 0 && (
              <button onClick={goToPaymenyPage} className="bg-black p-4 font-bold flex justify-center text-white w-full">
                Ödeme
              </button>
            )
          }
        </span>
      </div>
    </div>
  );
}
