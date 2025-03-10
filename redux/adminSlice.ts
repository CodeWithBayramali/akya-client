import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "@/types";
import {
    deleteGuardRequest,
    getGuardRequest,
    getRequest, patchRequest,
    postGuardRequest,
    putGuardRequest
} from "@/service/requestService";
import {toast} from "react-toastify";

const initialState: ProductProps = {
    products: [],
    product: null,
    categories: [],
    page: {},
    colors: [],
    orders: [],
    blogs: [],
    contacts: [],
    loading: false,
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload._embedded.productDtoes;
            state.page = action.payload.page;
        },
        getProduct: (state, action) => {
            state.product = action.payload;
        },
        getOrders: (state, action) => {
            state.orders = action.payload._embedded.orderDtoes;
            state.page = action.payload.page;
        },
        getCategories: (state, action) => {
            state.categories = action.payload;
        },
        getContacts: (state, action) => {
            state.contacts = action.payload._embedded.contactDtoes;
            state.page = action.payload.page;
        },
        deleteContact: (state, action) => {
            state.contacts = state.contacts.filter(c => c.id !== action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },
        getColors: (state, action) => {
            state.colors = action.payload;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const createProductDispatch = (formData: FormData,resetForm:()=> void) => async() => {
    postGuardRequest({controller:'admin',action: 'create-product'}, formData).then((res)=> {
        toast.success(res.data.message);
        resetForm()
    }).catch(err => {
        toast.error(err.response.data);
    })
}

export const updateProductDispatch = (formData: FormData) => async(dispatch) => {
    dispatch(loading(true))
    putGuardRequest({controller:'admin',action: 'update-product'}, formData).then((res) => {
        dispatch(loading(false))
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const updateActiveDispatch = (id,active) => async(dispatch) => {
    dispatch(loading(true))
    patchRequest({controller:'admin', action: 'update-product-active', params:{productId: id,active: active}})
        .then((res)=> {
            location.reload()
        toast.success(res.data.message);
        dispatch(loading(false))
    }).catch(err => {
        dispatch(loading(false))
        console.log("Axios Request Hatası:", err.config.url);
        toast.error(err.response.data);
    })
}

export const getAllProductDispatch = (page: number, size: number) => async(dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin',action:'get-all-product', params:{page: page, size: size}}).then(res=>{
        dispatch(getProducts(res.data))
        dispatch(loading(false))
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const getProductDispatch = (id: string) => async(dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin', action: 'get-product', params: {id: id}}).then(res=> {
        dispatch(getProduct(res.data))
        dispatch(loading(false))
    }).catch(err=> {
      toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const deleteProductDispatch = (id:string) => async(dispatch) => {
    dispatch(loading(true))
    deleteGuardRequest({controller:'admin',action:'delete-product',params:{id: id}}).then(res=>{
        toast.success(res.data.message);
        dispatch(deleteProduct(id))
        dispatch(loading(false))
    }).catch(err => {
        toast.error(err.response.data.message);
    })
        .finally(()=> {
        dispatch(loading(false))
    })
}

export const createCategoryDispatch = (value: object) => async(dispatch) => {
    dispatch(loading(true))
    postGuardRequest({controller:'admin',action: 'create-category'}, value).then((res)=> {
        dispatch(loading(false))
       toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const getCategoriesDispatch = () => async (dispatch) => {
    dispatch(loading(true))
    getRequest({controller:'admin', action:'get-all-category'}).then(res=> {
        dispatch(getCategories(res.data))
        dispatch(loading(false))
    }).catch(err => {
        toast.error(err.response.data.message);
        dispatch(loading(false))
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const updatePriceByPercentageDispatch = (updatedValue: number) => async(dispatch) => {
    putGuardRequest({controller:'admin',action:'update-price-by-percentage'},{percentage: updatedValue}).then(res=> {
        dispatch(loading(true))
        dispatch(getAllProductDispatch(0,10))
        toast.success(res.data.message)
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data)
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const createColorDispatch = (value: object) => async(dispatch) => {
    dispatch(loading(true))
    postGuardRequest({controller:'admin',action:'create-color'},value).then(res=> {
        dispatch(loading(false))
        dispatch(getAllColorsDispatch())
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const getAllColorsDispatch = () => async (dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin',action:'get-all-colors'}).then(res=> {
        dispatch(loading(false))
        dispatch(getColors(res.data))
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const deleteColorDispatch = (id: string) => async(dispatch) => {
    dispatch(loading(true))
    deleteGuardRequest({controller:'admin',action:'delete-color',params:{id: id}}).then(res=> {
        dispatch(loading(false))
        dispatch(getAllColorsDispatch())
        toast.success(res.data.message);
    })
}

export const getAllOrdersDispatch = (page: number, size:number) => async (dispatch) => {
    dispatch(loading(true))
    getRequest({controller:'admin',action:'get-all-order',params:{page: page, size: size}}).then(res=> {
        dispatch(loading(false))
        dispatch(getOrders(res.data))
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response?.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const deleteOrderDispatch = (id: string) => async(dispatch) => {
    dispatch(loading(false))
    deleteGuardRequest({controller:'admin',action:'delete-order',params:{id: id}}).then(res=> {
        dispatch(loading(false))
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const changeOrderStatusDispatch = (id: string, status: string) => async(dispatch) => {
    dispatch(loading(true))
    patchRequest({controller:'admin',action:'change-order-status',params:{orderId: id,status: status}}).then(res=> {
        dispatch(loading(false))
        location.reload()
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const getAllContactsDispatch = (page: number, size:number) => async (dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin',action:'get-all-contact',params:{page: page, size: size}}).then(res=> {
        dispatch(loading(false))
        dispatch(getContacts(res.data))
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const deleteContactDispatch = (id: string) => async(dispatch) => {
    dispatch(loading(true))
    deleteGuardRequest({controller: 'admin',action:'delete-contact',params:{id: id}}).then(res=> {
        dispatch(loading(false))
        toast.success(res.data.message);
        dispatch(deleteContact(id))
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const createBlogDispatch = (value: object,resetForm:()=> void) => async(dispatch) => {
    dispatch(loading(true))
    postGuardRequest({controller:'admin',action:'create-blog'},value).then(res=> {
        dispatch(loading(false))
        resetForm()
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    })
}

export const {
    loading,
    deleteProduct,
    getProducts,
    getProduct ,
    getCategories,
    getColors,
    getOrders,
    getContacts,
    deleteContact} = adminSlice.actions;
export default adminSlice.reducer;