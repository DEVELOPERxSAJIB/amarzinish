import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user login
export const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
  try {
    const res = await axios.post(
      `http://localhost:5050/api/v1/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// loggedin user info
export const loggedinUserInfo = createAsyncThunk(
  "auth/loggedinUserInfo",
  async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/auth/me`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const res = await axios.post(
      `http://localhost:5050/api/v1/auth/logout`,
      "",
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// update auth user
export const updateAuthUser = createAsyncThunk(
  "auth/updateAuthUser",
  async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/v1/auth/update-auth-user`,
        data,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update passowrd
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data) => {
    try {
      const res = await axios.patch(
        `http://localhost:5050/api/v1/auth/update-password`,
        data,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// request for reset password
export const forgotPasswordReq = createAsyncThunk(
  "auth/forgotPasswordReq",
  async (email) => {
    try {
      const res = await axios.post(
        `http://localhost:5050/api/v1/auth/forgot-password`,
        { email: email },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const res = await axios.patch(
        `http://localhost:5050/api/v1/auth/reset-password`,
        data,
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
