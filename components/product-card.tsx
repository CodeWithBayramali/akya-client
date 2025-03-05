import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {

  return (
    <div className="md:max-w-xs sm:max-w-full overflow-hidden">
      <div className="relative overflow-hidden group w-full md:h-[420px] sm:h-[300px]">
          <div className={'flex flex-col z-40 absolute right-1 justify-end items-end gap-y-1 m-1'}>
              {product?.discountPrice > 0 && product?.price > 0 && (
                  <div className="w-10 h-4 md:w-16 md:h-6 flex justify-center items-center bg-red-600 text-white rounded  text-[7px] md:text-[10px] md:text-xs ">
                      %
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}
                  </div>
              )}
              {product.newSeason == true && (
                  <div className="flex w-10 md:w-16  h-4  md:h-6 justify-center items-center bg-yellow-400 text-white rounded text-[7px] md:text-[10px] md:text-xs shadow-md ">
                      Yeni Sezon
                  </div>
              )}

              {product.populate == true && (
                  <div className="flex px-1 h-4  md:h-6   justify-center items-center bg-green-400 text-white rounded  text-xs shadow-md ">
                      Popüler Ürün
                  </div>
              )}
          </div>
        <Link href={`/product/${product?.slug}`} >
          <Image
            className="transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product?.colorSize[0].images[0]}`}
            alt="Product Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
        <div className="p-2">
            <div className={'flex flex-row gap-x-2'}>
                {
                    product.colorSize.map((item,index)=> (
                        <Image key={index} src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                               alt={item.images[0]}
                               width={30}
                               height={30}
                               className={'rounded'}
                        />
                    ))
                }
            </div>
            <div className="flex flex-row justify-between">
                <Link
                    href={`/product/${product.slug}`}
                    className="hover:text-indigo-600 sm:text-[15px] md:text-lg mt-3 transition-all text-gray-600"
                >
                    {product.name}
                </Link>
            </div>


            <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex flex-row gap-x-3">
                    {product.discountPrice > 0 ? (
                        <>
                  <span className="text-red-700 text-base md:text-base line-through">
                    {product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}
                  </span>
                            <p className="text-xs text-green-600 md:text-base font-bold">
                                {product.discountPrice.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}
                            </p>
                        </>
                    ) : (
                        <p className="text-xs text-secondary md:text-base font-bold text-gray-500">
                            {product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
