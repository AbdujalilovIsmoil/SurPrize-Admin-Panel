import reducers from "./reducers";
import initialState from "./initialState";
import { createSlice } from "@reduxjs/toolkit";

const name: string = "register";

export const registerSlice = createSlice({
  name,
  reducers,
  initialState,
});

export default registerSlice.reducer;
export const { setToken } = registerSlice.actions;
