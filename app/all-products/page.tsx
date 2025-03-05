'use client'
import ProductCard from "../../components/product-card";
import Category from "../../components/product/category";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Product } from "@/types";
import { RootState } from "@/redux/store";
import Loading from "../../components/common/Loading";
import {Paginator} from "primereact/paginator";


export default function Page() {
  const { filterProducts,products ,loading, page } = useSelector((state:RootState)=> state.product)
    const [pageable, setPageable] = useState({currentPage:0,size:12})

    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });
    };

  return (
    <div className="container flex sm:flex-col md:flex-row my-28">
      <div className="md:min-h-[60vh]">
      <Category />
      </div>
      <div className="flex-1">
        {
          loading ? <Loading /> : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 flex-nowrap">
            {
                (filterProducts?.length > 0 ? filterProducts:products).map((item:Product,index:number)=> (
                  <ProductCard key={index} product={item} />
                ))
            }
          </div>
          )
        }
          <Paginator
              className={"my-12 "}
              first={pageable.currentPage * pageable.size}
              rows={pageable.size}
              totalRecords={page.totalElements}
              rowsPerPageOptions={[12, 20, 30]}
              onPageChange={onPageChange}
          />
      </div>

    </div>
  );
}
