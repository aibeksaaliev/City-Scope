import { createSlice } from "@reduxjs/toolkit";
import { register } from "@/features/users/usersThunks";
import { UserType } from "@/features/users/types";
import { RootState } from "@/app/store";

interface UsersState {
  user: UserType | null;
  registerLoading: boolean;
  registerError: string | null;
  loginLoading: boolean;
  loginError: string | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    }).addCase(register.fulfilled, (state, {payload: data}) => {
      state.user = data;
      state.registerLoading = false;
    }).addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = null;
    })
  }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;