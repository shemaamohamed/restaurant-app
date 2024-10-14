import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productid = action.payload;
      
      if (!state.cart[productid]) {
        state.cart[productid]=1;
        
      } else {
    
        state.cart[productid] += 1
        
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      const productID = action.payload;
      delete state.cart[productID]; // Delete the item directly by its ID
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartQuantity(state, action) {
      
      const { itemId, quantity } = action.payload;
      if (quantity > 0) {
        state.cart[itemId] = quantity; // Set the new quantity
      } else {
        delete state.cart[itemId]; // Remove the item if quantity is 0
      }
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
  console.log(CartSlice)

export default CartSlice.reducer;
