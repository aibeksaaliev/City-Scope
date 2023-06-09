import { FeedbackType } from "@/features/feedacks/types";

export interface CoordinatesType {
  lat: string;
  lng: string;
}

export interface MarkerCoordinatesType {
  lat: number;
  lng: number;
}

export interface AddressType {
  address: string;
}

export interface CreateLocationType {
  title: string;
  address: string;
  coordinates: CoordinatesType | null;
  description: string;
  images: File[];
  workingHours: string;
  contacts: string;
}

export interface LocationType {
  id: number;
  address: string;
  approvedAt: Date | null;
  contacts: string;
  coordinates: CoordinatesType;
  createdAt: Date;
  description: string;
  favoritesCount: number;
  images: string[] | null;
  isApproved: boolean;
  logo: string | null;
  title: string;
  updatedAt: Date;
  workingHours: string;
  feedbacks: FeedbackType[];
  rating: number;
}

export interface ApproveLocationType {
  subCategoryId: string;
  status: boolean;
}