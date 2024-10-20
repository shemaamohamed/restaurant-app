import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trackedOrdered: Array.isArray(JSON.parse(localStorage.getItem("orders")))
        ? JSON.parse(localStorage.getItem("orders"))
        : [], 
};

const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      addToOrdered(state, action) {
        const existingOrder = state.trackedOrdered.find(
          (order) => order.orderId === action.payload._id
        );
        
        if (!existingOrder) {
          const newOrder = { 
            amount: action.payload.amount,
            status: action.payload.status,
            orderId: action.payload._id
          };
          state.trackedOrdered = [...state.trackedOrdered, newOrder];
          
          localStorage.setItem("orders", JSON.stringify(state.trackedOrdered));
        }
      }
    }
  });
  

// Export only the actions and reducer that are being used
export const { addToOrdered } = OrderSlice.actions;
export default OrderSlice.reducer;
