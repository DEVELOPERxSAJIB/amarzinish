import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  forgotPasswordReq,
  loggedinUserInfo,
  logoutUser,
  resetPassword,
  updateAuthUser,
  updatePassword,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isAuthenticated: false,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = false;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.user = action.payload.payload.user;
        state.message = action.payload.message;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.payload.user)
        );
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loggedinUserInfo.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = false;
      })
      .addCase(loggedinUserInfo.fulfilled, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.user = action.payload.payload.user;
      })
      .addCase(loggedinUserInfo.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(updateAuthUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateAuthUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload.payload.user;
        state.message = action.payload.message;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.payload.user)
        );
      })
      .addCase(updateAuthUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loader = false;
        localStorage.removeItem("user");
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loader = true;
        state.isAuthenticated = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = action.error.message;
      })
      .addCase(forgotPasswordReq.pending, (state) => {
        state.loader = true;
      })
      .addCase(forgotPasswordReq.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordReq.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loader = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// selectors
export const getLoggedInUser = (state) => state.auth;

// export actions
export const { setMessageEmpty } = authSlice.actions;

// export default
export default authSlice.reducer;
