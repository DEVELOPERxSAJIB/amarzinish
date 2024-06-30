import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all plans from database
export const getAllPlans = createAsyncThunk("plan/getAllPlans", async () => {
  try {
    const res = await axios.get(`http://localhost:5050/api/v1/plan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get single plan
export const getSinglePlan = createAsyncThunk(
  "plan/getSinglePlan",
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/plan/${id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create new plan
export const createNewPlan = createAsyncThunk(
  "plan/createNewPlan",
  async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:5050/api/v1/plan/create-plan`,
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

// create new plan
export const updatePlan = createAsyncThunk("plan/updatePlan", async (data) => {
  try {
    const res = await axios.put(
      `http://localhost:5050/api/v1/plan/update-plan/${data.id}`,
      data.data,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete plan
export const deletePlan = createAsyncThunk("plan/deletePlan", async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:5050/api/v1/plan/delete-plan/${id}`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
