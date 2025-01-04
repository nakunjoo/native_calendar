import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: OptionState;
};

export type OptionState = {
  themeColor: string;
  bgColor: string;
  language: string;
  holiday: boolean;
  lunar: boolean;
  id: string;
};

type valueData = [type: string, value: string | boolean];

const initialState = {
  value: {
    themeColor: "#aa5fd3",
    bgColor: "#c5e4f7",
    language: "Ko",
    holiday: true,
    lunar: true,
    id: "",
  } as OptionState,
} as InitialState;

export const option = createSlice({
  name: 'calendar-option',
  initialState,
  reducers: {
    valueChange: (state, action: PayloadAction<valueData>) => {
      const type = action.payload[0];
      const value: any = { ...state.value };
      value[type] = action.payload[1];
      state.value = value;
      return state;
    },
    getOptions: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { valueChange, getOptions } = option.actions;

export default option.reducer;
