// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "all",
  priceRange: [0, Number.POSITIVE_INFINITY], 
  category: "all",
  search: "",
  sortBy: "default"
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const { setType, setPriceRange, setCategory, setSearch, setSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;
