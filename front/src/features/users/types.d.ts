import { LocationType } from "@/features/locations/types";

export interface RegisterMutation {
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ProfileEditMutation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
}

export interface UserType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  role: string;
  token: string;
  locale: string;
  isBlocked: boolean;
  registeredAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  locations: LocationType[];
  favoriteLocations: LocationType[];
}

export interface ValidationError {
  [key: string]: string;
}

export interface GlobalError {
  [key: string]: string;
}