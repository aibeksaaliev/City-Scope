import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "@/configs/axiosApi";
import { isAxiosError } from "axios";
import { GlobalError, ValidationError } from "@/features/users/types";
import { CategoryType, SubCategoryMutation, SubCategoryType } from "@/features/categories/types";

export const createMainCategory = createAsyncThunk<void, string, {rejectValue: ValidationError}>(
  'categories/createMainCategory',
  async (title, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/categories/createMainCategory', {title});
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
);

export const createSubCategory = createAsyncThunk<void, SubCategoryMutation, {rejectValue: ValidationError}>(
  'categories/createSubCategory',
  async (subCategoryData, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post(`/categories/createSubCategory?mainCategoryId=${subCategoryData.mainCategory}`, {
        title: subCategoryData
        .subCategoryTitle
      });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
);

export const fetchMainCategories = createAsyncThunk<CategoryType[], void, {rejectValue: GlobalError}>(
  'categories/fetchMainCategories',
  async (_, {rejectWithValue}) => {
    try {
      const mainCategoriesResponse = await axiosApi.get<CategoryType[]>('/categories/mainCategories');
      return mainCategoriesResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const fetchSubCategories = createAsyncThunk<SubCategoryType[], number, {rejectValue: GlobalError}>(
  'categories/fetchSubCategories',
  async (id, {rejectWithValue}) => {
    try {
      const mainCategoriesResponse = await axiosApi.get<SubCategoryType[]>(`/categories/subCategoriesByMainCategory?mainCategoryId=${id}`);
      return mainCategoriesResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

