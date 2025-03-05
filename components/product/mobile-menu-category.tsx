"use client";
import React, { useState } from "react";
import { Category } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {removeFilterProducts} from "@/redux/productSlice";

export default function MobileMenuCategory({
  categories,
    setSelectedCategory,
}: {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: () => void
}) {
  const [subCategories, setSubCategories] = useState([]);
  const dispatch = useDispatch<AppDispatch>()

  const changeSubCategory = (value: string) => {
    const sub = categories.find((p) => p.name === value);
    if (sub && sub.subCategories) {
      setSubCategories(sub.subCategories);
    } else {
      setSubCategories([]);
    }
  };

  return (
    <div className="container mb-4 md:hidden">
      <ul className="flex flex-row gap-y-4 text-center justify-between text-[11px] flex-wrap">
        <li
            onClick={() => {
              setSelectedCategory(null)
              dispatch(removeFilterProducts())
            }}
            className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
        >
          Tüm Ürünler
        </li>
        {categories?.map((item, index) => (
            <li
                key={index}
                onClick={() => changeSubCategory(item.name)}
                className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item.name}
            </li>
        ))}
      </ul>
      {subCategories && (
          <ul className="flex my-4 space-x-4 overflow-x-auto text-center text-[11px] snap-x scrollbar-hide snap-mandatory">
            {subCategories?.map((item, index) => (
                <li
                    onClick={()=> setSelectedCategory(item)}
              key={index}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      </div>
  );
}
