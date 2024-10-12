import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";
import orderReducer from "../features/OrderSlice";
import itemReducer from "../features/ItemSlice";
import wishlistReducer from "../features/WishListSlice";
import authReducer from "../features/AuthSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ordered: orderReducer,
    item: itemReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});
export default store;
