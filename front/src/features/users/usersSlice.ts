import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "@/features/users/usersThunks";
import { GlobalError, UserType, ValidationError } from "@/features/users/types";
import { RootState } from "@/app/store";

interface UsersState {
  user: UserType | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
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
      state.registerError = null;
    }).addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    }).addCase(login.fulfilled, (state, {payload: data}) => {
      state.user = data;
      state.loginLoading = false;
      state.loginError = null;
    }).addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;