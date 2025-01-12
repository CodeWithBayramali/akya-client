'use client'
import ProductCard from "../../components/product-card";
import Category from "../../components/product/category";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../types";
import { AppDispatch, RootState } from "../../redux/store";
import Loading from "../../components/common/Loading";
import { getAllProductsDispatch } from "../../redux/productSlice";


export default function Page() {
  const { categoryProducts, loading } = useSelector((state:RootState)=> state.product)
  const dispatch = useDispatch<AppDispatch>()
  
  const getAllProducts = () => {
    dispatch(getAllProductsDispatch(0,12))
  }
  
  useEffect(()=> {
   getAllProducts()
  },[])

  return (
    <div className="container flex sm:flex-col md:flex-row my-28">
      <div className="md:min-h-[60vh]">
      <Category />
      </div>
      <div className="flex-1">
        {
          loading ? <Loading /> : (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 flex-nowrap">
            {
                categoryProducts?.map((item:Product,index:number)=> (
                  <ProductCard key={parseInt(index.toFixed(2))} product={item} />
                ))
            }
          </div>
          )
        }
      </div>

    </div>
  );
}
