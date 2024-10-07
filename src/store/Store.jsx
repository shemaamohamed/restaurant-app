import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";
import orderReducer from "../features/OrderSlice";
import itemReducer from "../features/ItemSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ordered : orderReducer,
    item: itemReducer
  },
});
export default store;
