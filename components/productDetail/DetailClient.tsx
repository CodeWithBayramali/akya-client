"use client";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import PageContainer from "../Containers/PageContainer";
import { Product } from "@/types";
import {useEffect, useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FaMinus, FaPlus } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "react-toastify";
import { IoMdShare } from "react-icons/io";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper,SwiperClass ,SwiperSlide } from "swiper/react";

interface productProps {
  product: Product;
}

const DetailClient = ({ product }: productProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [stockSizeState, setStockSizeState] = useState(null);
  const [errorState, setErrorState] = useState({
    sizeError: false,
    colorError: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineClamp, setLineClamp] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [stateProduct, setStateProduct] = useState<{
    size: string;
    color: string;
    image: string;
    totalStock: number;
    stockSizeId: string;
    price: number;
    quantity: number;
  }>({
    size: "",
    color: product?.colorSize[0].color,
    totalStock: "",
    stockSizeId: "",
    price: "",
    quantity: 1,
  });

  useEffect(() => {
    if(product) {
      setStockSizeState(product.colorSize[0])
    }
  }, []);

  const toggleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateIndex = ({ index: current }: { index: number }) => {
    setPhotoIndex(current);
  };

  const toggleClamp = () => {
    setLineClamp(!lineClamp);
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    // URL'yi kopyalama
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      toast.success('Link Kopyalandı');
    });
  };

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row md:gap-x-7 justify-center items-start md:items-center lg:items-start  md:rounded-lg w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}

        <h3 className=" md:hidden text-start text-lg font-semibold text-secondaryDark  overflow-hidden text-ellipsis whitespace-nowrap w-full my-4">
          {product?.name}
        </h3>

        <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-3/6 md:h-full ">
          <div className="hidden  w-full md:w-1/6 xs:grid grid-cols-6  md:flex  flex-col max-h-34  gap-1 ">
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
              {stockSizeState?.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item}`}
                        alt={item}
                        className="rounded-lg w-full h-[10rem] object-cover"
                        fill
                    />
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Swiper
              loop={true}
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 sm:w-full md:h-[48rem] sm:h-[35rem]"
          >
            {stockSizeState?.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                      onClick={()=> {
                        setIsModalOpen(!isModalOpen)
                        setPhotoIndex(index)
                      }}
                      src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item}`}
                      fill
                      className="w-full md:h-[48rem] sm:h-[35rem] object-cover cursor-zoom-in"
                      alt="Product Image"
                  />
                </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={
            "md:hidden flex  flex-col justify-center items-start gap-2  mb-3 w-full "
          }
        >
          <h4 className={"text-lg text-black font-semibold mt-6"}>
            {'Renk: '} {stockSizeState?.color}
          </h4>
          <div className={"flex flex-row flex-wrap gap-4 w-full"}>
            {product?.colorSize.map((item, index) => (
              <button
                onClick={() => {
                  setStockSizeState(item);
                  setStateProduct({
                    size: "",
                    color: item.color,
                    totalStock: 0,
                    stockSizeId: "",
                    price: 0,
                    quantity: 1,
                  });
                }}
                key={index}
                className={`  ${
                    stockSizeState?.color === item.color
                        ? "border-2 border-gray-600  rounded"
                        : " border border-secondary "
                } flex flex-col relative items-center h-24 w-12 justify-center `}
              >
                <p className=" w-full text-[10px] first-letter:uppercase text-center text-white bg-secondary mb-1 px-1  ">
                  {item.color}
                </p>
                <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                    fill
                    priority
                    alt={item.images[0]}
                    className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className=" w-full mt-6  lg:mt-0 flex flex-col gap-4  border-secondary h-full px-1 rounded-lg min-h-[800px] ">
          <div className="w-full flex flex-col  justify-between items-start">
            <h3 className=" hidden md:flex text-xl md:text-2xl font-semibold text-secondaryDark  overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {product?.name}
            </h3>
            <span className="bg-secondary text-sm gap-x-1 flex justify-center items-start text-mywhite py-1 rounded-md mt-4">
              {'Ürün Kodu: '} <p className={'font-semibold'}>{stockSizeState?.stockCode}</p>
            </span>
          </div>

          <div className="w-full flex  items-start justify-between gap-x-1">
            <span className={"flex flex-col gap-x-4 "}>
              {product?.discountPrice !== 0 && (
                <p
                  className={
                    "  md:text-xl text-red-600 line-through font-semibold"
                  }
                >
                  {product?.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                </p>
              )}
              {product?.discountPrice !== 0 ? (
                <p className={"  md:text-xl font-semibold text-green-600"}>
                  {product?.discountPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                </p>
              ) : (
                <p className={"md:text-xl font-semibold text-secondaryDark"}>
                  {product?.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                </p>
              )}
            </span>
            <div className="text-xs font-bold underline underline-offset-1">
              {'Fiyatlarımıza KDV dahildir'}
            </div>
          </div>

          <div className={"hidden  md:flex flex-col gap-2 "}>
            <h4 className={"text-lg text-secondaryDark font-semibold"}>
              {'Renkler: '} {stockSizeState?.color}
            </h4>
            <div className={"flex flex-row flex-wrap gap-4 w-full"}>
              {product?.colorSize.map((item, index) => (
                <button
                  onClick={() => {
                    setStockSizeState(item);
                    setStateProduct({
                      size: "",
                      color: item.color,
                      totalStock: 0,
                      stockSizeId: "",
                      price: 0,
                      quantity: 1,
                    });
                  }}
                  key={index}
                  className={`  ${
                    stockSizeState?.color === item.color
                      ? "border-2 border-gray-600  rounded"
                      : " border border-secondary "
                  } flex flex-col relative items-center h-24 w-12 justify-center `}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                    fill
                    priority
                    alt={item.images[0]}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={"flex flex-col "}>
            <div className="flex justify-start items-center gap-2">
              <h4 className={"text-lg text-secondaryDark font-semibold"}>
                {'Beden: '}:
              </h4>
              <div className={"flex flex-row flex-wrap gap-x-4 "}>
                {stockSizeState?.stockSize.map((item, index) =>
                  item.stock === 0 ? (
                    <button
                      className={
                        "bg-mywhite cursor-not-allowed text-red-600 border border-secondary line-through rounded-lg opacity-45 min-w-6 h-7  px-2"
                      }
                      disabled={item.stock === 0}
                    >
                      {item.size}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setStateProduct({
                          ...stateProduct,
                          stockSizeId: item.id,
                          totalStock: item.stock,
                          size: item.size,
                        });
                        setErrorState({ ...errorState, sizeError: false });
                      }}
                      key={index}
                      className={`${
                        stateProduct.size === item.size
                          ? "bg-secondary text-mywhite  border-none outline-double outline-secondary"
                          : "bg-mywhite text-secondary border border-secondary"
                      }  rounded-md min-w-6 h-7  px-2`}
                    >
                      {item.size}
                    </button>
                  )
                )}
              </div>
            </div>
            <small
              className={`${
                errorState.sizeError ? "text-red-600 font-semibold" : "hidden"
              } `}
            >
              {'Lütfen Beden Seçiniz'}*
            </small>
          </div>

          <p className="text-lg text-secondaryDark font-semibold my-2">
            {'Adet'}
          </p>
          <span className="py-3 px-4 flex w-64 gap-x-8 flex-row items-center justify-between border border-secondary rounded">
            {/* Azaltma butonu */}
            <FaMinus
              className={`${
                stateProduct?.quantity <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer hover:scale-110 transition-all duration-300"
              }`}
              onClick={() => {
                if (stateProduct?.quantity > 1) {
                  setStateProduct({
                    ...stateProduct,
                    quantity: stateProduct.quantity - 1,
                  });
                }
              }}
            />

            {/* Miktar */}
            <p className="text-xl font-semibold">{stateProduct?.quantity}</p>

            {/* Arttırma butonu */}
            <FaPlus
              className={`${
                stateProduct?.quantity >= stateProduct?.totalStock
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer hover:scale-110 transition-all duration-300"
              } `}
              onClick={() => {
                if (stateProduct?.quantity < stateProduct?.totalStock) {
                  setStateProduct({
                    ...stateProduct,
                    quantity: stateProduct.quantity + 1,
                  });
                }
              }}
            />
          </span>

          <div className="flex justify-start items-center gap-2 h-12">
            <button
              onClick={() => {
                if (!stateProduct.size) {
                  setErrorState({ ...errorState, sizeError: true });
                } else {
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.name,
                      category1: product.category,
                      category2: product.subCategory,
                      color: stateProduct.color,
                      image: stockSizeState?.images[0],
                      size: stateProduct.size,
                      stockSizeId: stateProduct?.stockSizeId,
                      stockCode: stockSizeState?.stockCode,
                      quantity: stateProduct.quantity,
                      price:
                        product?.discountPrice !== 0 && product.discountPrice
                          ? product.discountPrice
                          : product.price,
                    })
                  );
                  toast.success('Ürün Sepete Eklendi');
                }
              }}
              className={
                "bg-black h-12 w-3/4 rounded-lg text-xl text-white font-semibold  hover:opacity-85  transition-all duration-300"
              }
            >
              {'Sepete Ekle'}
            </button>
            <div className="flex justify-start items-center  h-full gap-1">
              {/* Icon butonu */}
              <button
                onClick={copyToClipboard}
                className="bg-secondary  hover:scale-105 transition-all duration-300  !h-12 !w-16 rounded-lg text-white flex items-center justify-center "
              >
                <IoMdShare size={22} />
              </button>
            </div>
          </div>

          <div className="">
            <div className="col-span-full sm:col-span-2 lg:col-span-3">
              <h3 className="text-xl text-secondary font-semibold">
                {'Ürün Açıklaması'}:
              </h3>
            </div>
            <p
              className={`text-secondary text-xs ${
                lineClamp ? "line-clamp-3" : "line-clamp-none"
              }`}
            >
              {product?.description}
            </p>
            {product?.description.length > 250 && (
              <button
                onClick={toggleClamp}
                className="text-secondary font-semibold text-end mt-1 hover:underline"
              >
                {lineClamp
                  ? 'Daha Fazla'
                  : 'Daha Az' }
              </button>
            )}
          </div>
        </div>
        <Lightbox
          open={isModalOpen}
          plugins={[Zoom]}
          close={() => toggleOpen()}
          index={photoIndex}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
          }}
          slides={stockSizeState?.images?.map((img) => ({
            src: `${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`,
          }))}
          on={{ view: updateIndex }}
          animation={{ fade: 0 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        />
      </div>
    </PageContainer>
  );
};

export default DetailClient;
