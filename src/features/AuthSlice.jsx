import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("type", action.payload.type);

    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      localStorage.removeItem("item");
      localStorage.removeItem("type");

      
    },
    signUp(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;
