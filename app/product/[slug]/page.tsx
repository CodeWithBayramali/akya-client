"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AppDispatch } from "../../../redux/store";
import { DetailProduct } from "../../../types";
import { addProduct } from "../../../redux/cartSlice";
import Loading from "../../../components/common/Loading";
import Modal from "react-modal";
import { TfiClose } from "react-icons/tfi";

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
  const [currentImage, setCurrentImage] = useState("");

  // Seçilen bedene göre renkleri filtreleme

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
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
                  onClick={() =>
                    openModal(`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`)
                  }
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
          Renk:{" "}
          <span className="font-bold ml-2">{`${
            stateProduct.colorTagName && `- ${stateProduct.colorTagName}`
          }`}</span>{" "}
        </p>
        <div className="flex flex-row gap-x-4">
          {detailProduct?.stoks.map((item, index) => (
            <button
              onClick={()=> setStateProduct({...stateProduct,color:item.color,colorTagName:item.colorName})}
              key={index}
              style={{ background: item.color }}
              className={`${stateProduct.colorTagName === item.colorName && 'border-4'} w-6 h-6 rounded-full border border-gray-400`}
            />
          ))}
        </div>
        <p className="mt-2">Beden: 
        <span className="font-bold ml-2">{`${
            stateProduct.size && `- ${stateProduct.size.startsWith('s') ? stateProduct.size.slice(1): stateProduct.size}`
          }`}</span>{" "}
        </p>
        <div className="flex flex-row gap-x-2 flex-wrap items-center">
          {detailProduct?.stoks.map((item, index) => (
            <button
              onClick={()=> setStateProduct({...stateProduct,size:item.size})}
              key={index} className={`${stateProduct.size === item.size && 'bg-black text-white'} text-sm w-10 h-10 flex items-center justify-center border px-2.5 rounded-full`}>
              {item.size.startsWith('s') ? item.size.slice(1): item.size}
            </button>
          ))}
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
                (item) => item.colorName === stateProduct.colorTagName
              )?.stock || 0)
                ? "text-gray-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              const stockLimit =
                detailProduct?.stoks.find(
                  (item) => item.colorName === stateProduct.colorTagName
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
        <BlocksRenderer content={detailProduct?.aciklama as []} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 mx-4 flex items-center justify-center z-50" // Modal içeriği
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center" //
        shouldCloseOnOverlayClick={true} // Dış tıklama ile kapanmayı aktif eder
        shouldCloseOnEsc={true} // Escape tuşuyla kapanmayı aktif eder
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-red-600 text-3xl"
          >
            <TfiClose />
          </button>
          <img
            src={currentImage}
            alt="Büyütülmüş Görsel"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
}
