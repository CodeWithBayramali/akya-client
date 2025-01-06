"use client";
import React, { useState } from "react";
import { Category } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getProductDispatch } from "@/redux/productSlice";

export default function MobileMenuCategory({
  cat
}: {
  cat: Category[];
}) {
  const [subCategories, setSubCategories] = useState<
    { slug; subCategoryName }[]
  >([]);
  const dispatch = useDispatch<AppDispatch>()

  const changeSubCategory = (value: string) => {
    const sub = cat.find((p) => p.categoryName === value);
    if (sub && sub.alt_kategoris) {
      setSubCategories(sub.alt_kategoris);
    } else {
      setSubCategories([]);
    }
  };

  return (
    <div className="container mb-4 md:hidden">
        <ul className="flex flex-row gap-y-4 text-center justify-between text-[11px] flex-wrap">
          {cat?.map((item, index) => (
            <li
              key={index}
              onClick={() => changeSubCategory(item.categoryName)}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item.categoryName}
            </li>
          ))}
        </ul>
        {subCategories && (
        <ul className="flex my-4 space-x-4 overflow-x-auto text-center text-[11px] snap-x scrollbar-hide snap-mandatory">
          {subCategories?.map((item, index) => (
            <li
              onClick={()=> dispatch(getProductDispatch(item.slug))}
              key={index}
              className={`hover:bg-black hover:text-white border p-1.5 rounded-full`}
            >
              {item.subCategoryName}
            </li>
          ))}
        </ul>
      )}
      </div>
  );
}
