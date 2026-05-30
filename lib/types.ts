export type Role = "KARYAWAN" | "SDM_DIVISION";

export type CityName = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
  island: {
    name: string;
  };
  longitude: number;
  latitude: number;
  province: string;
  is_abroad: boolean;
};

type User = {
  username: string;
};

export type PerdinRequest = {
  id: string;
  currency: string | null;
  destinationCity: CityName;
  originCity: CityName;
  user: User;
  arrivalDate: Date;
  departureDate: Date;
  status: "PENDING" | "APPROVED" | "REJECTED";
  travelCost: number | null;
  days: number | null;
  km: number | null;
};

export type PaginationResult<T> = {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
