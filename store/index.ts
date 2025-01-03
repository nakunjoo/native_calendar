import { configureStore } from '@reduxjs/toolkit';
import optionReducer from "./slices/option-slices";
import categoryReducer from "./slices/category-slices";
import scheduleReducer from "./slices/schedule-slices";

export const store = configureStore({
    reducer:{
        optionReducer,
        categoryReducer,
        scheduleReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;