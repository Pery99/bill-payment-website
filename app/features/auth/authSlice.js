import { createSlice } from "@reduxjs/toolkit";

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  isAuthenticated: storedUser ? true : false,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
