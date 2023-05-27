import { createSlice } from "@reduxjs/toolkit";
import { createLocation, getAddressByCoordinates } from "@/features/locations/locationsThunks";
import { RootState } from "@/app/store";
import { CoordinatesType } from "@/features/locations/types";
import { ValidationError } from "@/features/users/types";

interface LocationsState {
  address: string | null;
  currentCoordinates: CoordinatesType | null;
  createLocationLoading: boolean;
  createLocationError: ValidationError | null;
}

const initialState: LocationsState = {
  address: null,
  currentCoordinates: null,
  createLocationLoading: false,
  createLocationError: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCoordinates: (state, {payload: data}) => {
      state.currentCoordinates = data;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAddressByCoordinates.pending, (state) => {
      state.address = null;
    }).addCase(getAddressByCoordinates.fulfilled, (state, {payload: data}) => {
      state.address = data;
    }).addCase(getAddressByCoordinates.rejected, (state, {payload: error}) => {
      state.address = null;
    });

    builder.addCase(createLocation.pending, (state) => {
      state.createLocationLoading = true;
    }).addCase(createLocation.fulfilled, (state) => {
      state.createLocationLoading = false;
    }).addCase(createLocation.rejected, (state, {payload: error}) => {
      state.createLocationLoading = false;
      state.createLocationError = error || null;
    });
  }
});

export const locationsReducer = locationsSlice.reducer;

export const {setCoordinates} = locationsSlice.actions;
export const selectAddress = (state: RootState) => state.locations.address;
export const selectCoordinates = (state: RootState) => state.locations.currentCoordinates;
export const selectCreateLocationLoading = (state: RootState) => state.locations.createLocationLoading;
export const selectCreateLocationError = (state: RootState) => state.locations.createLocationError;