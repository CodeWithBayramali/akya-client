import { createSlice } from "@reduxjs/toolkit";
import { CartProduct, ColorSizeType } from "../types";

const getInitialState = (): CartState => {
  if (typeof window === "undefined") {
    // Eğer sunucu tarafında çalışıyorsa, sadece varsayılan initial state dönüyoruz
    return {
      cartProducts: [],
      total: 0,
    };
  }

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    return {
      cartProducts: parsedCart.cartProducts || [],
      total: parsedCart.total || 0,
    };
  }
  return {
    cartProducts: [],
    total: 0,
  };
};

interface CartState {
  cartProducts: CartProduct[];
  total: number;
}
const initialState = getInitialState()



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addProduct: (state, action) => {
      const {product,quantity, colorTagName,size} = action.payload
      const existingProduct = state.cartProducts.find(
        (p) => p.product.documentId === action.payload.product.documentId
      );
        const stock = product.stoks.find(
          (item:ColorSizeType)=> item.colorName === colorTagName && item.size === size)?.stock
      if (existingProduct) {
        if(existingProduct.quantity >= stock) {
          alert('Stok Adetini Aştınız !')
          return;
        }else {
          state.total += existingProduct.product.price;
          existingProduct.quantity += 1;
        }
      } else {
        state.cartProducts.push(action.payload);
        state.total += action.payload.product.price * action.payload.quantity;
      }
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },



    discountProduct: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (p) => p.product.documentId === action.payload.product.documentId
      );
      if (existingProduct && existingProduct.quantity !== undefined) {
        existingProduct.quantity -= 1;
        state.total -= action.payload.product.price;
      }
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },



    removeProduct: (state, action) => {
      const {colorTagName, size} = action.payload
      const productToRemove = state.cartProducts.find(
        (p) => p.product.documentId === action.payload.product.documentId || p.colorTagName === colorTagName || p.size === size
      )
      if(productToRemove)
        state.total -= productToRemove.product.price * productToRemove.quantity
        state.cartProducts = state.cartProducts.filter(
        (p) => p.product.documentId !== action.payload.product.documentId || p.colorTagName !== colorTagName || p.size !== size
      )
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },



    reset: (state, action) => {
      state.cartProducts = [];
      state.total = 0;
      localStorage.removeItem('cart')
    },
  },
});

export const { addProduct, reset, removeProduct, discountProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
