"use client";

import DetailClient from "@/components/productDetail/DetailClient";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlugDispatch } from "@/redux/productSlice";
import { useParams } from "next/navigation";
import Loading from "@/components/common/Loading";

function ShopDetailPage() {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading } = useSelector(
        (state: RootState) => state.product
    );

    useEffect(() => {
        dispatch(getProductBySlugDispatch(params.slug));
    }, [params, dispatch]);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <DetailClient product={product} />
            )
            }
        </div>
    );
}
export default ShopDetailPage;
