import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../interfaces";
import { LoginData } from "./Login";
import { tryAuth } from "./loginAPI";

export interface LoginState {
  auth: boolean;
  loading: boolean;
  error?: string;
  user?: User;
}

const initialState: LoginState = {
  auth: false,
  loading: false,
  error: "",
};

export const postLogin = createAsyncThunk(
  "login/tryAuth",
  async (data: LoginData) => {
    const response = await tryAuth(data);
    return response;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = true;
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(postLogin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { logout } = loginSlice.actions;

export const auth = (state: RootState) => state.login.auth;
export const loading = (state: RootState) => state.login.loading;
export const error = (state: RootState) => state.login.error;
export const user = (state: RootState) => state.login.user;

export default loginSlice.reducer;
