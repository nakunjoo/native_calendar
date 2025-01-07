import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format, setYear, setMonth } from 'date-fns';

type InitialState = {
  currentMonth: Date
};


type valueData = [year: string, month: string];

const initialState = {
  currentMonth: new Date()
} as InitialState;

export const month = createSlice({
  name: 'calendar-month',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<valueData>) => {

      const date = setYear(setMonth(new Date(), Number(action.payload[1])-1), Number(action.payload[0]))

      state.currentMonth = date
      return state;
    },
  },
});

export const { setCurrentDate } = month.actions;

export default month.reducer;
