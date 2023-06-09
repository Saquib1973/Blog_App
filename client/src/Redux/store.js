import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("userId") ? true : false,
  },
  reducers: {
    login(state) {
      state.userId = localStorage.getItem("userId");
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.userId = localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
