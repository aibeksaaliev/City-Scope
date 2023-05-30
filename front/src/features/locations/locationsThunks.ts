import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { ApproveLocationType, CoordinatesType, CreateLocationType, LocationType } from "@/features/locations/types";
import { axiosApi } from "@/configs/axiosApi";
import { GlobalError, ValidationError } from "@/features/users/types";

export const getAddressByCoordinates = createAsyncThunk<string, CoordinatesType>(
  'locations/getAddress',
  async (coordinates) => {
    const {lat, lng} = coordinates;
    const response = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
    console.log(response.data.display_name);
    return response.data.display_name;
  }
);

export const createLocation = createAsyncThunk<void, CreateLocationType, {rejectValue: ValidationError}>(
  'locations/createOne',
  async (location, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('title', location.title);
      formData.append('address', location.address);
      formData.append('coordinates', JSON.stringify(location.coordinates));
      formData.append('description', location.description);
      formData.append('workingHours', location.workingHours);
      formData.append('contacts', location.contacts);

      if (location.images) {
        for (const image of location.images) {
          if (image) {
            formData.append('images', image);
          }
        }
      }

      const response = await axiosApi.post('/locations', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
);

export const fetchLocations = createAsyncThunk<LocationType[], void, {rejectValue: GlobalError}>(
  'locations/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const locationsResponse = await axiosApi.get<LocationType[]>('/locations');
      return locationsResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }

  }
);

export const fetchNonApprovedLocations = createAsyncThunk<LocationType[], void, {rejectValue: GlobalError}>(
  'locations/fetchNonApprovedLocations',
  async (_, {rejectWithValue}) => {
    try {
      const nonApprovedLocationsResponse = await axiosApi.get('/locations/nonApprovedLocations');
      return nonApprovedLocationsResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const approveLocation = createAsyncThunk<void, {data: ApproveLocationType, id: number}, {rejectValue: ValidationError}>(
  'locations/approveLocation',
  async ({data, id}, {rejectWithValue}) => {
    try {
      const approveLocationResponse = await axiosApi.patch('/locations/approveLocation/' + id, data);
      return approveLocationResponse.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
);