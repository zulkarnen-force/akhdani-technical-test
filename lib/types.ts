export type City = {
  id: string;
  name: string;
};

type User = {
  username: string;
};

export type PerdinRequest = {
  id: string;
  currency: string | null;
  destinationCity: City;
  originCity: City;
  user: User;
  arrivalDate: Date;
  departureDate: Date;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type PaginationResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
