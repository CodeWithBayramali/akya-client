"use client"
import PageContainer from "@/components/Containers/PageContainer";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useEffect} from "react";
import {clearCart} from "@/redux/cartSlice";

const SuccessPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {cartProducts} = useSelector((state:RootState)=> state.cart)

  useEffect(() => {
    if(cartProducts.length > 0) {
      dispatch(clearCart())
    }
  }, []);

  return (
    <PageContainer>
      <div className="w-full min-h-[665px] my-12 flex flex-col justify-center items-center bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center">
          <CiCircleCheck className="h-20 w-20 md:w-32 md:h-32 text-secondary mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Ödeme Başarılı
          </h1>
          {/* <p className="text-gray-600 mt-2">{t("paymentSuccess.message")}</p> */}
          <div className="flex justify-center items-center w-full gap-2 mt-2 font-bold">
            <p className="text-myblack  text-center text-sm md:text-base  font   ">
              {"Siparişiniz En Kısa Sürede Kargoya Verilecektir"}
            </p>
            <FaTruckFast className=" text-2xl md:text-3xl" />
          </div>
          <Link
            href="/"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:scale-105 transition"
          >
            Anasayfa
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default SuccessPage;
