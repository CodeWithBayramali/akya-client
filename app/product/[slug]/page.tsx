"use client";
import 'react-image-lightbox/style.css';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AppDispatch } from "../../../redux/store";
import { DetailProduct } from "../../../types";
import { addProduct } from "../../../redux/cartSlice";
import Loading from "../../../components/common/Loading";
import Lightbox from 'react-image-lightbox'

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { getRequest } from "../../../service/requestService";
import { useParams } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface StateProductProps {
  count: number;
  size: string;
  colorTagName: string;
  color: string;
}
export default function ProductPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [detailProduct, setDetailProduct] = useState<DetailProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const [stateProduct, setStateProduct] = useState<StateProductProps>({
    count: 1,
    size: "",
    color: "",
    colorTagName: "",
  });
  const [errorState, setErrorState] = useState({ color: false, size: false });
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Seçilen bedene göre renkleri filtreleme

  useEffect(() => {
    getRequest({
      controller: "ueruenlers",
      filters: { slug: params?.slug },
      populate: "*",
    })
      .then((res) => {
        setDetailProduct(res.data[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.slug]);

  const handleSendProductToCart = () => {
    if (!stateProduct.color)
      return setErrorState({ ...errorState, color: !errorState.color });
    if (!stateProduct.size)
      return setErrorState({ ...errorState, size: !errorState.size });
    dispatch(
      addProduct({
        product: detailProduct,
        quantity: stateProduct.count,
        size: stateProduct.size,
        color: stateProduct.colorTagName,
        colorTagName: stateProduct.colorTagName,
      })
    );
  };

  if (loading && !detailProduct) {
    return (
      <div className="flex-1 h-screen justify-center items-center flex">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-32 justify-between flex md:flex-nowrap sm:flex-wrap">
      {/* PRODUCT IMAGES */}
        {/* Thumbnail Slider Sol Tarafta */}
        <div className="md:w-1/3 md:block sm:hidden">
          <Swiper
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper)
            }}
            direction="vertical" // Dikey sıralama
            spaceBetween={40}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper flex md:flex-col sm:flex-row w-full h-[48rem]" // Dikey sıralama için boyut ayarla
          >
            {detailProduct?.images.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
                  className="rounded-lg w-full h-[10rem] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Büyük Resim Slider Sağ Tarafta */}
        <div className="md:w-2/3 sm:w-full">
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 md:w-4/5 sm:w-full md:h-[48rem] sm:h-[35rem]"
          >
            {detailProduct?.images.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  onClick={()=> setIsModalOpen(!isModalOpen)}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
                  className="w-full md:h-[48rem] sm:h-[35rem] object-cover"
                  alt="Product Image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="flex flex-col gap-y-6 md:w-2/3 sm:w-full">
        <h2 className="text-2xl sm:mt-4 md:mt-0">{detailProduct?.name}</h2>
        <span className="flex flex-row gap-x-3 justify-between items-center">
          <p className="text-xl font-semibold">
            {detailProduct?.price.toFixed(2)} TL
          </p>
        </span>

        <p className="text-xs text-gray-500">
          Vergi dahildir. <span className="underline">Kargo</span>, ödeme
          sayfasında hesaplanır.
        </p>
        <p>
          Renk Seçiniz:{" "}
          <span className="font-bold ml-2">{`${
            stateProduct.colorTagName && `- ${stateProduct.colorTagName}`
          }`}</span>{" "}
        </p>
        <div className="flex flex-row gap-x-4">
        {[...new Map(detailProduct?.stoks.map(item => [item.color_hex, item])).values()].map((item, index) => (
    <button
      onClick={() => setStateProduct({...stateProduct, color: item.color_hex, colorTagName: item.colorName})}
      key={index}
      style={{ background: item.color_hex }}
      className={`${stateProduct.colorTagName === item.colorName && 'border-4'} w-6 h-6 rounded-full border border-gray-400`}
    />
  ))}
        </div>
        <p className="mt-2">Beden Seçiniz: 
        <span className="font-bold ml-2">{`${
            stateProduct.size && `- ${stateProduct.size.startsWith('s') ? stateProduct.size.slice(1): stateProduct.size}`
          }`}</span>{" "}
        </p>
        <div className="flex flex-row gap-x-2 flex-wrap items-center">
        {
    // Beden listesini benzersiz kılmak için Set kullanımı
    [...new Set(detailProduct?.stoks.map(item => item.size))].length === 1 && detailProduct?.stoks[0].size === 'Standart' ? (
      <button onClick={()=> setStateProduct({...stateProduct,size:'Standart'})} className={`${stateProduct.size === 'Standart' && 'bg-black text-white'} border text-sm rounded-full p-2`}>
        Standart
      </button>
    ) : (
      [...new Set(detailProduct?.stoks.map(item => item.size))].map((size, index) => (
        <button
          onClick={() => setStateProduct({ ...stateProduct, size: size, count:1 })}
          key={index}
          className={`${stateProduct.size === size && 'bg-black text-white'} text-sm w-10 h-10 flex items-center justify-center border px-2.5 rounded-full`}
        >
          {size.startsWith('s') ? size.slice(1) : size}
        </button>
      ))
    )
  }
        </div>

        <p className="mt-2">Adet</p>
        <span className="py-3 px-4 flex w-40 gap-x-8 flex-row items-center justify-between border">
          {stateProduct.count <= 1 ? (
            <FaMinus
              className={`${
                stateProduct.count <= 1 && "text-gray-300 cursor-not-allowed"
              }`}
            />
          ) : (
            <FaMinus
              className="cursor-pointer"
              onClick={() =>
                setStateProduct({
                  ...stateProduct,
                  count: stateProduct.count - 1,
                })
              }
            />
          )}
          <p>{stateProduct.count}</p>
          <FaPlus
            className={`${
              stateProduct.count >=
              (detailProduct?.stoks.find(
                (item) => item.colorName === stateProduct.colorTagName && item.size === stateProduct.size
              )?.stock || 0)
                ? "text-gray-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              const stockLimit =
                detailProduct?.stoks.find(
                  (item) => item.colorName === stateProduct.colorTagName && item.size === stateProduct.size
                )?.stock || 0;

              if (stateProduct.count < stockLimit) {
                setStateProduct({
                  ...stateProduct,
                  count: stateProduct.count + 1,
                });
              }
            }}
          />
        </span>


        <button
          onClick={handleSendProductToCart}
          className="border w-full py-2 hover:bg-black hover:text-white transition-all"
        >
          Sepete Ekle
        </button>
        <div className="text-[13px] text-gray-600">
        <BlocksRenderer content={detailProduct?.aciklama as []} />
        </div>
      </div>
      {isModalOpen && detailProduct?.images?.length && (
          <Lightbox
            mainSrc={`${process.env.NEXT_PUBLIC_IMAGE_URL}${detailProduct?.images[photoIndex].url}`}
            nextSrc={`${process.env.NEXT_PUBLIC_IMAGE_URL}${detailProduct?.images[(photoIndex + 1) % detailProduct.images.length].url}`}
            prevSrc={`${process.env.NEXT_PUBLIC_IMAGE_URL}${detailProduct?.images[(photoIndex + detailProduct.images.length - 1) % detailProduct.images.length]}`}
            onCloseRequest={() => setIsModalOpen(!isModalOpen)}
            onMovePrevRequest={() =>  setPhotoIndex((photoIndex + detailProduct?.images.length - 1) % detailProduct?.images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex( (photoIndex + 1) % detailProduct?.images.length)
            }
          />
        )}
    </div>
  );
}
