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

      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        state.cart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      const productID = action.payload.id;
      state.cart = state.cart.filter((item) => item.id !== productID);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    },
    setCart(state, action) {
      state.cart = action.payload;
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
console.log(CartSlice);
export const { addToCart, removeFromCart, updateCartQuantity, setCart } =
  CartSlice.actions;

export default CartSlice.reducer;
