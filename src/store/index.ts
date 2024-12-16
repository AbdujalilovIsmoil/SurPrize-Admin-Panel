import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice";

const store = configureStore({
  reducer: { registerSlice },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
