import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface FilterState {
  activeCategory: number;
  filterTitle: string;
}

const initialState: FilterState = {
  activeCategory: 0,
  filterTitle: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setFilterTitle(state, action: PayloadAction<string>) {
      state.filterTitle = action.payload;
    },
  },
});

export const { setActiveCategory, setFilterTitle } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
