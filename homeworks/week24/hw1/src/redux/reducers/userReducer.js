import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegister, fetchLogin, getMe } from "../../WebAPI";

const initialState = {
  data: "",
  status: "idle",
};

export const registerAsync = createAsyncThunk(
  "user/register",
  async (userData) => {
    const result = await fetchRegister(userData);
    if (!result.ok) {
      localStorage.setItem("token", null);
      return result;
    }
    const { token } = result;
    localStorage.setItem("token", token);
    const getMeResult = await getMe();
    if (!getMeResult.ok) {
      localStorage.setItem("token", null);
    }
    return getMeResult;
  }
);

export const loginAsync = createAsyncThunk("user/login", async (userData) => {
  const result = await fetchLogin(userData);
  if (!result.ok) {
    localStorage.setItem("token", null);
    return result;
  }
  const { token } = result;
  localStorage.setItem("token", token);
  const getMeResult = await getMe();
  if (!getMeResult.ok) {
    localStorage.setItem("token", null);
  }
  return getMeResult;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
