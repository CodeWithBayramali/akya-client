"use client";
import React, { useEffect, useState } from "react";
import MobileMenuCategory from "./mobile-menu-category";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {filterProductDispatch, getAllProductsDispatch, removeFilterProducts} from "@/redux/productSlice";
import {getCategoriesDispatch} from "@/redux/categorySlice";
import {Checkbox} from "primereact/checkbox";

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state:RootState) => state.category)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageable, setPageable] = useState({currentPage:0, size: 12})

  useEffect(() => {
      if (selectedCategory !== null) {
          dispatch(filterProductDispatch({subCategory:selectedCategory, page:pageable.currentPage, size:pageable.size}));
      } else {
          dispatch(getAllProductsDispatch(pageable.currentPage, pageable.size))
      }
      dispatch(getCategoriesDispatch())
  }, [dispatch,selectedCategory]);

  return (
    <>
      <MobileMenuCategory
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} />
      <div className="sm:hidden md:sticky top-24 md:flex flex-col w-44">
        <div className="flex mb-4">
        <button
          onClick={()=> {
              setSelectedCategory(null)
              dispatch(removeFilterProducts())
          }}
          className={`text-blue-600 underline`}>Tüm Ürünler</button>
        </div>
        {
          categories?.map((item,index)=> (
            <ul key={index} className="flex md:flex-col sm:flex-row gap-y-2">
          <li>
            <button
              disabled={item.slug !== 'elbise'}
              className={`${
                item.slug === selectedCategory && item.slug === 'elbise'
                  && "text-blue-600"
              }text-sm flex flex-row gap-x-4 items-center justify-between`}
            >
              <p>{item?.name}</p>
            </button>
            <ul className="flex flex-col text-sm ml-2 gap-y-2 my-2">
              {item?.subCategories?.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    item.name === selectedCategory
                      ? "text-blue-600"
                      : "hover:text-blue-600 text-gray-600"
                  } items-center cursor-pointer flex flex-row justify-between`}
                >
                    <div key={index} className="flex align-items-center">
                        <Checkbox inputId={index} className={'h-10 w-10'} name="category" value={item} onChange={e=> {
                            setSelectedCategory(e.value)
                        }} checked={selectedCategory === item} />
                        <label htmlFor={index} className="ml-2">{item}</label>
                    </div>
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
