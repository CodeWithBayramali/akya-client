"use client";
import React from "react";
import Image from "next/image";
import { CartProduct } from "../../types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  addProduct,
  discountProduct,
  removeProduct,
} from "../../redux/cartSlice";

export default function CartProductCard({
  cartProduct,
}: {
  cartProduct: CartProduct;
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row gap-x-4 p-1 pb-4 border-b">
      <div className="relative">
      <Image
      width={100}
      className="rounded-xl"
      height={100}
        layout="fit"
        objectFit="contain"
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cartProduct.product.images[0]?.url}`}
        alt="product.jpg"
      />
      </div>
      <div className="flex w-full flex-col gap-y-2 justify-center">
        <h2 className="font-medium">{cartProduct.product.name}</h2>
        <p className="font-semibold">Fiyat: {cartProduct.product?.price}</p>
        <div className="flex flex-row items-center justify-between">
          <span className="py-2 px-2 flex w-32 gap-x-8 flex-row items-center justify-between border">
            {cartProduct.quantity <= 1 ? (
              <FaMinus className="text-gray-400 cursor-not-allowed" />
            ) : (
              <FaMinus
                onClick={() => dispatch(discountProduct(cartProduct))}
                className="cursor-pointer"
              />
            )}
            <p>{cartProduct.quantity}</p>
            <FaPlus
              onClick={() => dispatch(addProduct(cartProduct))}
              className="cursor-pointer"
            />
          </span>
          <RiDeleteBin5Line
            onClick={() => dispatch(removeProduct(cartProduct))}
            className="text-2xl cursor-pointer text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
