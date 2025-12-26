import { createSlice } from "@reduxjs/toolkit";

// ===== Helper đọc localStorage =====
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const getIsLoggedInFromLocalStorage = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

// ===== Initial State =====
const initialState = {
  user: getUserFromLocalStorage(),
  isLoggedIn: getIsLoggedInFromLocalStorage(),
};

// ===== Slice =====
const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    // LOGIN
    doLogin: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
    },

    // LOGOUT
    doLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { doLogin, doLogout } = authenSlice.actions;
export default authenSlice.reducer;
