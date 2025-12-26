// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "./features/auth.js";

const store = configureStore({
  reducer: {
    authen: authenReducer,
  },
});

export default store;
