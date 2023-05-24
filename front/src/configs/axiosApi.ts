import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { apiURL } from "@/configs/constants";
import { RootState } from '@/app/store';
import { Store } from '@reduxjs/toolkit';

export const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    return config;
  });
};