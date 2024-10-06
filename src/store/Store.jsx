import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";
import orderReducer from "../features/OrderSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    ordered : orderReducer
  },
});
export default store;
