import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;
