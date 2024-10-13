import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const existingProduct = state.cart.find((item) => item._id === product._id);
      if (existingProduct) {
        state.cart = state.cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      const productID = action.payload._id;
      state.cart = state.cart.filter((item) => item._id !== productID);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartQuantity(state, action) {
      const { _id, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      );
    },
    setCart(state, action) {
      state.cart = action.payload;
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, setCart } =
  CartSlice.actions;

export default CartSlice.reducer;
