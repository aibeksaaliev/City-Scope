import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "@/configs/axiosApi";
import { RegisterMutation, UserType } from "@/features/users/types";

export const register = createAsyncThunk<UserType, RegisterMutation>(
  'users/register',
  async (registerData) => {
    const registerResponse = await axiosApi.post('/authorization/register', registerData);
    return registerResponse.data;
  }
)