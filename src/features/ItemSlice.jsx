import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



const ItemSlice = createSlice({
  name: "item",
  initialState:
  {
    item: [] 
  },
  reducers: {
    addToItem(state,action){
        const item = action.payload;
        const nameisexist = state.item.find((items) => items.name === item.name);
        if (nameisexist) {
            toast.error("Name of item is already exist.")
        }else{
            state.item.push(item);
            toast.success("Item added successfully.");

        }
         
    },
    removeItem(state, action) {
      const itemName = action.payload;
      state.item = state.item.filter((item) => item.name !== itemName);
    },
   

    setItem(state, action) {
      state.item = action.payload;
    },
  },
});
console.log(ItemSlice);
export const { addToItem,setItem ,removeItem} =ItemSlice.actions;

export default ItemSlice.reducer;
