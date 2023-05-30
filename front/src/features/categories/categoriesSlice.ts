import { createSlice } from "@reduxjs/toolkit";
import { CategoryType, SubCategoryType } from "@/features/categories/types";
import { GlobalError, ValidationError } from "@/features/users/types";
import {
  createMainCategory,
  createSubCategory,
  fetchMainCategories,
  fetchSubCategories
} from "@/features/categories/categoriesThunks";
import { RootState } from "@/app/store";

interface CategoriesState {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  categoriesLoading: boolean;
  categoriesError: GlobalError | null;
  createCategoryLoading: boolean;
  createCategoryError: ValidationError | null;
}

const initialState: CategoriesState = {
  categories: [],
  subCategories: [],
  categoriesLoading: false,
  categoriesError: null,
  createCategoryLoading: false,
  createCategoryError: null,
};

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMainCategory.pending, (state) => {
      state.createCategoryLoading = true;
    }).addCase(createMainCategory.fulfilled, (state) => {
      state.createCategoryLoading = false;
    }).addCase(createMainCategory.rejected, (state, {payload: error}) => {
      state.createCategoryLoading = false;
      state.createCategoryError = error || null;
    });

    builder.addCase(createSubCategory.pending, (state) => {
      state.createCategoryLoading = true;
    }).addCase(createSubCategory.fulfilled, (state) => {
      state.createCategoryLoading = false;
    }).addCase(createSubCategory.rejected, (state, {payload: error}) => {
      state.createCategoryLoading = false;
      state.createCategoryError = error || null;
    });

    builder.addCase(fetchMainCategories.pending, (state) => {
      state.categoriesLoading = true;
    }).addCase(fetchMainCategories.fulfilled, (state, {payload: data}) => {
      state.categoriesLoading = false;
      state.categories = data;
    }).addCase(fetchMainCategories.rejected, (state, {payload: error}) => {
      state.categoriesLoading = false;
      state.categoriesError = error || null;
    });

    builder.addCase(fetchSubCategories.pending, (state) => {
      state.categoriesLoading = true;
    }).addCase(fetchSubCategories.fulfilled, (state, {payload: data}) => {
      state.categoriesLoading = false;
      state.subCategories = data;
    }).addCase(fetchSubCategories.rejected, (state, {payload: error}) => {
      state.categoriesLoading = false;
      state.categoriesError = error || null;
    });
  }
});

export const categoriesReducer = CategoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectSubCategories = (state: RootState) => state.categories.subCategories;
export const selectCreateCategoryLoading = (state: RootState) => state.categories.createCategoryLoading;
export const selectCreateCategoryError = (state: RootState) => state.categories.createCategoryError;