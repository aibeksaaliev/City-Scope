import { createSlice } from "@reduxjs/toolkit";
import {
  approveLocation,
  createLocation,
  fetchLocations, fetchLocationsBySubCategory,
  fetchNonApprovedLocations,
  getAddressByCoordinates
} from "@/features/locations/locationsThunks";
import { RootState } from "@/app/store";
import { CoordinatesType, LocationType } from "@/features/locations/types";
import { GlobalError, ValidationError } from "@/features/users/types";

interface LocationsState {
  address: string | null;
  currentCoordinates: CoordinatesType | null;
  createLocationLoading: boolean;
  createLocationError: ValidationError | null;
  locations: LocationType[];
  nonApprovedLocations: LocationType[];
  locationsBySubCategory: LocationType[];
  selectedLocation: LocationType | null;
  locationsLoading: boolean;
  locationsError: GlobalError | null;
  approveLoading: boolean;
  approveError: ValidationError | null;
}

const initialState: LocationsState = {
  address: null,
  currentCoordinates: null,
  createLocationLoading: false,
  createLocationError: null,
  locations: [],
  nonApprovedLocations: [],
  locationsBySubCategory: [],
  selectedLocation: null,
  locationsLoading: false,
  locationsError: null,
  approveLoading: false,
  approveError: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCoordinates: (state, {payload: data}) => {
      state.currentCoordinates = data;
    },
    selectLocation: (state, {payload: data}) => {
      state.selectedLocation = data;
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

    builder.addCase(fetchLocations.pending, (state) => {
      state.locationsLoading = true;
    }).addCase(fetchLocations.fulfilled, (state, { payload: data}) => {
      state.locations = data;
    }).addCase(fetchLocations.rejected, (state, {payload: error}) => {
      state.locationsLoading = false;
      state.locationsError = error || null;
    });

    builder.addCase(fetchNonApprovedLocations.pending, (state) => {
      state.locationsLoading = true;
    }).addCase(fetchNonApprovedLocations.fulfilled, (state, { payload: data}) => {
      state.nonApprovedLocations = data;
    }).addCase(fetchNonApprovedLocations.rejected, (state, {payload: error}) => {
      state.locationsLoading = false;
      state.locationsError = error || null;
    });

    builder.addCase(fetchLocationsBySubCategory.pending, (state) => {
      state.locationsLoading = true;
    }).addCase(fetchLocationsBySubCategory.fulfilled, (state, { payload: data}) => {
      state.locationsBySubCategory = data;
    }).addCase(fetchLocationsBySubCategory.rejected, (state, {payload: error}) => {
      state.locationsLoading = false;
      state.locationsError = error || null;
    });

    builder.addCase(approveLocation.pending, (state) => {
      state.approveLoading = true;
    }).addCase(approveLocation.fulfilled, (state) => {
      state.approveLoading = false;
    }).addCase(approveLocation.rejected, (state, {payload: error}) => {
      state.approveLoading = false;
      state.approveError = error || null;
    });
  }
});

export const locationsReducer = locationsSlice.reducer;

export const {setCoordinates, selectLocation} = locationsSlice.actions;
export const selectAddress = (state: RootState) => state.locations.address;
export const selectCoordinates = (state: RootState) => state.locations.currentCoordinates;
export const selectCreateLocationLoading = (state: RootState) => state.locations.createLocationLoading;
export const selectCreateLocationError = (state: RootState) => state.locations.createLocationError;
export const selectLocations = (state: RootState) => state.locations.locations;
export const selectNonApprovedLocations = (state: RootState) => state.locations.nonApprovedLocations;
export const selectLocationsBySubCategory = (state: RootState) => state.locations.locationsBySubCategory;
export const selectSelectedLocation = (state: RootState) => state.locations.selectedLocation;
export const selectLocationsLoading = (state: RootState) => state.locations.locationsLoading;
export const selectLocationsError = (state: RootState) => state.locations.locationsError;
export const selectApproveLoading = (state: RootState) => state.locations.approveLoading;
export const selectApproveError = (state: RootState) => state.locations.approveError;