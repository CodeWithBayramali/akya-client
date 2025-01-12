"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import MobileMenuCategory from "./mobile-menu-category";
import { useDispatch } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { AppDispatch } from "../../redux/store";
import { getAllProductsDispatch, getProductDispatch } from "../../redux/productSlice";
import { getRequest } from "../../service/requestService";
import type { Category } from "../../types";

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all-product");
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
        <div className="flex mb-4">
        <button 
          onClick={()=> {
            dispatch(getAllProductsDispatch(0,12))
            setSelectedCategory('all-product')
          }}
          className={`${selectedCategory === 'all-product' ? 'text-blue-600': ''}`}>Tüm Ürünler</button>
        </div>
        {
          cat?.map((item,index)=> (
            <ul key={index} className="flex md:flex-col sm:flex-row gap-y-2">
          <li>
            <button
              onClick={()=> {
                getProductsByCategory(item.slug)
                    dispatch(getProductDispatch(item.slug))
              }}
              disabled={item.slug !== 'elbise'}
              className={`${
                item.slug === selectedCategory && item.slug === 'elbise'
                  && "text-blue-600"
              }text-sm flex flex-row gap-x-4 items-center justify-between`}
            >
              <p>{item?.categoryName}</p>
              {
                item.slug !== 'elbise' ? <MdKeyboardArrowDown /> : null
              }
            </button>
            <ul className="flex flex-col text-sm ml-2 gap-y-2 my-2">
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
