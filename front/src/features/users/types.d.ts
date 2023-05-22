export interface RegisterMutation {
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface UserType {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: string;
  role: string;
  token: string;
  locale?: string;
  isBlocked: boolean;
  registeredAt: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface ValidationError {
  [key: string]: string;
}