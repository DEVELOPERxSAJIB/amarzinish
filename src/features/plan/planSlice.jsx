import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "./planApiSlice";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
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
      .addCase(getAllPlans.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loader = false;
        state.plans = action.payload.payload.plan;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createNewPlan.pending, (state) => {
        state.loader = true;
      })
      .addCase(createNewPlan.fulfilled, (state, action) => {
        state.loader = false;
        state.plans = [...state.plans, action.payload.payload.plan];
        state.message = action.payload.message;
      })
      .addCase(createNewPlan.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updatePlan.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loader = false;
        state.plans[
          state.plans.findIndex(
            (item) => item._id === action.payload.payload.plan._id
          )
        ] = action.payload.payload.plan;
        state.message = action.payload.message;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deletePlan.pending, (state) => {
        state.loader = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loader = false;
        state.plans = state.plans.filter(
          (plan) => plan._id !== action.payload.payload.plan._id
        );
        state.message = action.payload.message;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// selectors (not working)
export const gettingAllPlans = (state) => state.plan;

// export actions
export const { setMessageEmpty } = planSlice.actions;

// export default
export default planSlice.reducer;
