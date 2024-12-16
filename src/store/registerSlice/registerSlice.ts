import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name: string = "register";

interface initialStateInterface {
  token: string;
  data: {
    name: string;
    number: string | number;
  };
}

const initialState: initialStateInterface = {
  token: "",
  data: {
    name: "",
    number: "",
  },
};

export const registerSlice = createSlice({
  name,
  initialState,
  reducers: {
    setToken: (state: initialStateInterface, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
  },
});

export default registerSlice.reducer;
export const { setToken } = registerSlice.actions;
