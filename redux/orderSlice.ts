import { createSlice } from "@reduxjs/toolkit";
import { OrderProduct } from "../types";

const initialState : {
    order: OrderProduct | null,
    orders: OrderProduct[]
} = {
    order: null,
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrders: (state,action) => {
            state.orders = action.payload
        },
        getOrder: (state,action) => {
            state.order = action.payload
        }
    }
})



export const {getOrder, getOrders} = orderSlice.actions

export default orderSlice.reducer;