import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { CoordinatesType, CreateLocationType } from "@/features/locations/types";
import { axiosApi } from "@/configs/axiosApi";
import { ValidationError } from "@/features/users/types";

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