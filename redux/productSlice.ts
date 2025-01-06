import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { Product } from "../types";
import { getRequest } from "../service/requestService";

const initialState :{
    products: Product[],
    product: Product | null,
    categoryProducts: Product[],
    loading: boolean
} = {
    products: [],
    product: null,
    categoryProducts: [],
    loading: true
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts: (state,action) => {
            state.products = action.payload
        },
        getCategoryProducts: (state,action) => {
            state.categoryProducts = action.payload
        },
        getProduct: (state,action) => {
            state.product = action.payload
        },
        loading: (state,action) => {
                state.loading = action.payload
        }
    }
})

export const getAllProductsDispatch = (page:number,size:number) => async(dispatch:Dispatch) => {
    await getRequest({
        controller: 'ueruenlers',
        pagination: {page: page, pageSize: size},
        fields: ['name','slug','price'],
        populate: ['images'],
        sort: ['createdAt:desc']
      }).then(res=> {
        dispatch(getCategoryProducts(res.data))
      }).finally(()=> {
        dispatch(loading(false))
      })
} 


export const getProductDispatch = (slug:string) => async (dispatch: Dispatch) => {
    if (slug === 'Elbise') {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/ueruenlers?filters[kategori][slug][$eq]=${encodeURIComponent(slug)}`)
          .then(async res => {
            const response = await res.json();
            dispatch(getCategoryProducts(response.data))
          })
          .finally(() => {
            dispatch(loading(false))
          });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/ueruenlers?filters[alt_kategori][slug][$eq]=${encodeURIComponent(slug)}&populate=*`)
          .then(async res => {
            const response = await res.json();
            dispatch(getCategoryProducts(response.data))
          })
          .finally(() => {
            dispatch(loading(false))
          });
      }
}


export const { getProducts, getProduct, getCategoryProducts, loading } = productSlice.actions
export default productSlice.reducer;