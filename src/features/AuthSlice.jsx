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

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;

      // Remove user from localStorage
      localStorage.removeItem("user");
    },
    signUp(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;
