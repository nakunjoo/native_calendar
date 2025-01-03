import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryData = {
  id: string;
  color: string;
  name: string;
};

const initialState = [] as CategoryData[];

export const category = createSlice({
  name: 'calendar-category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryData>) => {
      state.push(action.payload);
      return state;
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
      return state;
    },
    setCategory: (state, action: PayloadAction<CategoryData[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addCategory, deleteCategory, setCategory } = category.actions;

export default category.reducer;
