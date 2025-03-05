"use client";

import ProductCard from "../components/product-card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getAllProductsDispatch} from "@/redux/productSlice";
import {Paginator} from "primereact/paginator";
import Loading from "@/components/common/Loading";

export default function Home() {
  const { products, page, loading } = useSelector((state:RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [pageable, setPageable] = useState({currentPage:0, size:12})

  useEffect(() => {
   dispatch(getAllProductsDispatch(pageable.currentPage, pageable.size))
  }, [dispatch,pageable.currentPage, pageable.size]);

    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });
    };

  return (
    <>
      <div className="relative w-full sm:h-[450px] md:h-[600px]">
        <Image
          src={'/images/akyacarouselimg.webp'}
          alt="clothes.jpg"
          className="brightness-90 rounded-b-3xl"
          fill// Kapsayıcıyı doldur
          objectFit="fill" // Doldururken orantıları korur
        />
      </div>
      <div className="container my-12 grid md:grid-cols-4 sm:grid-cols-2 sm:gap-1 md:gap-2 md:gap-y-12 sm:gap-y-6 flex-wrap">
        {products?.map((item, index) => (
            loading ? <Loading key={index} /> :
          <ProductCard key={index} product={item} />
        ))}
      </div>
        <Paginator
            className={"my-12 "}
            first={pageable.currentPage * pageable.size}
            rows={pageable.size}
            totalRecords={page.totalElements}
            rowsPerPageOptions={[12, 20, 30]}
            onPageChange={onPageChange}
        />
    </>
  );
}
