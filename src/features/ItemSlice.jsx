import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
  item: JSON.parse(localStorage.getItem("item")) || [],
};
const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addToItem(state,action){
        const item = action.payload;
        const nameisexist = state.item.find((items) => items.name === item.name);
        if (nameisexist) {
            toast.error("Name of item is already exist.")
        }else{
            state.item.push(item);
            toast.success("Item added successfully.");
            localStorage.setItem("item", JSON.stringify(state.item));

        }
         
    },
    updateItem(state, action) {
      const updatedItem = action.payload;
      const index = state.item.findIndex((item) => item.name === updatedItem.name);
      if (index !== -1) {
        state.item[index] = updatedItem;
        localStorage.setItem("item", JSON.stringify(state.item));

      }
    },
    removeItem(state, action) {
      const itemName = action.payload;
      state.item = state.item.filter((item) => item.name !== itemName);
      localStorage.setItem("item", JSON.stringify(state.item));

    },
   

    setItem(state, action) {
      state.item = action.payload;
      localStorage.setItem("item", JSON.stringify(state.item));

    },
  },
});
console.log(ItemSlice);
export const { addToItem,setItem ,removeItem} =ItemSlice.actions;

export default ItemSlice.reducer;
