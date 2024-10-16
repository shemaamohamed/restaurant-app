import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        trackedOrdered: Array.isArray(JSON.parse(localStorage.getItem("orders"))) 
            ? JSON.parse(localStorage.getItem("orders")) 
            : [],
    };
    
let count =  1 ; 
const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addToOrdered(state, action) {
            const ordered = action.payload;
            state.trackedOrdered.push({ ...ordered, quantity: 1 ,soldOut:null , deliverDays : 3,orderId : ++count});
            localStorage.setItem("orders", JSON.stringify(state.trackedOrdered));
        },
        deliveredOrder(state, action) {
            const orderedProductId = action.payload.id;
            state.trackedOrdered = state.trackedOrdered.filter((item) => item.id !== orderedProductId);
            localStorage.setItem("orders", JSON.stringify(state.trackedOrdered));
        },
        logOrderedItems(state) {
            console.log("Tracked Ordered Items:", JSON.stringify(state.trackedOrdered));

        }
    }
});

export const { addToOrdered, deliveredOrder, logOrderedItems } = OrderSlice.actions;
export default OrderSlice.reducer;