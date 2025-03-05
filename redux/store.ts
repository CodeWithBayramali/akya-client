import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import contactSlice from './contactSlice'
import orderSlice from './orderSlice'
import adminSlice from "@/redux/adminSlice";
import categorySlice from "@/redux/categorySlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        contact: contactSlice,
        order: orderSlice,
        admin: adminSlice,
        category: categorySlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;