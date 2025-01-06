"use client";

import ProductCard from "../components/product-card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRequest } from "../service/requestService";

export default function Home() {
  const [products,setProducts] = useState([])

  useEffect(() => {
    getRequest({
      controller: 'ueruenlers',
      pagination: {page:1, pageSize:12},
      fields: ['name','slug','price'],
      populate: ['images'],
      sort: ['createdAt:desc']
    }).then(res=> {
      setProducts(res.data)
    })
  }, []);


  return (
    <>
      <div className="relative w-full sm:h-[450px] md:h-[600px]">
        <Image
          src={'/images/akyacarouselimg.webp'}
          alt="clothes.jpg"
          className="brightness-90 rounded-b-3xl"
          layout="fill" // Kapsayıcıyı doldur
          objectFit="fill" // Doldururken orantıları korur
        />
      </div>
      <div className="container my-12 grid md:grid-cols-3 sm:grid-cols-1 md:gap-4 sm:gap-y-6 flex-wrap">
        {products?.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
      <div className="my-12 flex items-center justify-center">
        <button className="bg-blue-600 text-sm font-semibold p-2 text-white rounded-full px-4">
          Daha Fazla Ürün Yükle
        </button>
      </div>
    </>
  );
}
