import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishes: JSON.parse(localStorage.getItem("wishes")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const existingProduct = state.wishes.find(
        (item) => item.id === product.id
      );

      if (!existingProduct) {
        state.wishes.push(product);
        localStorage.setItem("wishes", JSON.stringify(state.wishes)); // Sync with localStorage
      }
    },
    removeFromWishlist(state, action) {
      const productId = action.payload;
      state.wishes = state.wishes.filter((item) => item.id !== productId);

      // Update localStorage
      localStorage.setItem("wishes", JSON.stringify(state.wishes));
    },

    setWishes(state, action) {
      state.wishes = action.payload;

      // Update localStorage
      localStorage.setItem("wishes", JSON.stringify(state.wishes));
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishes } =
  wishlistSlice.actions;
console.log(wishlistSlice);

export default wishlistSlice.reducer;
