import { configureStore } from '@reduxjs/toolkit';
import optionReducer from "./slices/option-slices";
import categoryReducer from "./slices/category-slices";
import scheduleReducer from "./slices/schedule-slices";
import monthReducer from './slices/month-slices'

export const store = configureStore({
    reducer:{
        optionReducer,
        categoryReducer,
        scheduleReducer,
        monthReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;