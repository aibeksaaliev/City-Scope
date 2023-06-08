import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "@/configs/axiosApi";
import {
  GlobalError,
  LoginMutation,
  ProfileEditMutation,
  RegisterMutation,
  UserType,
  ValidationError
} from "@/features/users/types";
import { isAxiosError } from "axios";
import { RootState } from "@/app/store";
import { unsetUser } from "@/features/users/usersSlice";
import { LocationType } from "@/features/locations/types";

export const register = createAsyncThunk<UserType, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerData, {rejectWithValue}) => {
    try {
      const registerResponse = await axiosApi.post<UserType>('/authorization/register', registerData);
      return registerResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
)

export const login = createAsyncThunk<UserType, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginData, {rejectWithValue}) => {
    try {
      const loginResponse = await axiosApi.post<UserType>('/authorization/sessions', loginData);
      return loginResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && (e.response.status === 400 || e.response.status === 401)) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
)

export const addLocationToFavorites = createAsyncThunk<LocationType[], number, {rejectValue: GlobalError}>(
  'users/addToFavorites',
  async (locationID, {rejectWithValue}) => {
    try {
      const favoritesResponse = await axiosApi.post(`/users/addToFavorites/${locationID}`);
      return favoritesResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && (e.response.status === 400 || e.response.status === 401)) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
)

export const editProfile = createAsyncThunk<UserType, ProfileEditMutation, {rejectValue: ValidationError}>(
  'users/editProfile',
  async (profileData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(profileData) as (keyof ProfileEditMutation)[];

      keys.forEach(key => {
        const value = profileData[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const editProfileResponse = await axiosApi.patch<UserType>('/users/edit', formData);
      return editProfileResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
)

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {dispatch, getState}) => {
    try {
      const user = getState().users.user;
      await axiosApi.delete('/authorization/sessions', { headers: { Authorization: user?.token }});
      dispatch(unsetUser());
    } catch (e) {
      throw e;
    }
  }
)