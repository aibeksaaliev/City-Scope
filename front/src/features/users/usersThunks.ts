import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "@/configs/axiosApi";
import { GlobalError, LoginMutation, RegisterMutation, UserType, ValidationError } from "@/features/users/types";
import { isAxiosError } from "axios";

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