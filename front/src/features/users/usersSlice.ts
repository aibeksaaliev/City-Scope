import { createSlice } from "@reduxjs/toolkit";
import { addLocationToFavorites, editProfile, googleLogin, login, register } from "@/features/users/usersThunks";
import { GlobalError, UserType, ValidationError } from "@/features/users/types";
import { RootState } from "@/app/store";

interface UsersState {
  user: UserType | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  updateLoading: boolean;
  updateError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  updateLoading: false,
  updateError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
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

    builder.addCase(googleLogin.pending, (state) => {
      state.registerLoading = true;
    }).addCase(googleLogin.fulfilled, (state, {payload: data}) => {
      state.user = data;
      state.registerLoading = false;
      state.registerError = null;
    }).addCase(googleLogin.rejected, (state, {payload: error}) => {
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

    builder.addCase(editProfile.pending, (state) => {
      state.updateLoading = true;
    }).addCase(editProfile.fulfilled, (state, {payload: data}) => {
      state.user = data;
      state.updateLoading = false;
      state.updateError = null;
    }).addCase(editProfile.rejected, (state, {payload: error}) => {
      state.updateLoading = false;
      state.updateError = error || null;
    });

    builder.addCase(addLocationToFavorites.pending, (state) => {
      state.updateLoading = true;
    }).addCase(addLocationToFavorites.fulfilled, (state, {payload: data}) => {
      if (state.user) {
        state.user.favoriteLocations = data;
      }
      state.updateLoading = false;
      state.updateError = null;
    }).addCase(addLocationToFavorites.rejected, (state, {payload: error}) => {
      state.updateLoading = false;
      state.updateError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectUpdateLoading = (state: RootState) => state.users.updateLoading;
export const selectUpdateError = (state: RootState) => state.users.updateError;