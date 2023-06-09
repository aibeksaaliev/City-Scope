import { UserType } from "@/features/users/types";
import { LocationType } from "@/features/locations/types";

export interface FeedbackMutation {
  rating: number | null;
  comment: string;
}

export interface FeedbackType {
  id: number;
  user: UserType;
  location: LocationType;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}