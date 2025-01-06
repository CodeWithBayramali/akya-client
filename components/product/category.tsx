"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import MobileMenuCategory from "./mobile-menu-category";
import { useDispatch } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { AppDispatch } from "../../redux/store";
import { getProductDispatch } from "../../redux/productSlice";
import { getRequest } from "../../service/requestService";
import type { Category } from "../../types";

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("en-yeniler");
  const [cat,setCat] = useState<Category[]>([]);

  const getProductsByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
  getRequest({
       controller: "kategoris",
       populate: "*",
     }).then((res) => {
         setCat(res.data);
       })
  }, []);
  
  return (
    <>
      <MobileMenuCategory cat={cat} />
      <div className="sm:hidden md:sticky top-24 md:flex flex-col w-44">
        {
          cat?.map((item,index)=> (
            <ul key={index} className="flex md:flex-col sm:flex-row gap-y-2 text-gray-500">
         
          <li>
            <button
              className={`text-blue-600 text-sm flex flex-row gap-x-4 items-center justify-between font-semibold`}
            >
              <p>{item?.categoryName}</p>
              <MdKeyboardArrowDown />
            </button>
            <ul className="flex flex-col text-xs ml-2 gap-y-2 my-2">
              {item?.alt_kategoris?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    getProductsByCategory(item.slug)
                    dispatch(getProductDispatch(item.slug))
                  }}
                  className={`${
                    item.slug === selectedCategory
                      ? "text-blue-600"
                      : "hover:text-blue-600 text-gray-600"
                  } items-center cursor-pointer flex flex-row justify-between`}
                >
                  {item.subCategoryName} {item.subCategoryName === selectedCategory && <FaAngleLeft />}
                </li>
              ))}
            </ul>
          </li>
        
        </ul>
          ))
        }
      </div>
    </>
  );
}
