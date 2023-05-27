export interface CoordinatesType {
  lat: string;
  lng: string;
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