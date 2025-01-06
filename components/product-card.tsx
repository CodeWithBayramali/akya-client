import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {

  return (
    <div className="md:max-w-xs sm:max-w-full overflow-hidden">
      <div className="relative overflow-hidden group w-full h-[450px]">
        <Link href={`/product/${product?.slug}`} >
          <Image
            className="transition-transform hover:cursor-pointer duration-300 group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]?.url}`}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="p-2">
        <div className="flex flex-row justify-between">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-indigo-600 text-lg transition-all text-gray-600"
        >
          {product.name}
        </Link>
        </div>

        <div className="mt-2 flex flex-col justify-between">
        </div>
        <div className="flex justify-start items-center">
          <span className="font-semibold text-gray-900">
            ₺ {product.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
