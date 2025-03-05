"use client";
import React from "react";
import Image from "next/image";
import { OrderBasketItem } from "@/types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import {removeFromCart} from "@/redux/cartSlice";

export default function CartProductCard({
  cartProduct,
}: {
  cartProduct: OrderBasketItem;
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row gap-x-4 p-1 pb-4 border rounded-lg shadow-md px-4">
      <div className="relative">
      <Image
      width={100}
      className="rounded-xl"
      height={100}
        layout="fit"
        objectFit="contain"
        src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${cartProduct.image}`}
        alt="product.jpg"
      />
      </div>
        <div className="flex w-full flex-col gap-y-2 justify-center">
            <h2 className="font-medium">{cartProduct.name}</h2>
            <span className={'flex flex-row gap-x-4'}>
                <span className={'text-sm font-semibold'}>Adet: {cartProduct.quantity}</span>
            <span className={'text-sm font-semibold'}>Renk: {cartProduct.color}</span>
            <span className={'text-sm font-semibold'}>Beden: {cartProduct.size}</span>
           </span>
            <div className="flex flex-row items-center justify-between">
                <p className="font-semibold">Fiyat: {cartProduct?.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                })}</p>
                <RiDeleteBin5Line
                    onClick={() => dispatch(removeFromCart(cartProduct))}
                    className="text-2xl cursor-pointer text-red-500"
                />
            </div>
        </div>
    </div>
  );
}
